import React, { useState } from "react";
import { SearchBar } from "./components.js";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

// Images
import WekoAppt from "../images/Main/WeKoAppt.png";
import nearMeSVG from "../images/Main/nearme.svg";
import searchSVG from "../images/Main/search.svg";
import compassSVG from "../images/Main/compass.svg";

// Bootstrap
import Container from "react-bootstrap/Container";

const SHeader = styled.div`
	margin-top: 5px;
	text-align: center;
	font-size: 20px;
	padding: 15px;
	border-bottom: solid 3px lightgray;
`;

const SMainLogo = styled.div`
	justify-content: center;
	padding-top: 60px;
	padding-bottom: 60px;
	padding-right: 35px;
	padding-left: 35px;
	display: flex;
	width: 200;
	height: 100;
`;

const SMainImage = styled.img`
	width: 100%;
	height: 100%;
`;

const SButton = styled.button`
	margin-top: 20px;
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 5px;
	font-size: 16px;

	background: url(${props => props.imgUrl});
	background-position: 7px 6px;
	background-size: 32px 32px;
	background-repeat: no-repeat;
	padding: 10px 20px 10px 40px;
`;

export const MainImage = () => {
	return (
		<SMainLogo>
			<SMainImage src={WekoAppt} alt="logo" />
		</SMainLogo>
	);
};

export function Main(props) {
	const [search, setSearch] = useState("");

	if (search.trim() !== "") {
		return (
			// push(boolean): When true, redirecting will push a new entry onto the history instead of replacing the current one.
			<Redirect push to={`/search/${search}`} /> // very good!!
		);
	}

	const handleNearMe = () => {
		//console.log(props);
		//console.log(props.history);
		props.history.push("/nearme");
	};

	return (
		<Container>
			<SHeader>Search Doctors</SHeader>
			<MainImage />
			<SearchBar onSubmit={setSearch} />
			<SButton imgUrl={nearMeSVG} type="button" onClick={handleNearMe}>
				{"Near Me"}
			</SButton>
		</Container>
	);
}

export default Main;
