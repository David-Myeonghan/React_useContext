import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import { useOneAppointment, deleteAppointment } from "./api.js";

// Images
import WekoAppt from "../images/Main/WeKoAppt.png";

// Bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { async } from "q";

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
	padding-top: 4px;
	border: solid 2px lightgrey;
`;

function AppointmentDetail({
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
		<SAppointmentDetail>
			<h6>Patient Name: {" " + patientFullName}</h6>
			<h6>Doctor: {" " + doctorFullName}</h6>
			<h6>Time: {dateTime}</h6>
			<h6>Address: {" " + doctorAddress}</h6>
			{/* <NotificationPoster appointment={appointment} /> */}
		</SAppointmentDetail>
	);
}

export default function NotificationPoster(props) {
	//TODO: CHANGE date&time
	const appointmentID = props.match.params.id;
	const { loading, appointment, error } = useOneAppointment(appointmentID);
	console.log(appointmentID);
	console.log(appointment);

	const [showChange, setShowChange] = useState(false);
	const handleShowChange = () => setShowChange(true);
	const handleCloseChange = () => setShowChange(false);
	const [showCancel, setShowCancel] = useState(false);
	const handleShowCancel = () => setShowCancel(true);
	const handleCloseCancel = () => setShowCancel(false);

	const handleChange = () => {};
	const handleCancel = async () => {
		var deleted = null;

		try {
			deleted = await deleteAppointment(appointmentID);
			console.log(deleted);
			setShowCancel(false);
			props.history.replace("/notification");
		} catch (e) {
			alert(e.message);
			return console.log("Error: ", e.message);
		}
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}
	if (error) {
		return <p>Something went wrong: {error.message}</p>;
	}
	return (
		<Container>
			<SHeader>Notification</SHeader>
			<SNotMainLogo>
				<SNotMainImage src={WekoAppt} alt="WeKoLogo" />
			</SNotMainLogo>

			{appointment.map(appoint => (
				<AppointmentDetail
					key={appoint._id}
					id={appoint._id}
					patientFirstName={appoint.patientFirstName}
					patientLastName={appoint.patientLastName}
					dateTime={appoint.slot_time}
					doctorFirstName={appoint.doctorID.firstName}
					doctorLastName={appoint.doctorID.lastName}
					doctorAddress={appoint.doctorID.address}
				/>
			))}

			<br />
			<Button
				onClick={handleShowChange}
				variant="outline-primary"
				type="submit"
				block
			>
				Change Date & Time
			</Button>

			<Modal show={showChange} onHide={handleCloseChange}>
				<Modal.Header closeButton>
					<Modal.Title>Change Date & Time</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Do you want to change date & time of your appointment?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseChange}>
						Close
					</Button>
					<Button variant="primary" onClick={handleChange}>
						Change
					</Button>
				</Modal.Footer>
			</Modal>

			<Button
				onClick={handleShowCancel}
				variant="outline-primary"
				type="submit"
				block
			>
				Cancel this appointment
			</Button>

			<Modal show={showCancel} onHide={handleCloseCancel}>
				<Modal.Header closeButton>
					<Modal.Title>Cancel Appointment</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure to cancel this appointment?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseCancel}>
						Close
					</Button>
					<Button variant="danger" onClick={handleCancel}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
