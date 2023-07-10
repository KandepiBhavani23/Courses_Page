import React, { useState, useRef, useEffect } from "react";

import { BsFillPlayFill, BsFillVolumeUpFill } from "react-icons/bs";
import { FaPause, FaExpandAlt } from "react-icons/fa";
import { PiClosedCaptioningBold } from "react-icons/pi";
import { GrContract } from "react-icons/gr";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { BiVolumeMute } from "react-icons/bi";
import { RiSettings5Fill } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

import video from "../assets/videos/sample_video.mp4";

const VideoPlayer = (props) => {
	const { playerWidthState, playerWidthSetter, data } = props;

	const { autoplay = false } = data;
	const [videoState, setVideostate] = useState(false);
	const [playbackOptionsBox, setPlaybackOptionsBox] = useState(false);
	const [playbackSpeedOption, setPlaybackSpeedOption] = useState("1.0");
	const [volumeState, setVolumeState] = useState(true);
	const [currVolume, setCurrVolume] = useState(0.3);
	const [captionsMenuBar, setCaptionsMenuBar] = useState(false);
	const [captionLang, setCaptionLang] = useState("off");
	const [settingsMenu, setSettingsMenu] = useState(false);
	const [settingsOption, setSettingsOption] = useState("auto");
	const [stretchPlayer, setStretchPlayer] = useState(false);
	const [autoPlayState, setAutoPlayState] = useState(autoplay);
	const [fullScreen, setFullScreen] = useState(false);
	const [videoDuration, setVideoDuration] = useState({
		current: "0:0:0",
		total: "0:0:0",
	});
	const [arrowsToggle, setArrowsToggle] = useState(false);

	const videoPlayerRef = useRef(null);
	const currentTimeLineRef = useRef(null);
	const videoControlsContainerRef = useRef(null);
	const videoContainerRef = useRef(null);

	useEffect(() => {
		const videoPlayer = videoPlayerRef.current;
		const currentTimeLine = currentTimeLineRef.current;
		const videoControlsContainer = videoControlsContainerRef.current;
		const videoContainer = videoContainerRef.current;

		const handlePlay = () => {
			setVideostate(false);
		};

		const handlePause = () => {
			setVideostate(true);
		};

		const handleClick = (e) => {
			if (
				e.target.dataset.div !== "caption" &&
				!e.target.id?.split("-")[0].includes("captionlang")
			) {
				setCaptionsMenuBar(false);
			}
			if (
				e.target.dataset.div !== "settings" &&
				!e.target.id?.split("-")[0].includes("settingsoption") &&
				!e.target.id.includes("autoplay") &&
				!e.target.dataset.switch
			) {
				setSettingsMenu(false);
			}
			if (
				e.target.dataset.div !== "playback" &&
				!e.target.id?.split("-")[0].includes("playbackoption")
			) {
				setPlaybackOptionsBox(false);
			}
		};

		const handleMouseEnter = () => {
			videoControlsContainer?.classList.remove(css["dnone"]);
			setArrowsToggle(true);
		};

		const handleMouseLeave = () => {
			videoControlsContainer?.classList.add(css["dnone"]);
			setArrowsToggle(false);
		};

		const handleFullscreenChange = () => {
			if (document.fullscreenElement === null) {
				setFullScreen(false);
			}
		};

		const formatTime = (time) => {
			const hours = Math.floor(time / 3600);
			const minutes = Math.floor((time % 3600) / 60);
			const seconds = Math.floor(time % 60);
			return `${hours}:${minutes}:${seconds}`;
		};

		const handleTimeUpdate = () => {
			const { currentTime, duration } = videoPlayerRef.current;
			const current = formatTime(currentTime);
			const total = formatTime(duration);
			setVideoDuration({ current, total });

			currentTimeLineRef.current.style.width = `${
				(currentTime / duration) * 100
			}%`;
		};

		videoPlayer.addEventListener("play", handlePlay);
		videoPlayer.addEventListener("pause", handlePause);
		window.addEventListener("click", handleClick);
		videoContainer.addEventListener("mouseenter", handleMouseEnter);
		videoContainer.addEventListener("mouseleave", handleMouseLeave);
		videoPlayer.addEventListener("fullscreenchange", handleFullscreenChange);
		videoPlayer.addEventListener("timeupdate", handleTimeUpdate);

		return () => {
			videoPlayer.removeEventListener("play", handlePlay);
			videoPlayer.removeEventListener("pause", handlePause);
			window.removeEventListener("click", handleClick);
			videoContainer.removeEventListener("mouseenter", handleMouseEnter);
			videoContainer.removeEventListener("mouseleave", handleMouseLeave);
			videoPlayer.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange
			);
			videoPlayer.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, []); // Empty dependency array to ensure the effect runs only once

	useEffect(() => {
		videoPlayerRef.current.volume = currVolume;
	}, [currVolume]);

	const playBtnHandler = () => {
		setVideostate(true);
		videoPlayerRef.current.play();
	};

	const pauseBtnHandler = () => {
		setVideostate(false);
		videoPlayerRef.current.pause();
	};

	const videoPlayerHandler = () => {
		const { link, type } = data;

		if (type === "video") {
			const videoId = getYouTubeVideoId(link);
			if (videoId) {
				// Handle playing YouTube video
				const opts = {
					height: "390",
					width: "640",
					playerVars: {
						autoplay: 1,
					},
				};

				return <YouTube videoId={videoId} opts={opts} />;
			}
		} else {
			setVideostate((prevState) => !prevState);
			videoPlayerRef.current.paused
				? videoPlayerRef.current.play()
				: videoPlayerRef.current.pause();
		}
	};

	const getYouTubeVideoId = (url) => {
		const match = url.match(
			/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/
		);
		return match ? match[1] : null;
	};

	const reversePlaybackHandler = () => {
		videoPlayerRef.current.currentTime -= 10;
	};

	const forwardPlaybackHandler = () => {
		videoPlayerRef.current.currentTime += 10;
	};

	const notesHandler = () => {
		// Handle notes
	};

	const volumeHandler = () => {
		setVolumeState((prevState) => {
			if (!prevState) {
				setCurrVolume(0);
			}
			return !prevState;
		});

		videoPlayerRef.current.muted = !volumeState;
	};

	const volumeChangeHandler = (e) => {
		const volume = e.target.value || 0;
		setCurrVolume(volume);

		if (volume <= 0) {
			setVolumeState(false);
		} else {
			setVolumeState(true);
		}
	};

	const captionsLangOptions = [
		{
			key: "Off",
			value: "off",
		},
		{
			key: "Telugu[Auto]",
			value: "telugu",
		},
		{
			key: "Sanskrit[Auto]",
			value: "sanskrit",
		},
		{
			key: "Hindi[Auto]",
			value: "hindi",
		},
		{
			key: "Tamil[Auto]",
			value: "tamil",
		},
		{
			key: "English[Auto]",
			value: "english",
		},
		{
			key: "French[Auto]",
			value: "french",
		},
	];

	const resolutionOptions = [
		{
			key: "1080p",
			value: "1080",
		},
		{
			key: "720p",
			value: "720",
		},
		{
			key: "576p",
			value: "576",
		},
		{
			key: "432p",
			value: "432",
		},
		{
			key: "360p",
			value: "360",
		},
		{
			key: "Auto",
			value: "auto",
		},
	];

	const playBackSpeedOptions = [
		{
			key: "3.0x",
			value: "3.0",
		},
		{
			key: "2.5x",
			value: "2.5",
		},
		{
			key: "2.0x",
			value: "2.0",
		},
		{
			key: "1.0x",
			value: "1.0",
		},
		{
			key: "0.5x",
			value: "0.5",
		},
	];

	const playbackSpeedHandler = () => {
		setPlaybackOptionsBox((p) => !p);
	};

	useEffect(() => {
		videoPlayerRef.current.playbackRate = playbackSpeedOption || "1.0";
	}, [playbackSpeedOption]);

	const playerArrowClickHandler = (arrow) => {
		console.log("clicked", arrow);
	};

	const strecthBtnHandler = () => {
		setStretchPlayer((p) => !p);
		playerWidthSetter((p) => !p);
	};

	return (
		<div
			className="w-full max-w-[1200px] h-full max-h-[600px] flex justify-center mx-auto bg-dark-navy relative"
			ref={videoContainerRef}
			id="videoContainer"
			style={{
				maxWidth: playerWidthState ? "100%" : "1200px",
				maxHeight: playerWidthState ? "100%" : "700px",
			}}>
			{arrowsToggle ? (
				<div
					className="relative top-[45%] w-8 h-12 flex justify-center items-center cursor-pointer border-2 border-solid border-gray-500"
					id="leftArrow"
					onClickCapture={() => playerArrowClickHandler("left")}>
					<RiArrowLeftSLine className="w-4 h-4" />
				</div>
			) : null}
			<div
				className="p-2 absolute bottom-0 left-0 right-0 z-[1] bg-[rgba(0,0,0,0.4)] opacity-[1] cursor-pointer"
				onClick={() => {}}
				ref={videoControlsContainerRef}
				id="videoControlsContainer">
				<div className="w-full h-4 bg-white relative">
					<div className="absolute top-0 left-0 w-[80%] h-full bg-gray-400"></div>
					<div
						className="absolute top-0 left-0 w-0 h-full bg-vivid-pink"
						id="currentTimeLine"
						ref={currentTimeLineRef}></div>
				</div>
				<div className="flex justify-between">
					<div className="flex items-center">
						<button className="bg-transparent cursor-pointer px-5 py-2 font-semibold text-gray-500">
							{!videoState ? (
								<BsFillPlayFill
									className="w-6 h-6 m-2 cursor-pointer"
									onClick={playBtnHandler}
								/>
							) : (
								<FaPause
									className="w-6 h-6 m-2 cursor-pointer"
									onClick={pauseBtnHandler}
								/>
							)}
						</button>
						<button className="bg-transparent cursor-pointer flex">
							<TbRewindBackward10
								className="w-10 h-6 m-2 text-white cursor-pointer"
								onClick={reversePlaybackHandler}
							/>
							<TbRewindForward10
								className="w-10 h-6 m-2 text-white cursor-pointer"
								onClick={forwardPlaybackHandler}
							/>
						</button>
						<div id="buttonBox" className="relative">
							{playbackOptionsBox ? (
								<div className="h-auto w-16 mb-5 scroll-m-0 absolute bottom-12 text-white bg-dark-navy -right-4">
									{playBackSpeedOptions?.map((item, id) => {
										return (
											<div
												key={`playbackoption-${id}`}
												className={` min-w-[200px] text-sm px-2 py-4 cursor-pointer items-center justify-between
													${
														item.value === playbackSpeedOption
															? "after:my-0 after:mx-0 after:rounded-xl after:block"
															: ""
													}
												`}
												id={`playbackoption-${id}`}
												onClick={() => setPlaybackSpeedOption(item.value)}>
												{item.key}
											</div>
										);
									})}
								</div>
							) : null}
							<button
								data-div="playback"
								className="px-2 py-1 w-max text-gray-400 font-bold cursor-pointer"
								onClick={playbackSpeedHandler}>
								{playbackSpeedOption}x
							</button>
						</div>
						<div className="m-2 text-lg font-bold text-white">
							{`${videoDuration.current}/${videoDuration.total}`}
						</div>
						<button className="bg-transparent cursor-pointer">
							<GrNotes
								className="w-5 h-5 cursor-pointer text-white"
								onClick={notesHandler}
							/>
						</button>
					</div>
					<div className="flex items-center">
						<div className="relative">
							{!captionsMenuBar ? (
								<div className="absolute -top-7 -left-8 w-max h-7 bg-gray-400 cursor-pointer">
									<input
										type="range"
										min="0"
										max="1"
										value={currVolume}
										step="0.1"
										onChange={volumeChangeHandler}
									/>
									{/* <div className={css.volumeScrollBar}></div> */}
								</div>
							) : null}
							<button className="bg-transparent cursor-pointer">
								{volumeState ? (
									<BsFillVolumeUpFill
										className="w-5 h-5 m-2 text-white cursor-pointer"
										onClick={volumeHandler}
									/>
								) : (
									<BiVolumeMute
										className="w-5 h-5 m-2 text-white cursor-pointer"
										onClick={volumeHandler}
									/>
								)}
							</button>
						</div>
						<div id="captionsBox" className="relative">
							{captionsMenuBar ? (
								<div className="h-[200px] overflow-y-scroll absolute bottom-12 -right-4 text-white bg-gray-400">
									{captionsLangOptions?.map((item, id) => {
										return (
											<div
												key={`captionlang-${id}`}
												className={`
													min-w-[200px] h-10 text-base py-2 px-8 cursor-pointer flex items-center justify-between 
													${
														item.value === captionLang
															? "after:py-0 after:px-4 after:rounded-[50%] after:w-2 after:h-2 bg-[#a435f0]"
															: ""
													}
												`}
												id={`captionlang-${id}`}
												onClick={() => setCaptionLang(item.value)}>
												{item.key}
											</div>
										);
									})}
								</div>
							) : null}
							<button
								className="bg-transparent cursor-pointer"
								onClick={() => setCaptionsMenuBar((p) => !p)}>
								<PiClosedCaptioningBold className="w-5 h-5 m-2 text-white cursor-pointer" />
							</button>
						</div>
						<div id="settingsbox" className="">
							{settingsMenu ? (
								<div className="h-[200px] overflow-y-scroll absolute bottom-12 -right-4 text-white bg-gray-400">
									{resolutionOptions?.map((item, id) => {
										return (
											<div
												key={`settingsoption-${id}`}
												className={`
													min-w-[200px] text-base px-4 py-2 cursor-pointer flex items-center justify-between
													${
														item.value === settingsOption
															? "after:my-0 after:mx-4 after:rounded-xl after:block after:w-2 after:h-2 after:bg-light-blue"
															: ""
													}
												`}
												id={`settingsoption-${id}`}
												onClick={() => setSettingsOption(item.value)}>
												{item.key}
											</div>
										);
									})}
									<hr />
									<div className="p-4" id="autoplay">
										Autoplay
										<label
											className="relative inline-block w-10 h-4"
											data-switch>
											<input
												type="checkbox"
												checked={autoPlayState}
												data-switch
												onChange={() => {
													setAutoPlayState((p) => !p);
												}}
												className="opaticy-0 w-0 h-0"
											/>
											<span
												data-switch
												className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white"></span>
										</label>
									</div>
								</div>
							) : null}
							<button className="bg-transparent cursor-pointer">
								<RiSettings5Fill
									className="w-5 h-5 m-2 text-white cursor-pointer"
									onClick={() => setSettingsMenu((p) => !p)}
								/>
							</button>
						</div>
						<button className="bg-transparent cursor-pointer">
							<FaExpandAlt
								onClick={() => setFullScreen((p) => !p)}
								className={`w-5 h-5 m-2 cursor-pointer text-white ${
									fullScreen ? "rotate-[130]" : ""
								}`}
							/>
						</button>
						<button
							className="bg-transparent cursor-pointer "
							onClick={strecthBtnHandler}>
							{stretchPlayer ? (
								<FaExpandAlt className="w-5 h-5 m-2 cursor-pointer text-white" />
							) : (
								<GrContract className="w-5 h-5 m-2 cursor-pointer text-white" />
							)}
						</button>
					</div>
				</div>
			</div>
			{data.type === "video" ? (
				<div>
					<YouTube videoId={getYouTubeVideoId(data.link)} />
				</div>
			) : (
				<video
					ref={videoPlayerRef}
					controlsList="nodownload"
					className="w-full h-full"
					onClick={videoPlayerHandler}
					id="video">
					<source src={video} type="video/webm" />
					<source src={video} type="video/mp4" />
				</video>
			)}
			{/* <video
				ref={videoPlayerRef}
				controlsList="nodownload"
				className="w-full h-full"
				onClick={videoPlayerHandler}
				id="video">
				<source src={video} type="video/webm" />
				<source src={video} type="video/mp4" />
			</video> */}
		</div>
	);
};

export default VideoPlayer;
