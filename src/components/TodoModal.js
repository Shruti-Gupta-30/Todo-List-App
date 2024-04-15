import React, { useState } from "react";
import styles from "../styles/modules/modal.module.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { addTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";

function TodoModal({ modalOpen, setModalOpen }) {
	const [title, setTitle] = useState("");
	const [status, setStatus] = useState("incomplete");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && status) {
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
			setModalOpen(false);
		} else {
			toast.error("Title shouldn't be empty");
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
						<h1 className={styles.formTitle}> Add Task</h1>
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
								Add Task
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
