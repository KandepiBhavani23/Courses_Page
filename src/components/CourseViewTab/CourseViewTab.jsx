import React from "react";
import { Link, Outlet } from "react-router-dom";

import SearchIcon from "../../assets/images/search.png";

const CourseViewTab = () => {
	const tabs = [
		{
			id: 1,
			name: null,
			icon: SearchIcon,
			link: "search",
		},
		{
			id: 2,
			name: "OverView",
			icon: null,
			link: "overview",
		},
		{
			id: 3,
			name: "Notes",
			icon: null,
			link: "notes",
		},
		{
			id: 4,
			name: "Announcements",
			icon: null,
			link: "announcements",
		},
		{
			id: 5,
			name: "Reviews",
			icon: null,
			link: "reviews",
		},
	];
	return (
		<div className="w-full h-full px-4 py-9 bg-white">
			<div className="w-full flex items-center mb-4 border-b-[2px] border-b-gray-300">
				{tabs?.map((item) => {
					return (
						<Link
							key={`tab-${item.id}`}
							to={item.link ?? ""}
							className={(e) => {
								` ${
									e.isActive
										? "text-gray-600 border-b-[1px] border-b-gray-600"
										: "p-4 font-bold text-gray-400"
								}`;
							}}>
							{item?.name ? (
								<div className="mx-8 pb-4 font-bold text-lg text-light-blue">
									{item.name}
								</div>
							) : null}
							{item?.icon ? (
								<img src={item.icon} alt="icon" className="w-4 h-4 mb-3" />
							) : null}
						</Link>
					);
				})}
			</div>
			<div className="p-4 w-full min-h-[50vh]">
				<Outlet />
			</div>
		</div>
	);
};

export default CourseViewTab;
