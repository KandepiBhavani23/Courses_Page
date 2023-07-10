import React from "react";

import { courseData } from "../../utils/constants";
import CourseContent from "../CourseContent";

const CourseContentTab = () => {
	return (
		<div className="w-full h-full">
			<div className="m-4 border-[1px] border-gray-500">
				<CourseContent data={courseData} />
			</div>
		</div>
	);
};

export default CourseContentTab;
