import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.css";

function AppContent() {
	//getting all the todos
	const todoList = useSelector((state) => state.todo.todoList);

	// Sorting todos on the basis of time
	const sortedTodoList = [...todoList];
	sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

	//Getting the Filter Category
	const filterStatus = useSelector((state) => state.todo.filterStatus);

	//Getting todo items with the required status
	const filteredTodoList = sortedTodoList.filter((item) => {
		if (filterStatus === "all") {
			return true;
		}
		return item.status === filterStatus;
	});

	return (
		<div className={styles.content__wrapper}>
			{filteredTodoList && filteredTodoList.length > 0
				? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
				: "no todo found"}
		</div>
	);
}

export default AppContent;
