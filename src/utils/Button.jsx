import React from "react";
import { IoIosShareAlt } from "react-icons/io";

const Button = () => {
	return (
		<div className="flex items-center gap-2 cursor-pointer border-[1px] px-4 py-2">
			<h1>Share</h1>
			<IoIosShareAlt />
		</div>
	);
};

export default Button;
