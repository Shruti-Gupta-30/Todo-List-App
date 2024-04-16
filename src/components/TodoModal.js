import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("incomplete");
	const dispatch = useDispatch();

	//For initial todo data to be loaded when update option chosen
	useEffect(() => {
		if (type === "update" && todo) {
			setTitle(todo.title);
			setStatus(todo.status);
		} else {
			setTitle("");
			setStatus("incomplete");
		}
	}, [type, todo, modalOpen]);

	const handleSubmit = (e) => {
		e.preventDefault();
		//For updating the Todo
		if (title === "") {
			toast.error("Please enter a title");
			return;
		}

		//Sending todo data data to the store to be added to the list
		if (title && status) {
			if (type === "add") {
				dispatch(
					addTodo({
						id: uuid(),
						title,
						status,
						time: new Date().toLocaleString("en-US", { hour12: true }), //Getting time in supportable format to be displayed late using date-fns
					})
				);
				//Adding pop-up messages
				toast.success("Task added successfully");
			}

			//When todo is edited
			if ((type = "update")) {
				//Checking if todo was edited
				if (todo.title !== title || todo.status !== status) {
					dispatch(
						updateTodo({
							...todo,
							title,
							status,
							time: new Date().toLocaleString("en-US", { hour12: true }),
						})
					);
				} else {
					//when todo was not edited
					toast.error("No Changes made");
				}
			}
			setModalOpen(false);
		}
	};

	return (
		modalOpen && (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div
						className={styles.closeButton}
						onClick={() => setModalOpen(false)}
						onKeyDown={() => setModalOpen(false)}
						tabIndex={0}
						role="button"
					>
						<MdOutlineClose></MdOutlineClose>
					</div>
					<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
						<h1 className={styles.formTitle}>
							{" "}
							{type === "update" ? "Update" : "Add"} Task
						</h1>
						<label htmlFor="title">
							Title{" "}
							<input
								type="text"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label htmlFor="status">
							Status{" "}
							<select
								name="status"
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="incomplete">Incomplete</option>
								<option value="complete">Complete</option>
							</select>
						</label>

						<div className={styles.buttonContainer}>
							<Button type="submit" variant="primary">
								{type === "update" ? "Update" : "Add"} Task
							</Button>
							<Button
								variant="secondary"
								onClick={() => setModalOpen(false)}
								onKeyDown={() => setModalOpen(false)}
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}

export default TodoModal;
