import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import CheckBox from "../utils/CheckBox";
import closeIcon from "../assets/images/close.png";
import playIcon from "../assets/images/play-button.png";
import downArrow from "../assets/images/down-arrow.svg";
import openFolder from "../assets/images/open-folder.png";

const CourseContent = (props) => {
	const { title = "", data = [], playerWidthSetter = () => {} } = props;
	console.log(data);
	const [toggleBox, setToggleBox] = useState({});
	const [toggleDrpDwn, setToggleDrpDwn] = useState({});

	return (
		<div className="w-full flex-1 text-dark-navy">
			<div className="w-full">
				{title ? (
					<div className="w-full p-4 flex justify-between items-center  border-t-[1px] border-t-gray-400 bg-white border-b-[1px] border-b-gray-400">
						<span className="text-lg font-bold">{title}</span>
						<span
							className="h-full cursor-pointer"
							onClick={() => playerWidthSetter((p) => !p)}>
							<img src={closeIcon} alt="close icon" className="w-4 h-4" />
						</span>
					</div>
				) : null}
				<div className="w-full bg-white flex-auto">
					{data?.map((item, id) => {
						return (
							<div
								className="w-full cursor-pointer border-b-[1px] border-b-gray-400 "
								key={`tab-${id}`}>
								<div
									className="text-base p-3 flex justify-between"
									onClick={() =>
										setToggleBox((p) => {
											return { ...p, [id]: !p[id] };
										})
									}>
									<div className="w-[80%]">
										<div className="text-lg font-semibold overflow-hidden course-content-webkit">{`Section ${
											id + 1
										}: ${item.ttl}`}</div>
										<div className="text-sm flex items-center gap-1 mt-1">
											<span className="">10/10</span>
											<span className="h-3 border-r-[1px] border-r-gray-400"></span>
											<span className="">40 min</span>
										</div>
									</div>
									<div className="w-[20%]">
										<img
											src={downArrow}
											alt="down arrow"
											className={`
												w-3 h-3 mt-2 ml-4 transition-all
												${toggleBox[id] ? "rotate-180" : null}
											`}
										/>
									</div>
								</div>
								{toggleBox[id] ? (
									<Link to="" className="h-max bg-white text-gray-500">
										{item.list?.map((subItem) => {
											return (
												<div
													className="px-4 py-2 flex hover:bg-gray-500"
													key={`subItem-${subItem.id}`}>
													<div className="w-[10%]">
														<CheckBox
															state={toggleDrpDwn[subItem.id] ?? false}
															name={subItem.id}
															id={subItem.id}
															onChange={(e) => {
																setToggleDrpDwn((prev) => {
																	return {
																		...prev,
																		[e.target?.name]: !prev[e.target?.name],
																	};
																});
															}}
															extraCss={{
																width: "40px",
																gap: "0",
																margin: "0.5rem",
															}}
														/>
													</div>
													<div className="w-[90%]">
														<div className="text-base font-medium text-gray-800">
															{subItem.ttl}
														</div>
														<div className="flex justify-between">
															<span className="flex items-center gap-2">
																<img src={playIcon} className="w-3 h-3" />
																<span className="text-gray-400 text-sm">
																	{subItem.dur}
																</span>
															</span>
															{subItem?.resources?.length > 0 ? (
																<span className="relative">
																	<div
																		className="px-2 py-1 flex gap-2 items-center border-[1px] border-gray-600"
																		onClick={() => {
																			setToggleDrpDwn((p) => {
																				return {
																					[subItem.id]: p[subItem.id]
																						? !p[subItem.id]
																						: true,
																				};
																			});
																		}}>
																		<img
																			src={openFolder}
																			alt="icon"
																			className="w-4 h-4"
																		/>
																		<div className="text-sm">Resources</div>
																		<img
																			src={downArrow}
																			icon="dropdown icon"
																			className={`
																				w-3 h-3 transition-all
																				${toggleDrpDwn[subItem.id] ? "rotate-180" : null}
																			`}
																		/>
																	</div>
																	{toggleDrpDwn[subItem.id] ? (
																		<div className="absolute top-8 right-0 p-2 w-max max-w-[200px] z-[1] shadow-md bg-white">
																			{subItem?.resources?.map((resItem) => {
																				return (
																					<Link
																						key={`resItem-${resItem.id}`}
																						download={resItem.downloadable}
																						to={resItem.link}
																						className="m-2 flex gap-4 items-center text-gray-400 hover:text-vivid-green">
																						<img
																							src={resItem.icon}
																							alt="icon"
																							className="w-4 h-4"
																						/>
																						<span className="text-sm">
																							{resItem.text}
																						</span>
																					</Link>
																				);
																			})}
																		</div>
																	) : null}
																</span>
															) : null}
														</div>
													</div>
												</div>
											);
										})}
									</Link>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CourseContent;
