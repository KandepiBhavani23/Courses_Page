import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import VideoPlayer from "../../components/VideoPlayer";
import CourseViewTab from "../../components/CourseViewTab/CourseViewTab";
import CourseContent from "../../components/CourseContent";

import { courseData } from "../../utils/constants";

const CourseViewPage = () => {
	const data = {
		title: "Python Coding Projects Build a Web App Directory Discovery",
	};

	const [playerFullWidth, setPlayerFullWidth] = useState(false);
	return (
		<div className="w-full h-full">
			<Navbar data={data} />
			<div className="flex">
				<div className="w-full flex">
					<div
						className={`w-full h-full ${playerFullWidth ? "w-full" : "w-3/4"}`}>
						<div
							className={`h-full max-h-[600px] ${
								playerFullWidth ? "h-[700px]" : "h-[600px]"
							}`}>
							<VideoPlayer
								data={{ autoplay: true }}
								playerWidthState={playerFullWidth}
								playerWidthSetter={setPlayerFullWidth}
							/>
						</div>
						<CourseViewTab />
					</div>
				</div>
				<div
					className="w-[30%] max-h-[100vh] overflow-y-scroll top-0 right-0 bg-slate-100"
					style={{ display: playerFullWidth ? "none" : "block" }}>
					<CourseContent
						title="Course Content"
						data={courseData}
						playerWidthSetter={setPlayerFullWidth}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseViewPage;
