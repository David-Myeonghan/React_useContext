import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchDoctorByID } from "./api.js";
import { isEmpty } from "./components.js";
import { useFns, useUser, useReducerState } from "./UserContext.js";
import DetailPoster from "./DetailPoster.js";
import { getDay } from "date-fns/esm";

// Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const SHeader = styled.div`
	margin-top: 5px;
	text-align: center;
	font-size: 20px;
	padding: 15px;
	border-bottom: solid 3px lightgray;
`;

const SDatePickerContainer = styled.div`
	//margin-right: 10px;
	padding: 5px;
	text-align: center;
`;

function isWeekday(date) {
	const day = getDay(date);
	return day !== 0 && day !== 6;
}

export function Detail(props) {
	//console.log(typeof props.match.params.id); type string
	//const isDoctor = location.includes("/doctor") // should use to check if this is clinic or doctor... but not much difference.
	const Doc_id = props.match.params.id;

	const location = props.location.pathname;
	const state = useReducerState();
	const { setDoctorTime } = useFns();

	const [selectedDateTime, setSelectedDateTime] = useState(new Date());
	const { loading, doctor, error } = useSearchDoctorByID(Doc_id);

	const handleSubmit = () => {
		var parsed = selectedDateTime.toString().split(" "); // Selected Date
		var date =
			parsed[0] + ", " + parsed[1] + " " + parsed[2] + " " + parsed[3] + " ";
		var time = parsed[4].substring(0, 5); // Selected Time
		var dateTime = date + time;

		//console.log(dateTime);
		//console.log(selectedDateTime);
		setDoctorTime(dateTime);

		state.status.isLoggedIn === true
			? props.history.push("/confirm")
			: props.history.push(`${location}/${dateTime}`);
		// TODO: remove /dateTime from above. no need to save time from url address.
	};

	if (loading) {
		return (
			<>
				<Spinner animation="border" variant="primary" />
				<div>Loading...</div>
			</>
		);
	}

	// if a user types an non-existing doctorID on address.
	if (isEmpty(doctor)) {
		alert("No result");
		return <Redirect to="/" />;
	}
	if (error) {
		alert(`Something wernt wrong: ${error.message}`);
		return <Redirect to="/" />;
	}

	return (
		<>
			<Container>
				<SHeader>Details</SHeader>
				{doctor.map(doc => (
					<DetailPoster
						key={doc._id}
						id={doc._id}
						firstName={doc.firstName}
						lastName={doc.lastName}
						address={doc.address}
						phone={doc.phone}
						greeting={doc.greeting}
						available={doc.available}
						location={location}
						selectedTime={selectedDateTime}
					/>
				))}

				<SDatePickerContainer>
					<DatePicker
						filterDate={isWeekday}
						showPopperArrow={false}
						selected={selectedDateTime}
						onChange={date => setSelectedDateTime(date)}
						inline
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={30}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</SDatePickerContainer>
				<Button
					onClick={handleSubmit}
					variant="outline-primary"
					type="submit"
					block
				>
					Book!
				</Button>
			</Container>
		</>
	);
}

export default Detail;
