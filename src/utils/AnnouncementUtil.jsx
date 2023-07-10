import React, { useState } from "react";
import { Link } from "react-router-dom";

import flagReport from "../assets/images/flag-report.png";
import flagfilled from "../assets/images/flag-report-filled.png";

const AnnouncementUtil = (props) => {
	const {
		id = 0,
		name = "",
		img = "",
		date = new Date(),
		comment = "",
	} = props.data;

	const [flagState, setFlagState] = useState(false);

	return (
		<div className="w-full h-full m-4 flex gap-1">
			<div className="w-12 h-45 rounded-[50%]">
				<img
					src={img}
					alt="profile pic"
					className="w-full h-full rounded-[50%] object-cover"
				/>
			</div>
			<div className="">
				<div className="flex text-base">
					<Link to={id} className="text-dark-navy capitalize">
						{name}
					</Link>
					<div className="text-base">
						{new Date(date)?.toLocaleDateString()}
					</div>
					<div
						className="cursor-pointer"
						onClick={() => setFlagState((p) => !p)}>
						<img
							src={flagState ? flagfilled : flagReport}
							alt="flag"
							className="w-4 h-4"
						/>
					</div>
				</div>
				<div className={css.rightBox}>
					<span className="ann-cooment-webkit">{comment}</span>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementUtil;
