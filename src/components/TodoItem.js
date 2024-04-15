import React from "react";
import { format } from "date-fns";
import styles from "../styles/modules/todoItem.module.css";
import toast from "react-hot-toast";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";

function TodoItem({ todo }) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteTodo(todo.id));
		toast.success("Todo Deleted Successfully");
	};

	const handleUpdate = () => {
		console.log("handle update");
	};

	return (
		<div className={styles.item}>
			<div className={styles.todoDetails}>
				[ ]
				<div className={styles.texts}>
					<p
						className={getClasses([
							styles.todoText,
							todo.status === "complete" && styles["todoText--completed"],
						])}
					>
						{todo.title}
					</p>
					{/* Formatting todo creation/edited time */}
					<p className={styles.time}>
						{format(new Date(todo.time), "p, MM/dd/yyyy")}
					</p>
				</div>
			</div>
			<div className={styles.todoActions}>
				<div
					className={styles.icon}
					onClick={handleDelete}
					onKeyDown={handleDelete}
					role="button"
					tabIndex={0}
				>
					<MdDelete />
				</div>
				<div
					className={styles.icon}
					onClick={handleUpdate}
					onKeyDown={handleUpdate}
					role="button"
					tabIndex={0}
				>
					<MdEdit />
				</div>
			</div>
		</div>
	);
}

export default TodoItem;
