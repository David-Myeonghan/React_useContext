import React from "react";
import styled from "styled-components";

import { storage, LoginForm } from "./components.js";
import Button from "react-bootstrap/Button";
import { useFns, useReducerState, useUser } from "./UserContext.js";
import {
	login,
	loginSuccess,
	loginFailure
} from "../actions/authentication.js";
import { localLogin, logoutApi } from "./api.js";
import WeKoLogo from "../images/Main/WeKoAppt.png";
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

export function Login(props) {
	const { setReducerState, setUserInfo } = useFns();
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
		userDob
	} = useUser();

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

	const handleLogin = async (email, password) => {
		var loggedInfo = null;
		var userEmail = null;
		var userFirstName = null;
		var userLastName = null;
		var userPhone = null;
		var userDob = null;
		//console.log(email, password);

		try {
			setReducerState(login());
			loggedInfo = await localLogin({ email, password });

			if (loggedInfo.status === 409) {
				throw new Error("Password not matched or Not Registered");
			}

			//console.log(loggedInfo);

			loggedInfo = await loggedInfo.json();

			userEmail = loggedInfo.email;
			userFirstName = loggedInfo.firstName;
			userLastName = loggedInfo.lastName;
			userPhone = loggedInfo.phone;
			userDob = loggedInfo.dob;

			// console.log(
			// 	loggedInfo,
			// 	userEmail,
			// 	userFirstName,
			// 	userLastName,
			// 	userPhone,
			// 	userDob
			// );
			storage.set("loggedInfo", {
				userEmail,
				userFirstName,
				userLastName,
				userPhone,
				userDob
			});

			setReducerState(
				loginSuccess(userEmail, userFirstName, userLastName, userPhone, userDob)
			); // after setReducerState, reducerState becomes init but, in footer, becomes good back.
			setUserInfo(userEmail, userFirstName, userLastName, userPhone, userDob);
			//console.log(storage.get("loggedInfo"));
		} catch (e) {
			if (loggedInfo.status === 409) {
				setReducerState(loginFailure());
				var message = e.message;
				alert(message);
				return (window.location.href = "/login");
			}
			setReducerState(loginFailure());
			return console.log("Unknown Error");
		}
	};

	const handleLogout = async () => {
		var logout = null;

		try {
			logout = await logoutApi();
			setReducerState(logout());
			//console.log(logout);
		} catch (e) {
			//console.log(e.response);
			//console.log(logout);
		}
		storage.remove("loggedInfo");
		// This will refresh the page and initialise&remove all the info that was stored before.
		window.location.href = "/";
	};

	// console.log(state);

	return (
		<Container>
			<SHeader>Login</SHeader>
			<SNotMainLogo>
				<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
			</SNotMainLogo>
			<br />
			{state.status.isLoggedIn === true && state.status.userEmail ? (
				<div>
					<h4>Welcome {state.status.userFirstName}!</h4>
					<br />
					<Button onClick={handleLogout} variant="primary" type="submit" block>
						Logout
					</Button>
				</div>
			) : (
				<LoginForm onLogin={handleLogin} />
			)}
		</Container>
	);
}

export default Login;
