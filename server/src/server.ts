import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors)

app.get('/habits',async() => {
	const habits = await prisma.habits.findMany({
		where: {
			title: {
				startsWith: 'Drink'
			}
		}
	})
	return habits;
})

app.listen({
	port: 3333,
}).then(()=> {
	console.log('HTTP Server is running')
})