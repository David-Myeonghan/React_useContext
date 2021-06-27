import React, { useState } from "react";
import { SimpleMap } from "./Googlemap.js";

export function NearMe(props) {
	// const [search, setSearch] = useState("");
	// const [isTyped, setIsTyped] = useState(false);

	return (
		<div>
			Near Me
			<SimpleMap />
		</div>
	);
}

export default NearMe;
