import React, { useEffect } from "react";
import styled from "styled-components";
import { useFns } from "./UserContext.js";

// Image
import DocPicture from "../images/Doctor.png";

// Bootstrap
import Image from "react-bootstrap/Image";

const GridContainer = styled.div`
	display: grid;
	gird-template-columns: auto auto auto;
	padding: 5px;
	grid-gap: 3px;
	//border: solid 0.5px lightgray;
	text-align: left;
	color: black;
	font-weight: bold;
	//box-shadow: 2px 2px lightgray;
`;

const GridImage = styled(Image)`
	grid-row-start: 1;
	grid-row-end: 3;
	grid-column-start: 1;
	grid-column-end: 2;
	height: 85px;
`;

const GridName = styled.div`
	grid-column-start: 2;
	grid-column-end: 8;
	padding-top: 5px;
	font-size: 20px;
`;

const GridGender = styled.div`
	grid-column-start: 2;
	grid-column-end: 8;
	font-size: 18px;
`;

const GridAddress = styled.div`
	grid-column-start: 1;
	grid-column-end: 8;
	padding: 5px;
	font-size: 16px;
	border: solid 0.5px lightgray;
`;

const GridPhone = styled.div`
	grid-column-start: 1;
	grid-column-end: 8;
	padding: 5px;
	font-size: 16px;
	border: solid 0.5px lightgray;
`;

const GridDate = styled.div`
	grid-column-start: 1;
	grid-column-end: 8;
	padding: 7px;
	font-size: 16px;
	border: solid 0.5px lightgray;
	text-align: center;
`;

export default function DetailPoster({
	id,
	firstName,
	lastName,
	address,
	phone,
	greeting,
	selectedTime
}) {
	var fullName = firstName + " " + lastName;
	var parsed = selectedTime.toString().split(" "); // Selected Date
	var date =
		parsed[0] + ", " + parsed[1] + " " + parsed[2] + " " + parsed[3] + " ";
	var time = parsed[4].substring(0, 5); // Selected Time
	var dateTime = date + time;

	const { setDoctorInfo } = useFns();

	useEffect(() => {
		setDoctorInfo(id, firstName, lastName, address, phone);
	}, []);

	//console.log(selectedTime);
	// console.log(dateTime);

	return (
		<>
			<GridContainer>
				<GridImage src={DocPicture} roundedCircle />
				<GridName>{fullName}</GridName>
				<GridGender>Male</GridGender>

				<GridAddress>{address}</GridAddress>
				<GridPhone>{phone}</GridPhone>
				<GridDate>Time: {dateTime}</GridDate>
			</GridContainer>
		</>
	);
}
