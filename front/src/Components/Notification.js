import React from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { useUserAppointment } from "./api.js";
import { useReducerState } from "./UserContext.js";

// Images
import WekoAppt from "../images/Main/WeKoAppt.png";

// Bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

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

const SAppointmentDetail = styled.div`
	justify-content: center;
	height: 10x;
	margin-top: 1px;
	margin-bottom: 1px;
	padding-top: 2px;
	padding-left: 4px;
	color: black;
	border: solid 2px lightgrey;
`;

function AppointmentSection({ children }) {
	//console.log(children);

	return <div>{children}</div>;
}

function AppointmentsDetail({
	id,
	appointment,
	patientFirstName,
	patientLastName,
	dateTime,
	doctorFirstName,
	doctorLastName,
	doctorAddress
}) {
	var patientFullName = patientFirstName + " " + patientLastName;
	var doctorFullName = doctorFirstName + " " + doctorLastName;
	//console.log(appointment); // good

	return (
		<Link to={`/notification/appointment/${id}`}>
			<SAppointmentDetail>
				<h6>Patient Name: {" " + patientFullName}</h6>
				<h6>Doctor: {" " + doctorFullName}</h6>
				<h6>Time: {dateTime}</h6>
				<h6>Address: {" " + doctorAddress}</h6>
			</SAppointmentDetail>
		</Link>
	);
}

export default function Notification(props) {
	const state = useReducerState();
	const { loading, appointments, error } = useUserAppointment(
		state.status.userEmail
	);

	// console.log(appointments); //good
	// console.log(props);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Something went wrong: {error.message}</p>;
	}

	return (
		<>
			{state.status.isLoggedIn && state.status.userEmail ? (
				<Container>
					<SHeader>Notification</SHeader>
					<SNotMainLogo>
						<SNotMainImage src={WekoAppt} alt="WeKoLogo" />
					</SNotMainLogo>
					{appointments.length !== 0 ? (
						<>
							<p>Your Appointment</p>
							<AppointmentSection>
								{appointments.map(appointment => (
									<AppointmentsDetail
										key={appointment._id}
										// appointment={appointment}
										id={appointment._id}
										patientFirstName={appointment.patientFirstName}
										patientLastName={appointment.patientLastName}
										dateTime={appointment.slot_time}
										doctorFirstName={appointment.doctorID.firstName}
										doctorLastName={appointment.doctorID.lastName}
										doctorAddress={appointment.doctorID.address}
									/>
								))}
							</AppointmentSection>
							<br />
							<br />
						</>
					) : (
						<p>No Appointment</p>
					)}
				</Container>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
}
