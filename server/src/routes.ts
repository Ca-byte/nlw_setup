import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { object, z } from 'zod'
import { prisma } from "./lib/prisma";

export async function appRoutes(app:FastifyInstance) {
	app.post('/habits',async(request) => {
	const createHabitBody = object({
		title: z.string(),
		weekdays: z.array(
		z.number().min(0).max(6)
		)
	})
	const { title, weekdays} = createHabitBody.parse(request.body)
	const today = dayjs().startOf('day').toDate()

		await prisma.habit.create({
			data: {
				title,
				created_at: today,
				weekdays: {
					create: weekdays.map(weekday => {
						return {
							week_day: weekday,
						}
					})
				}
			}
		})
	})

	app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')
		console.log(date, weekDay)

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekdays: {
          some: {
            week_day: weekDay,
          }
        }
      },
    })
		const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completedHabits,
    }
	}
)}
