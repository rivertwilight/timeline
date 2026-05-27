// @ts-nocheck
import { h, Component, render } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { motion, AnimatePresence } from "motion/react";
import {
	Search,
	RefreshCw,
	MoreVertical,
	Bookmark,
	Trash2,
	Download,
	ExternalLink,
} from "lucide-preact";
import Footer from "../../components/Footer";
import EmptyHint from "../../components/EmptyHint";

function Avatar({ url, name }) {
	if (url) {
		return (
			<img
				src={url}
				alt=""
				class="h-8 w-8 rounded-full object-cover flex-shrink-0 bg-gray-200"
				loading="lazy"
				onError={(e) => {
					// Hide on failure so the parent fallback can show.
					e.currentTarget.style.display = "none";
				}}
			/>
		);
	}
	const letter = ((name || "?").trim().charAt(0) || "?").toUpperCase();
	return (
		<div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium flex-shrink-0">
			{letter}
		</div>
	);
}

function renderTextWithLinks(text) {
	if (!text) return text;
	const urlRegex = /(https?:\/\/\S+)/g;
	return text.split(urlRegex).map((part, i) => {
		if (part.startsWith("http")) {
			return (
				<a
					key={i}
					href={part}
					target="_blank"
					rel="noreferrer"
					onClick={(e) => e.stopPropagation()}
					class="text-blue-500 hover:underline pointer-events-auto"
				>
					{part}
				</a>
			);
		}
		return part;
	});
}

function Tweet({ tweet }) {
	return (
		<div
			class={`${
				tweet.engaged
					? "border-blue-400 border-2 group is-engaged"
					: "border border-gray-200"
			} mb-4 rounded-xl relative group/item overflow-hidden break-inside-avoid bg-white hover:bg-gray-50 cursor-pointer ${
				tweet.bookmarked ? "is-bookmarked" : ""
			}`}
		>
			<span className="bg-blue-400 hidden group-[.is-engaged]:block h-5 text-white text-xs leading-5 px-2 absolute rounded-bl-sm rounded-t-none right-0 top-0 z-10">
				Engaged
			</span>
			<a
				target="_blank"
				rel="noreferrer"
				class="absolute inset-0"
				aria-label={`Open tweet by ${tweet.userName}`}
				href={tweet.tweetUrl}
			/>
			<div class="relative p-4 pointer-events-none">
				<div
					class={`flex gap-3 ${
						tweet.userHandle ? "items-start" : "items-center"
					}`}
				>
					<Avatar url={tweet.avatarUrl} name={tweet.userName} />
					<div class="flex-1 min-w-0">
						<div class="flex items-baseline justify-between gap-2">
							<span class="font-semibold text-gray-900 truncate">
								{tweet.userName}
							</span>
							<span class="text-gray-500 text-sm whitespace-nowrap flex-shrink-0">
								{formatDate(tweet.tweetTime)}
							</span>
						</div>
						{tweet.userHandle && (
							<div class="text-gray-500 text-sm truncate">
								{tweet.userHandle}
							</div>
						)}
					</div>
				</div>
				<p class="text-gray-700 mt-2 w-full text-base whitespace-pre-wrap break-words">
					{renderTextWithLinks(tweet.tweetBody)}
				</p>
				<div class="flex overflow-x-auto mt-2 gap-1">
					{tweet.tweetImages.length > 0 &&
						tweet.tweetImages.map((img) => (
							<img
								class="rounded-lg object-cover h-32 w-32"
								src={img}
							/>
						))}
				</div>
			</div>
			<div class="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/item:pointer-events-auto">
				<button
					onClick={() => toggleBookmark(tweet.tweetUrl)}
					title={tweet.bookmarked ? "Remove bookmark" : "Bookmark"}
					aria-label={
						tweet.bookmarked ? "Remove bookmark" : "Bookmark"
					}
					class="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 shadow text-white"
				>
					<Bookmark
						size={16}
						strokeWidth={2}
						fill={tweet.bookmarked ? "currentColor" : "none"}
					/>
				</button>
				<button
					onClick={() => deleteTweet(tweet.tweetUrl)}
					title="Delete"
					aria-label="Delete"
					class="h-8 w-8 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 shadow text-white"
				>
					<Trash2 size={16} strokeWidth={2} />
				</button>
			</div>
		</div>
	);
}

function toggleBookmark(tweetUrl) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(
			["tweets", "bookmarkedTweets"],
			function (data) {
				let tweets = data.tweets || [];
				let bookmarkedTweets = data.bookmarkedTweets || [];
				let updated = false;
				for (let tweet of tweets) {
					if (tweet.tweetUrl === tweetUrl) {
						tweet.bookmarked = !tweet.bookmarked; // Toggle the bookmark status
						if (tweet.bookmarked) {
							bookmarkedTweets.push(tweet);
						} else {
							bookmarkedTweets = bookmarkedTweets.filter(
								(t) => t.tweetUrl !== tweetUrl
							);
						}
						updated = true;
						break;
					}
				}
				if (updated) {
					chrome.storage.local.set(
						{ tweets: tweets, bookmarkedTweets: bookmarkedTweets },
						() => {
							if (chrome.runtime.lastError) {
								reject(chrome.runtime.lastError);
							} else {
								resolve();
							}
						}
					);
				} else {
					resolve();
				}
			}
		);
	});
}

