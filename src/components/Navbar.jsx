import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTrophy, BsStarFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

import logo from "../assets/images/logo_udemy.svg";

import Button from "../utils/Button";

const Navbar = ({ data }) => {
	const { title } = data;
	const [leaveRatingModal, setLeaveRatingModal] = useState(false);

	return (
		<div className="w-full h-14 p-4 text-white bg-dark-navy flex justify-between items-center">
			{/* LEFT ITEMS */}
			<div className="flex items-center gap-4">
				<Link className="w-24 h-10 cursor-pointer">
					<img src={logo} alt="logo" className="w-20 h-10 " />
				</Link>
				<hr
					className="h-5 border-none"
					style={{ borderRight: "1px solid gray" }}
				/>
				<div className="text-base cursor-pointer overflow-hidden navbar-webkit">
					{title}
				</div>
			</div>
			{/* RIGHT ITEMS */}
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2 cursor-pointer">
					<BsStarFill className="w-4 h-4 text-bright-orange" />
					<span className="" onClick={() => setLeaveRatingModal(true)}>
						Leave a rating
					</span>
				</div>
				<div className="flex items-center gap-2 cursor-pointer">
					<BsTrophy className="w-4 h-4 " />
					<span className="">Your Progress</span>
					<RiArrowDropDownLine className="w-8 h-8" />
				</div>
				<Button />
			</div>
		</div>
	);
};

export default Navbar;
