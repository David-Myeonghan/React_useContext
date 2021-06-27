import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { useReducerState, useFns, useUser } from "./UserContext.js";
import {
	getStatusSuccess,
	loginSuccess,
	loginFailure
} from "../actions/authentication.js";
import { storage } from "./components.js";
import { checkStatus } from "./api.js";
// Images
import House from "../images/Footer/house.svg";
import Notification from "../images/Footer/notification.svg";
import Account from "../images/Footer/account.svg";

import Image from "react-bootstrap/Image";

const SFooter = styled.footer`
	position: fixed;
	bottom: 1px;
	width: 100%;
	height: 65px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: solid 2px gray;
	background-color: lightgray;
	padding-top: 3px;
	padding-left: 25px;
	padding-right: 20px;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	padding: 5px;
	color: black;
	box-shadow: 2px 2px lightgray;
	text-align: center;
	grid-gap: 50px;
`;

const SLink = styled(Link)`
	height: 60px;
	display: flex;
`;

const GridHome = styled.div`
	grid-column-start: 1;
	grid-column-end: 2;
`;

const GridHomeImage = styled(Image)`
	height: 32px;
`;
const GridHomeWord = styled.div`
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`;

const GridNotify = styled.div`
	grid-column-start: 2;
	grid-column-end: 3;
`;

const GridNotifyImage = styled(Image)`
	height: 32px;
`;

const GridNotifyWord = styled.div`
	font-size: 16px;
	font-weight: bold;
`;

const GridAccount = styled.div`
	grid-column-start: 3;
	grid-column-end: 4;
`;
const GridAccountImage = styled(Image)`
	height: 32px;
`;

const GridAccountWord = styled.div`
	font-size: 16px;
	font-weight: bold;
`;

export function Footer(props) {
	const user = useUser();

	const { setReducerState, setUserInfo } = useFns();
	const state = useReducerState();

	// put user info into the user and state in the usercontext
	const initialiseUserInfo = async () => {
		const loggedInfo = storage.get("loggedInfo");
		var checkResponse = null;
		var userEmail = null;
		var userFirstName = null;
		var userLastName = null;
		var userPhone = null;
		var userDob = null;

		if (!loggedInfo) {
			console.log("No loggedInfo!");
			return;
		}
		//console.log(loggedInfo);
		try {
			//console.log(state);
			checkResponse = await checkStatus();
			userEmail = checkResponse.data.email;
			userFirstName = checkResponse.data.firstName;
			userLastName = checkResponse.data.lastName;
			userPhone = checkResponse.data.phone;
			userDob = checkResponse.data.dob;
			//console.log(checkResponse);

			setReducerState(
				loginSuccess(userEmail, userFirstName, userLastName, userPhone, userDob)
			);
			setReducerState(getStatusSuccess()); // modify state: status: valid: true
			setUserInfo(userEmail, userFirstName, userLastName, userPhone, userDob); //need to here as well.!!!!!!!!!!!!!!!!!!!!!
			//console.log(state);
			//console.log(user);
		} catch (e) {
			setReducerState(loginFailure());
			storage.remove("loggedInfo");
			window.location.href = "/";
			//console.log(e);
		}
	};

	useEffect(() => {
		initialiseUserInfo();
		//console.log(state);
	}, [state.login.status]);

	//console.log(state);
	// console.log(user);
	// console.log(props);

	return (
		<SFooter>
			<GridContainer>
				<SLink to="/">
					<GridHome>
						<GridHomeImage src={House}></GridHomeImage>
						<GridHomeWord>Home</GridHomeWord>
					</GridHome>
				</SLink>

				<SLink to="/notification">
					<GridNotify>
						<GridNotifyImage src={Notification}></GridNotifyImage>
						<GridNotifyWord>Notification</GridNotifyWord>
					</GridNotify>
				</SLink>

				<SLink to="/login">
					<GridAccount>
						<GridAccountImage src={Account}></GridAccountImage>
						<GridAccountWord>Account</GridAccountWord>
					</GridAccount>
				</SLink>
			</GridContainer>
		</SFooter>
	);
}

export default withRouter(Footer); // withRouter is used to know the pathname of the location from props.