function deleteTweet(tweetUrl, targets = ["tweets", "bookmarkedTweets"]) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(targets, function (data) {
			let updatedData = {};
			let updated = false;

			if (targets.includes("tweets")) {
				let tweets = data.tweets || [];
				for (let tweetIndex in tweets) {
					if (tweetUrl === tweets[tweetIndex].tweetUrl) {
						tweets.splice(tweetIndex, 1);
						updatedData.tweets = tweets;
						updated = true;
						break;
					}
				}
			}

			if (targets.includes("bookmarkedTweets")) {
				let bookmarkedTweets = data.bookmarkedTweets || [];
				bookmarkedTweets = bookmarkedTweets.filter(
					(t) => t.tweetUrl !== tweetUrl
				);
				if (data.bookmarkedTweets.length !== bookmarkedTweets.length) {
					updatedData.bookmarkedTweets = bookmarkedTweets;
					updated = true;
				}
			}

			if (updated) {
				chrome.storage.local.set(updatedData, () => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve();
					}
				});
			} else {
				resolve();
			}
		});
	});
}

function searchTweets(searchTerm) {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(
			["tweets", "bookmarkedTweets"],
			function (data) {
				let tweets = data.tweets || [];
				let bookmarkedTweets = data.bookmarkedTweets || [];
				let results = tweets.filter((tweet) =>
					tweet.tweetBody
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
				let bookmarkedResults = bookmarkedTweets.filter((tweet) =>
					tweet.tweetBody
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
				resolve({ results, bookmarkedResults });
			}
		);
	});
}

