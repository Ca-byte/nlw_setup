interface HabitsProps {
	completed: number;
}

export function Habits(props:HabitsProps){
	return(
		<div className="w-10 h-10 bg-pink-500 flex justify-center items-center rounded m-2">{props.completed}</div>
	)
}