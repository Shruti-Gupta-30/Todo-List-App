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
			} else {
				window.localStorage.setItem(
					"todoList",
					JSON.stringify([{ ...action.payload }])
				);
			}
		},

		//Deleting todo
		deleteTodo: (state, action) => {
			const todoList = window.localStorage.getItem("todoList");
			if (todoList) {
				const todoListArr = JSON.parse(todoList);
				todoListArr.forEach((todo, index) => {
					if (todo.id === action.payload) {
						todoListArr.splice(index, 1);
					}
				});
				//Updating the local storage
				window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
				state.todoList = todoListArr;
			}
		},
	},
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
