import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CourseViewPage from "./pages/courseViewPage/CourseViewPage";
import SearchTab from "./components/CourseViewTab/SearchTab";
import OverViewTab from "./components/CourseViewTab/OverViewTab";
import NotesTab from "./components/CourseViewTab/NotesTab";
import AnnouncementsTab from "./components/CourseViewTab/AnnouncementsTab";
import ReviewsTab from "./components/CourseViewTab/ReviewsTab";
import CourseContentTab from "./components/CourseViewTab/CourseContentTab";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CourseViewPage />,
		children: [
			{
				path: "",
				element: <SearchTab />,
			},
			{
				path: "search",
				element: <SearchTab />,
			},
			{
				path: "overview",
				element: <OverViewTab />,
			},
			{
				path: "notes",
				element: <NotesTab />,
			},
			{
				path: "announcements",
				element: <AnnouncementsTab />,
			},
			{
				path: "reviews",
				element: <ReviewsTab />,
			},
			{
				path: "content",
				element: <CourseContentTab />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
