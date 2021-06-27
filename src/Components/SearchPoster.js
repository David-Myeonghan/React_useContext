import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFns, useUser } from "./UserContext.js";
// Image
import Doctor from "../images/Doctor.png";

// Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	padding: 5px;
	color: black;
	box-shadow: 2px 2px lightgray;
	border: solid 0.5px lightgray;
	text-align: left;
`;
const GridImage = styled(Image)`
	grid-row-start: 1;
	grid-row-end: 3;
	height: 60px;
`;

const GridName = styled.div`
	grid-column-start: 2;
	grid-column-end: 4;
	font-size: 16px;
	font-weight: bold;
`;

const GridAddress = styled.div`
	grid-column-start: 2;
	grid-column-end: 4;
	font-size: 16px;
`;

export default function Detail({ id, firstName, lastName, address, push }) {
	var fullName = firstName + " " + lastName;
	const { setForWhom } = useFns();
	const { forMyself } = useUser();

	const [showForWhom, setShowForWhom] = useState(false);
	const handleShowForWhom = () => setShowForWhom(true);
	const handleCloseForWhom = () => setShowForWhom(false);

	const handleForMyself = () => {
		setForWhom(true); // for myself
		setShowForWhom(false);

		push(`/doctor/${id}`);
	};
	const handleForOthers = () => {
		setForWhom(false); // for others
		setShowForWhom(false);

		push(`/doctor/${id}`);
	};
	//console.log("for me?: ", forMyself);

	return (
		<>
			<GridContainer onClick={handleShowForWhom} type="submit">
				<GridImage src={Doctor} roundedCircle />
				<GridName>{fullName}</GridName>

				<GridAddress>{address}</GridAddress>
			</GridContainer>

			<Modal show={showForWhom} onHide={handleCloseForWhom}>
				<Modal.Header closeButton>
					<Modal.Title>Book For others</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you want to Book for others?</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-primary" onClick={handleForMyself}>
						For myself
					</Button>
					<Button variant="outline-primary" onClick={handleForOthers}>
						For someone else
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
