import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BasicInfoForm } from "./components.js";
import { useFns, useUser, useReducerState } from "./UserContext.js";

// Images
import WeKoLogo from "../images/Main/WeKoAppt.png";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
`;

export default function InputPersonalInfo(props) {
	const push = props.history.push;
	const doctorID = props.match.params.id;
	const appointTime = props.match.params.time;
	const {
		selectedDoctorId,
		selectedTime,
		userPhoneNumber,
		userEmail,
		userFirstName,
		userLastName,
		userDob,
		userAgree
	} = useUser();

	const { setUserInfo } = useFns();

	const [inputForm, setInputForm] = useState({
		innerPhoneNumber: "",
		innerEmail: "",
		innerFirstName: "",
		innerLastName: "",
		innerDob: "",
		innerAgree: false
	});

	const state = useReducerState();

	//console.log(inputForm);

	useEffect(() => {
		setUserInfo(
			inputForm.innerEmail,
			inputForm.innerFirstName,
			inputForm.innerLastName,
			inputForm.innerPhoneNumber,
			inputForm.innerDob
		);
	}, [inputForm]);

	// console.log(doctorID, appointTime); // good
	// console.log(
	// 	selectedDoctorId,
	// 	selectedTime,
	// 	userPhoneNumber,
	// 	userEmail,
	// 	userFirstName,
	// 	userLastName,
	// 	userDob,
	// 	userAgree
	// ); // good

	// if all iNputForm is not null, and innerAgree is true, go to the next page.
	if (
		selectedDoctorId !== "" &&
		selectedTime !== "" &&
		userPhoneNumber !== "" &&
		userEmail !== "" &&
		userFirstName !== "" &&
		userLastName !== "" &&
		userDob !== "" &&
		userAgree !== ""
	) {
		props.history.push("/confirm");
	}

	return (
		<div>
			<Container>
				<SHeader>User Info</SHeader>
				<SNotMainLogo>
					<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
				</SNotMainLogo>

				<BasicInfoForm onSubmit={setInputForm} />
			</Container>
		</div>
	);
}
