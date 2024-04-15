import { createSlice } from "@reduxjs/toolkit";

// Getting todo's from local storage
const getInitialTodos = () => {
	const localTodoList = window.localStorage.getItem("todoList");
	if (localTodoList) {
		return JSON.parse(localTodoList);
	}
	//When No todo's are present, creating an empty array
	window.localStorage.setItem("todoList", JSON.stringify([]));
	return [];
};

const initialValue = {
	todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
	name: "todo",
	initialState: initialValue,
	reducers: {
		// Adding new todo
		addTodo: (state, action) => {
			state.todoList.push(action.payload);
			//Adding it to local Storage
			const todoList = window.localStorage.getItem("todoList");
			if (todoList) {
				const todoListArr = JSON.parse(todoList);
				todoListArr.push({ ...action.payload });
				window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
			}
		},
	},
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
