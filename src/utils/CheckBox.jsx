import React from "react";

const CheckBox = (props) => {
	const {
		label,
		name = "",
		id = "",
		state = false,
		onChange = () => {},
		extraCss = {},
		inputCss = {},
		...extraProps
	} = props;
	return (
		<div className="m-4 flex gap-4 items-center" style={extraCss}>
			<input
				type="checkbox"
				name={name}
				id={id}
				onChange={(e) => onChange(e)}
				checked={state}
				className="w-5 h-4 mr-3 mb-2 border-2 appearance-none border-black  accent-black p-1 cursor-pointer"
				{...extraProps}
				style={inputCss}
			/>
			<label htmlFor={id} className="w-[85%] text-[4px]">
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
