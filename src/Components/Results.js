import React, { useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useMakeAppointment, useSearchDoctorByID } from "./api.js";
import { useUser, useReducerState, useFns } from "./UserContext.js";
import { reservedSuccess } from "../actions/authentication.js";

// Images
import WekoAppt from "../images/Main/WeKoAppt.png";
import success from "../images/success.svg";

// Bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

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

const SNotMainImage = styled(Image)`
	width: 100%
	height: 100%
`;

const SSuccessImage = styled(Image)`
	width: 100%
	height: 100%
	height: 50px;
	justify-content: center;
`;

const SIcon = styled.div`
	justify-content: center;
	height: 50px;
	background: url(${props => props.imgUrl});
	background-position: center;
	background-size: initial;
	background-repeat: no-repeat;
	margin-top: 20px;
`;

function ResultDetails({
	doctorFirstName,
	doctorLastName,
	selectedTime,
	doctorAddress,
	patientFirstName,
	patientLastName,
	patientDob,
	patientEmail
}) {
	var doctorFullName = doctorFirstName + " " + doctorLastName;
	var patientFullName = patientFirstName + " " + patientLastName;

	var parsed = patientDob.substring(0, 10).split("-");
	var dob = parsed[2] + ", " + parsed[1] + ", " + parsed[0];

	const handleGoHome = () => {
		window.location.href = "/";
	};

	return (
		<SIcon>
			<br />
			<h5 text-align="center">Successful!</h5>
			<br />
			<h6>Doctor: {" " + doctorFullName}</h6>
			<h6>Time: {selectedTime}</h6>
			<h6>Address: {" " + doctorAddress}</h6>
			<br />
			<h6>Name: {" " + patientFullName}</h6>
			<h6>DOB: {dob}</h6>
			<h6>Email: {patientEmail}</h6>

			<Button variant="primary" onClick={handleGoHome} block>
				Go home
			</Button>
		</SIcon>
	);
}

export function Results(props) {
	const { setDoctorInfo, setDoctorTime, setReducerState } = useFns();
	const state = useReducerState();
	const {
		selectedDoctorId,
		selectedDoctorFirstName,
		selectedDoctorLastName,
		selectedDoctorAddress,
		selectedDoctorPhone,
		selectedTime,
		userPhoneNumber,
		userEmail,
		userFirstName,
		userLastName,
		userDob,
		forMyself
	} = useUser();

	const { loading, result, error } = useMakeAppointment(
		selectedDoctorId,
		selectedTime,
		userFirstName,
		userLastName,
		userPhoneNumber,
		userDob,
		userEmail,
		forMyself
	);

	// console.log(
	// 	selectedDoctorId,
	// 	selectedDoctorFirstName,
	// 	selectedDoctorLastName,
	// 	selectedDoctorAddress,
	// 	selectedDoctorPhone,
	// 	selectedTime,
	// 	userPhoneNumber,
	// 	userEmail,
	// 	userFirstName,
	// 	userLastName,
	// 	userDob
	// );
	// console.log(state);
	// console.log(result);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		alert(`Unknown Error: ${error.message}
		Please restart again`);
		return <Redirect to="/" />;
	}

	return (
		<Container>
			<SHeader>Booking Result</SHeader>
			<SNotMainLogo>
				<SNotMainImage src={WekoAppt} alt="WeKoLogo" />
			</SNotMainLogo>
			<SSuccessImage src={success} alt="Success" />

			{result.map(oneResult => (
				<ResultDetails
					key={oneResult._id}
					doctorFirstName={oneResult.doctorID.firstName}
					doctorLastName={oneResult.doctorID.lastName}
					selectedTime={oneResult.slot_time}
					doctorAddress={oneResult.doctorID.address}
					patientFirstName={oneResult.patientFirstName}
					patientLastName={oneResult.patientLastName}
					patientDob={oneResult.patientDob}
					patientEmail={oneResult.patientEmail}
				/>
			))}
		</Container>
	);
}

export default Results;
