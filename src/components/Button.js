import React from "react";
import styles from "../styles/modules/button.module.css";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
	primary: "primary",
	secondary: "secondary",
};

function Button({ children, type, variant, ...rest }) {
	return (
		<button
			// using getClasses to define the className for the button and thus its look
			className={getClasses([
				styles.button,
				styles[`button--${buttonTypes[variant]}`],
			])}
			type={type === "submit" ? "submit" : "button"}
			{...rest}
		>
			{children}
		</button>
	);
}

//For Dropdown list
function SelectButton({ children, id, ...rest }) {
	return (
		<select
			id={id}
			className={getClasses([styles.button, styles.button__select])}
			{...rest}
		>
			{children}
		</select>
	);
}

export { SelectButton };
export default Button;
