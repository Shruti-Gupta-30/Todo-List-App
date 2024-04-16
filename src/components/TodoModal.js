import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

const boxAppear = {
	hidden: {
		opacity: 0,
		transform: "scale(0.9)",
	},
	visible: {
		transform: "scale(1)",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		transform: "scale(0.9)",
		opacity: 0,
	},
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
	const [title, setTitle] = useState(" ");
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
				//Adding pop-up message
				toast.success("Task added successfully");
			}
			//For updating the Todo
			if (title === "") {
				toast.error("Please enter a title");
				return;
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
					//Adding pop-up message
					toast.success("Task Updated successfully");
				} else {
					//when todo was not edited
					toast.error("No Changes made");
					return;
				}
			}
			setModalOpen(false);
		}
	};

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					className={styles.wrapper}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={styles.container}
						variants={boxAppear}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.div
							className={styles.closeButton}
							onClick={() => setModalOpen(false)}
							onKeyDown={() => setModalOpen(false)}
							tabIndex={0}
							role="button"
							//animation
							initial={{ top: 40, opacity: 0 }}
							animate={{ top: -10, opacity: 1 }}
							exit={{ top: 40, opacity: 0 }}
						>
							<MdOutlineClose></MdOutlineClose>
						</motion.div>
						<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
							<h1 className={styles.formTitle}>
								{type === "add" ? "Add" : "Update"} ToDo
							</h1>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</label>
							<label htmlFor="type">
								Status{" "}
								<select
									id="type"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="incomplete">Incomplete</option>
									<option value="complete">Complete</option>
								</select>
							</label>

							<div className={styles.buttonContainer}>
								<Button type="submit" variant="primary">
									{type === "add" ? "Add" : "Update"} Task
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
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default TodoModal;
