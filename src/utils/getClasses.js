// A seperate function to determine classnames wherever needed
export const getClasses = (classes) =>
	classes
		.filter((item) => item !== "")
		.join(" ")
		.trim();
