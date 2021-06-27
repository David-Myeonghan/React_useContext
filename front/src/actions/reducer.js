import React, { useReducer } from "react";

export const initialState = {
	login: {
		status: "INIT"
	},
	register: {
		status: "INIT",
		error: -1
	},
	status: {
		valid: false,
		reserved: false,
		isLoggedIn: false,
		userFirstName: "",
		userLastName: "",
		userEmail: "",
		userPhone: "",
		userDob: ""
	}
	// , error: { // if need
	// 	code: -1
	// }
};

// useReducer will call the reducer function with the current state and the action.
// dispatch function will call the reducer and sends an action to the reducer.
// and replaces the state
export function authenticationReducer(state = initialState, action) {
	switch (action.type) {
		case "AUTH_REGISTER":
			return {
				...state,
				register: {
					status: "WAITING",
					error: -1 // normal behaviour.
				}
			};
		case "AUTH_REGISTER_SUCCESS":
			return {
				...state,
				register: {
					...state.register,
					status: "SUCCESS"
				}
			};
		case "AUTH_REGISTER_FAILURE":
			return {
				...state,
				register: {
					status: "FAILURE",
					error: action.error
				}
			};
		case "AUTH_LOGIN":
			return {
				...state,
				login: {
					status: "WAITING"
				}
			};
		case "AUTH_LOGIN_SUCCESS":
			return {
				...state,
				login: {
					status: "SUCCESS"
				},
				status: {
					...state.status,
					isLoggedIn: true,
					userEmail: action.userEmail,
					userFirstName: action.userFirstName,
					userLastName: action.userLastName,
					userPhone: action.userPhone,
					userDob: action.userDob
				}
			};
		case "AUTH_LOGIN_FAILURE":
			return {
				...state,
				login: {
					status: "FAILURE"
				}
			};
		case "AUTH_GET_STATUS":
			return {
				...state,
				status: {
					...state.status,
					isLoggedIn: true
				}
			};
		case "AUTH_GET_STATUS_SUCCESS":
			return {
				...state,
				status: {
					...state.status,
					valid: true
				}
			};

		case "AUTH_GET_STATUS_FAILURE":
			return {
				...state,
				status: {
					...state.status,
					valid: false,
					isLoggedIn: false
				}
			};

		case "AUTH_LOGOUT":
			return {
				...state,
				status: {
					isLoggedIn: false,
					currentUserFirstName: ""
				}
			};
		case "AUTH_RESERVED_SUCCESS":
			return {
				...state,
				status: {
					...state.status,
					reserved: true
				}
			};
		default:
			return console.log(action);
	}
}
