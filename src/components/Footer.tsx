import { h, Fragment } from "preact";

const Footer = () => (
	<>
		<div className="mt-8 mb-4 flex flex-col justify-center items-center">
			<span className="text-sm text-slate-400">Made by</span>
			<div className="text-lg">
				<a href="https://rene.wang">Rene Wang</a>
			</div>
		</div>
	</>
);

export default Footer;
