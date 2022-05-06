import React from "react";

export default function ErrorMESSAGE({ text }) {
	return (
		<span className="error">
			<em>{text}</em>
		</span>
	);
}
