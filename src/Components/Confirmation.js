import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { useUser, useFns } from "./UserContext.js";

// Images
import WeKoLogo from "../images/Main/WeKoAppt.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/FormGroup";
//Bootstrap
import Container from "react-bootstrap/Container";

const SIcon = styled.div`
	justify-content: center;
`;

const SHeader = styled.div`
	margin-top: 5px;
	text-align: center;
	font-size: 20px;
	padding: 15px;
	border-bottom: solid 3px lightgray;
`;

const SNotMainLogo = styled.div`
	justify-content: center;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 35px;
	padding-left: 35px;
	display: flex;
`;

const SNotMainImage = styled.img`
  width: 100%
  height: 100%
//   border: solid 5px green;
`;

const SButton = styled.button`
	margin-top: 20px;
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	//background-colour: green;
	//text-align: center;

	background: url(${props => props.imgUrl});
	background-position: 7px 6px;
	background-size: 32px 32px;
	background-repeat: no-repeat;
	padding: 10px 20px 10px 40px;
`;

function ConfirmDetails({
	selectedDoctorFirstName,
	selectedDoctorLastName,
	selectedDoctorAddress,
	selectedTime,
	userEmail,
	userFirstName,
	userLastName,
	userDob
}) {
	var userFullName = userFirstName + " " + userLastName;
	var parsed = userDob.substring(0, 10).split("-");
	var dob = parsed[2] + ", " + parsed[1] + ", " + parsed[0];

	console.log(userDob);
	return (
		<SIcon>
			<br />
			<h5>Confirmation</h5>
			<br />
			<h6>
				Doctor: {" " + selectedDoctorFirstName + " " + selectedDoctorLastName}
			</h6>
			<h6>Time: {selectedTime}</h6>
			<h6>Address: {" " + selectedDoctorAddress}</h6>
			<br />
			<h6>Name: {userFullName}</h6>
			<h6>DOB: {dob}</h6>
			<h6>Email: {userEmail}</h6>
		</SIcon>
	);
}

function Confirmation(props) {
	const {
		selectedDoctorId,
		selectedDoctorFirstName,
		selectedDoctorLastName,
		selectedDoctorAddress,
		selectedTime,
		userEmail,
		userFirstName,
		userLastName,
		userDob
	} = useUser();

	const { setUserInfo } = useFns();

	const handleSubmit = e => {
		const form = e.currentTarget;
		e.preventDefault();
		props.history.push(`/results/${selectedDoctorId}/${selectedTime}`);
	};

	return (
		<Container>
			<SHeader>Confirm</SHeader>
			<SNotMainLogo>
				<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
			</SNotMainLogo>

			<ConfirmDetails
				selectedDoctorFirstName={selectedDoctorFirstName}
				selectedDoctorLastName={selectedDoctorLastName}
				selectedDoctorAddress={selectedDoctorAddress}
				selectedTime={selectedTime}
				userEmail={userEmail}
				userFirstName={userFirstName}
				userLastName={userLastName}
				userDob={userDob}
			/>
			<br />
			<Button onClick={handleSubmit} variant="primary" type="submit" block>
				Confirm
			</Button>
		</Container>
	);
}

export default Confirmation;
