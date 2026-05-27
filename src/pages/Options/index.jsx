import { h, Component, render } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../../components/Footer";
import EmptyHint from "../../components/EmptyHint";

function Tweet({ tweet }) {
	return (
		<div
			class={`${
				tweet.engaged
					? "border-blue-400 border-2 group is-engaged"
					: "border border-gray-200"
			} mb-4 rounded-xl relative group/item overflow-hidden break-inside-avoid ${
				tweet.bookmarked ? "is-bookmarked" : ""
			}`}
		>
			<span className="bg-blue-400 hidden group-[.is-engaged]:block h-5 text-white text-xs leading-5 px-2 absolute rounded-bl-sm rounded-t-none right-0 top-0">
				Engaged
			</span>
			<a target="_blank" class="block" href={tweet.tweetUrl}>
				<div class="bg-white hover:bg-gray-50 cursor-pointer p-4">
					<div class="flex justify-between">
						<span class="name">{tweet.userName}</span>
						<span class="text-gray-500">
							{formatDate(tweet.tweetTime)}
						</span>
					</div>
					<p class="text-gray-700 mt-1 w-full text-base">
						{tweet.tweetBody}
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
			</a>
			<div class="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/item:pointer-events-auto">
				<button
					onClick={() => toggleBookmark(tweet.tweetUrl)}
					title={tweet.bookmarked ? "Remove bookmark" : "Bookmark"}
					aria-label={
						tweet.bookmarked ? "Remove bookmark" : "Bookmark"
					}
					class="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 shadow"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="16"
						viewBox="0 -960 960 960"
						fill="white"
					>
						<path
							d={
								tweet.bookmarked
									? "M200-120v-680h560v680L480-280 200-120Z"
									: "M200-120v-680h560v680L480-280 200-120Zm60-91 220-93 220 93v-529H260v529Z"
							}
						/>
					</svg>
				</button>
				<button
					onClick={() => deleteTweet(tweet.tweetUrl)}
					title="Delete"
					aria-label="Delete"
					class="h-8 w-8 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 shadow"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="16"
						viewBox="0 -960 960 960"
						fill="white"
					>
						<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
					</svg>
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
			<img
				height="20"
				width="20"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnCAEEAgfkAvLDAAAF6klEQVRo3u2Za2wUVRTHf7vtstutCN0CLUJTeaiASKUQCDSUkogaBDQl+IVEwSqh+NZqkPBBQHkEDcRPBqQEEhoSEx5CyiMKaFQKCGik4VGQh33QBy3Qx7Zsd68fvF1mZmd2Z3YX+LL/+2Vm7p0z/3vm3HPuPQcSSCCBBB4ubHGS4iAZO4JufAQeFiEbfRjCSAaRRQa9cRCgg5tUU0sVF6mn+8ER6ksu+RQwgnSSQ3oFrVyjgsNUcD02jZnBQOZziFsEEBFaF2dZSY4O5bhpqA+zWcxYnMEnflppxks7Puy4SeFR0hT9AWooYzOXEPEmZCeXpbxIirz3cpXjHKOSOjrpwo+NXjhJ4wnGk8co0qT8AOf4iu9pj+ePSuEt/gn+jCZ2MIdsHIYT9ZDHKs7TLd9oYyPZ8aPjYR2tUvQdtpGP25ROh7OES9LaAhxhfHzoZFLKXSm0gjmmyNwjlUMp7XIyf1EQO53+bMGPQOBlE8OikJDKIq5JSpVMiY3OI3wj7eAWy+gdpRQbz/OnpHSKMdHTSeIjvAgELbxPr5imNpE/JKVyBkYrZDo1co18ariizGMylQgE3ayJbnKZHJECNgS9T2yYxQ0EgmZmWX/ZxlJpPQfJjAsdSOITuhAIjliXOYILCAS1TDMxOoPXyMUecVw6exEI7vK2NTp2vpQmuIakCGMdvMCPdHGZEtIjSi6gHoHgBIOsEBrKOQSC84yMMHIIX9MQjO/7eS5CdHeyUeqoyAqhIumbV4Qd5WYeJ6Xb7Gk3WMPjYd+aJE17N6lm6aSyRwqfaDjGxrNsCUY4ZfNTwathAoybXQgE9UwwS2g0/yIQ7DQUm867VIXZnN1hE88Ybm/ekPovMUtoLp0I/CzW7XVQwD65fI1bgAsU49GV8JTcymw3625Xy3ChFwizWCltIHLr5AfydIw8lQMIBGfMeSMXu2VkHhzSU0hFcNNlrtWyXCd2rUcgaGCcGUIDOCWDoNaChvG3wWe9NNOqWW/39LQg5BuLCCDo5BX1Y32P0Zs0AGro1PRcZTd26pim8sld7GEHN3AzhTc17u4CNSRxOOQb1XThwkGGGQ3lSBtZpdPXn+EsVh2BfKylj+y18xLXVdrZTzZP6qy2ybQgECwx1pCbAdgBP0PkMcZFtgwbzdySoxppZLpKxnE2cFteByjnOz5XELDRSIfOxDrxAWh3EUpCT/MtHgKAk0cBeJ2XARs+llNmqM+D1CnuBOW8Q38zP0IPSkJn+YkPVH7BgwcQlHHIUIKgXvOkmTYThFzySxorVZqml9WU6Zwv97GEJkPBtpDTVmbQosLBgwsI0GxMCFpYxgHNiz9TQnVY0TMYqrhLptDAO6sxGCfgC9FvCEZzUrFGTjNWZ0yxapUFKA06PicLaFKtsgMG0dCCYyzgkhR2kXzdEcWazIePX/mQGcxjm1zMkQhZDB1zaUBQzUyD/mKdVIyfDhnBzRAyDK76nnoX6RSxnnIz7CXsls4leTJKnpHeKAKhbjazk5uGua9YM5NuZuEAGvhF22W0+/XREEagldyhX8eR5DAJgGNUarsiH1v0UEWL6bGVIQHayXwyAB9745XCSmEdHSZ2QgF+0zmzTA0egwaHiraQjlTAywpOMiHC+VxwjT1c1jz18DEDAB9bIzjcBwI7JXIvfjRux/OYMJO66JMNSmQxDVfMdHrSMX7WKhLHltGPhRyngfdiTlj1RMkYElYARbTxf0pvaQwpvenBlN5pcmKaGBlsDSY9N6q2GmaRykKu0pP0zI9CggaZbFGkhQstpoXHsDm+aWFQJ85vs5UppkKpnWH3J3EOkMJCrgR9cCM7KCQrTGkhjUms4pyitLDJTGnBWvFlHJ+pii9XOMExKqmlHT9+bCTTi36y+DISj/Xii9WNRF9mU0yuwgH4aaWJNu7iw44TFx5VeUpQw3ZKqcJUeSoaPMYCDnHbZAHvC8bezwLePU2NI5+pEUqcR/ndaokz9iLwKLLJVBWBa6nj/IMuAmulxK1MnkACCSTwsPEfF/n4ctIyymwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDgtMDFUMDQ6MDI6MDQrMDA6MDCiLtkeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA4LTAxVDA0OjAyOjA0KzAwOjAw03NhogAAABJ0RVh0ZXhpZjpFeGlmT2Zmc2V0ADI2UxuiZQAAABl0RVh0ZXhpZjpQaXhlbFhEaW1lbnNpb24AMTAyNPLFVh8AAAAZdEVYdGV4aWY6UGl4ZWxZRGltZW5zaW9uADEwMjRLPo33AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADE5MkBdcVUAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTky06whCAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjkwODYyNTI058q/fgAAAA90RVh0VGh1bWI6OlNpemUAMEJClKI+7AAAAFZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL21udGxvZy9mYXZpY29ucy8yMDIzLTA4LTAxLzQ1NzYyZDZkY2Q2YmM2ZmE2MWMzNTYwOTNkZDNkNjA1Lmljby5wbmdCGETuAAAAAElFTkSuQmCC"
				/>
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
							<svg
								class="absolute left-3 pointer-events-none text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								width="16"
								viewBox="0 -960 960 960"
								fill="currentColor"
							>
								<path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" />
							</svg>
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="20"
								width="20"
								viewBox="0 -960 960 960"
								fill="currentColor"
							>
								<path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z" />
							</svg>
						</button>
						<div class="relative" ref={menuRef}>
							<button
								onClick={() => setMenuOpen((o) => !o)}
								title="More"
								aria-label="More"
								class="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="20"
									viewBox="0 -960 960 960"
									fill="currentColor"
								>
									<path d="M480-200q-33 0-56.5-23.5T400-280q0-33 23.5-56.5T480-360q33 0 56.5 23.5T560-280q0 33-23.5 56.5T480-200Zm0-200q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-200q-33 0-56.5-23.5T400-680q0-33 23.5-56.5T480-760q33 0 56.5 23.5T560-680q0 33-23.5 56.5T480-600Z" />
								</svg>
							</button>
							{menuOpen && (
								<div class="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1">
									<a
										onClick={() => {
											exportTweets(tweet);
											setMenuOpen(false);
										}}
										class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
									>
										Export
									</a>
									<a
										href="https://github.com/RiverTwilight/Timeline"
										target="_blank"
										rel="noreferrer"
										onClick={() => setMenuOpen(false)}
										class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
									>
										GitHub
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
										class="block px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
									>
										Clear {activeTab}
									</a>
									<div class="border-t border-gray-200 my-1" />
									<p class="px-3 py-2 text-xs text-gray-500 leading-relaxed">
										{tweet.length}/100 posts saved. Chrome
										limits the storage available to
										extensions, so the oldest tweet is
										automatically replaced once the limit is
										reached.
									</p>
								</div>
							)}
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
