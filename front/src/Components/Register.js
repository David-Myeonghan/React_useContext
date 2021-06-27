import React, { useEffect } from "react";
import styled from "styled-components";
import { RegisterForm, storage } from "./components.js";
import {
	register,
	registerSuccess,
	registerFailure,
	loginSuccess
} from "../actions/authentication.js";
import { localRegister } from "./api.js";
import { useReducerState, useFns } from "./UserContext.js";
// Image
import WeKoLogo from "../images/Main/WeKoAppt.png";
// Bootstrap
import Container from "react-bootstrap/Container";

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

function Register(props) {
	const { setReducerState } = useFns();
	const state = useReducerState();
	const handleRegister = async ({
		innerPhoneNumber,
		innerEmail,
		innerPassword,
		innerRePassword,
		innerFirstName,
		innerLastName,
		innerDob,
		innerAgree
	}) => {
		var loggedInfo = null;
		var userEmail = null;
		var userFirstName = null;

		try {
			setReducerState(register());
			loggedInfo = await localRegister(
				innerPhoneNumber,
				innerEmail,
				innerPassword,
				innerFirstName,
				innerLastName,
				innerDob,
				innerAgree
			);
			//console.log(loggedInfo);
			loggedInfo = await loggedInfo.json(); // needed for fetch
			userEmail = loggedInfo.email;
			userFirstName = loggedInfo.firstName;
			//console.log(loggedInfo, userEmail, userFirstName);
			storage.set("loggedInfo", loggedInfo);

			setReducerState(registerSuccess());
			setReducerState(loginSuccess(userEmail, userFirstName));

			//console.log(loggedInfo.data);
			//console.log(storage.get("loggedInfo"));
			// console.log(state); // becoming 'init' is that's the way it is?
			props.history.push("/");
		} catch (e) {
			if (e.response.status === 409) {
				setReducerState(registerFailure(e.status));
				const { message } = e.response.data;
				//console.log(e.response);
				//console.log(message);
				return message;
			}
			return console.log("Unknown Error");
		}
	};

	return (
		<Container>
			<SHeader>Search Results</SHeader>
			<SNotMainLogo>
				<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
			</SNotMainLogo>
			<RegisterForm onRegister={handleRegister} />
			<br />
			<br />
		</Container>
	);
}

export default Register;