function clearTweets(targets) {
	chrome.storage.local.remove(targets, function () {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
}

function formatDate(time) {
	const date = new Date(time);
	const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
	const absSeconds = Math.abs(diffSeconds);

	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	const units = [
		["year", 60 * 60 * 24 * 365],
		["month", 60 * 60 * 24 * 30],
		["week", 60 * 60 * 24 * 7],
		["day", 60 * 60 * 24],
		["hour", 60 * 60],
		["minute", 60],
	];

	for (const [unit, secondsInUnit] of units) {
		if (absSeconds >= secondsInUnit) {
			return rtf.format(Math.round(diffSeconds / secondsInUnit), unit);
		}
	}

	return rtf.format(diffSeconds, "second");
}

function exportTweets(tweets) {
	const json = JSON.stringify(tweets);
	const blob = new Blob([json], { type: "application/json" });
	const href = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = href;
	link.download = "tweets.json";
	link.click();
	URL.revokeObjectURL(href); // free up storage--no longer needed.
}

function CornerLogo() {
	return (
		<div class="fixed left-3 top-3 z-20 flex items-center gap-2 backdrop-blur px-2 py-1 rounded-md">
			<img height="28" width="28" src="./icon/icon-48.png" alt="Timeline" />
		</div>
	);
}

function App() {
	const [tweet, setTweet] = useState([]);
	const [bookmarkedPost, setBookmarkedPost] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [activeTab, setActiveTab] = useState("History");
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		if (!menuOpen) return;
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () =>
			document.removeEventListener("mousedown", handleClick);
	}, [menuOpen]);

	const fetchTweets = () => {
		chrome.storage.local.get(["tweets", "bookmarkedTweets"], (data) => {
			let fetchedTweets = data.tweets || [];
			let fetchedBookmarkedTweets = data.bookmarkedTweets || [];

			fetchedTweets.sort(
				(a, b) => new Date(b.captureDate) - new Date(a.captureDate)
			);

			fetchedBookmarkedTweets.sort(
				(a, b) => new Date(b.captureDate) - new Date(a.captureDate)
			);

			setTweet(fetchedTweets);
			setBookmarkedPost(fetchedBookmarkedTweets);
		});
	};

	// Handle search term changes
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// Search for tweets when search term changes
	useEffect(() => {
		if (searchTerm) {
			searchTweets(searchTerm).then((results) => {
				console.log(results);
				if (activeTab == "History") {
					setSearchResults([...results.results]);
				} else {
					setSearchResults([...results.bookmarkedResults]);
				}
			});
		} else {
			setSearchResults([]);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchTweets();

		const handleStorageChange = (changes) => {
			for (let key in changes) {
				if (key === "tweets" || key === "bookmarkedTweets") {
					fetchTweets(); // refetch the tweets
				}
			}
		};

		chrome.storage.onChanged.addListener(handleStorageChange);

		return () =>
			chrome.storage.onChanged.removeListener(handleStorageChange);
	}, []);

	return (
		<div class="relative min-w-[800px] max-w-[1000px] mx-auto">
			<CornerLogo />
			<div class="relative flex">
				<main class="flex-1 px-4 pt-14 rounded min-w-[700px] w-full">
					<nav class="sticky top-0 z-20 -mx-4 px-4 py-3 mb-4 flex items-center gap-2 bg-gray-100/80 backdrop-blur">
						<div class="relative flex gap-1">
							{["History", "Favorite"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									class="relative text-sm font-medium cursor-pointer rounded-full px-4 py-1.5"
								>
									{activeTab == tab && (
										<motion.span
											layoutId="tab-pill"
											className="absolute inset-0 bg-black rounded-full"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
									<span
										class={`relative transition-colors duration-200 ${
											activeTab == tab
												? "text-white"
												: "text-gray-700 hover:text-gray-900"
										}`}
									>
										{tab}
									</span>
								</button>
							))}
						</div>
						<div class="flex-1" />
						<div class="relative flex items-center">
							<Search
								size={16}
								class="absolute left-3 pointer-events-none text-gray-400"
							/>
							<input
								id="searchInput"
								type="text"
								value={searchTerm}
								onInput={handleSearchChange}
								placeholder="Search"
								class="h-9 pl-9 pr-3 w-48 rounded-full text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-400"
							/>
						</div>
						<button
							onClick={fetchTweets}
							title="Refresh"
							aria-label="Refresh"
							class="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
						>
							<RefreshCw size={18} strokeWidth={2} />
						</button>
						<div class="relative" ref={menuRef}>
							<button
								onClick={() => setMenuOpen((o) => !o)}
								title="More"
								aria-label="More"
								class="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
							>
								<MoreVertical size={20} strokeWidth={2} />
							</button>
							<AnimatePresence>
								{menuOpen && (
									<motion.div
										initial={{
											opacity: 0,
											scale: 0.95,
											y: -4,
										}}
										animate={{
											opacity: 1,
											scale: 1,
											y: 0,
										}}
										exit={{
											opacity: 0,
											scale: 0.95,
											y: -4,
										}}
										transition={{ duration: 0.15 }}
										class="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-30 p-1 origin-top-right"
									>
										<a
											onClick={() => {
												exportTweets(tweet);
												setMenuOpen(false);
											}}
											class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg"
										>
											<span>Export</span>
											<Download
												size={14}
												class="text-gray-400"
											/>
										</a>
										<a
											href="https://github.com/RiverTwilight/Timeline"
											target="_blank"
											rel="noreferrer"
											onClick={() => setMenuOpen(false)}
											class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg"
										>
											<span>GitHub</span>
											<ExternalLink
												size={14}
												class="text-gray-400"
											/>
										</a>
										<a
											onClick={() => {
												clearTweets(
													activeTab == "History"
														? ["tweets"]
														: ["bookmarkedTweets"]
												);
												setMenuOpen(false);
											}}
											class="flex items-center justify-between px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-lg"
										>
											<span>Clear {activeTab}</span>
											<Trash2 size={14} />
										</a>
										<div class="border-t border-gray-200 my-1 mx-2" />
										<p class="px-3 py-2 text-xs text-gray-500 leading-relaxed">
											{tweet.length}/100 posts saved.
											Chrome limits the storage available
											to extensions, so the oldest tweet
											is automatically replaced once the
											limit is reached.
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</nav>
					{searchTerm.length == 0 && (
						<section>
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{
										opacity: 0,
										filter: "blur(8px)",
									}}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
									}}
									exit={{
										opacity: 0,
										filter: "blur(8px)",
									}}
									transition={{ duration: 0.18 }}
								>
									{activeTab == "Favorite" ? (
										<div class="columns-2 gap-4 pt-4">
											{bookmarkedPost.map((t) => {
												return <Tweet tweet={t} />;
											})}
										</div>
									) : (
										<div class="columns-2 gap-4 pt-4">
											{tweet
												.filter((t) => {
													return (
														(t.bookmarked &&
															activeTab ==
																"Favorite") ||
														activeTab != "Favorite"
													);
												})
												.map((t) => {
													return <Tweet tweet={t} />;
												})}
										</div>
									)}
									{!!!tweet.length &&
										activeTab == "History" && (
											<EmptyHint key="history" />
										)}
									{!!!bookmarkedPost.length &&
										activeTab == "Favorite" && (
											<EmptyHint key="bookmakred" />
										)}
								</motion.div>
							</AnimatePresence>
							<Footer />
						</section>
					)}
					{searchTerm.length > 0 && (
						<section class="columns-2 gap-4 pt-4">
							{searchResults
								.filter((t) => {
									return (
										(t.bookmarked &&
											activeTab == "Favorite") ||
										activeTab != "Favorite"
									);
								})
								.map((t) => {
									return <Tweet tweet={t} />;
								})}
						</section>
					)}
					<section style="display: none"></section>
				</main>
			</div>
		</div>
	);
}

// Render the App into the DOM
render(<App />, document.body);
