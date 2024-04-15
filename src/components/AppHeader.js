import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.css";
import TodoModal from "./TodoModal";

function AppHeader() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className={styles.appHeader}>
			<Button variant="primary" onClick={() => setModalOpen(true)}>
				Add Task
			</Button>
			{/* Making dropdown list for filtering notes */}
			<SelectButton id="status">
				<option value="all">All</option>
				<option value="incomplete">Incomplete</option>
				<option value="complete">Complete</option>
			</SelectButton>
			<TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	);
}

export default AppHeader;
