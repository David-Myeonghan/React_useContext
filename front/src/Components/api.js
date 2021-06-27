import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useFns } from "./UserContext";
import { registerSuccess, registerFailure } from "../actions/authentication";

function getAllDoctors() {
	const url = "http://localhost:8083/doctor";

	return fetch(url)
		.then(response => response.json())

		.catch(error => {
			console.log("Can't access " + url + " response", error.message);
		});
}

export function useAllDoctors() {
	const [loading, setLoading] = useState(true);
	const [doctors, setDoctor] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getAllDoctors()
			.then(doctors => {
				//console.log(doctors); // good
				setDoctor(doctors); // !!! Response from fetch should be same with this state name
				//console.log(doctors); // doctors(state) = doctor(from fetch response)
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return { loading, doctors, error };
}

function getSearchDoctorByName(name) {
	const baseURL = "http://localhost:8083/search/";
	var query = `${name}`;
	var url = "";

	url = baseURL + query;

	return fetch(encodeURI(url)).then(response => {
		if (response.ok) {
			return response.json();
		}
		if (response.status === 404) {
			throw new Error("No result");
		}
		throw new Error("Unknown Error");
	});
}

export function useSearchDoctorByName(name) {
	const [loading, setLoading] = useState(true);
	const [doctors, setDoctors] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		setDoctors([]); // without these, previous serch result will still be in doctors and error state.
		getSearchDoctorByName(name)
			.then(doctors => {
				setDoctors(doctors);
				//console.log(doctors); // good
				setLoading(false);
			})
			.catch(e => {
				// catch is here instead of get function.
				setError(e.message);
				console.log(e.message);
				setLoading(false);
			});
	}, [name]);

	return { loading, doctors, error };
}

function getSearchDoctorByID(id) {
	const baseURL = "http://localhost:8083/doctor/";
	var query = `${id}`;
	var url = "";

	url = baseURL + query;
	// console.log(url); // good

	return fetch(encodeURI(url)).then(function(response) {
		if (response.ok) {
			return response.json();
		}
		//  else if (JSON.stringify(response) === "{}") {
		//     return response.json();
		// }
		throw new Error("Network response was not ok"); // Todo: Handle when json is empty/null.
	});
}

export function useSearchDoctorByID(id) {
	const [loading, setLoading] = useState(true);
	const [doctor, setDoctors] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null); // rigth handling?
		getSearchDoctorByID(id)
			.then(doctors => {
				setDoctors(doctors);
				//console.log(doctors); // good
				setLoading(false);
			})
			.catch(e => {
				setError(e);
				setLoading(false);
			});
	}, [id]);

	return { loading, doctor, error };
}

function postAppointment(
	doctorID,
	time,
	firstName,
	lastName,
	phone,
	dob,
	email,
	forWhom
) {
	const baseURL = "http://localhost:8083/api/appointmentCreate";

	return fetch(baseURL, {
		method: "POST",
		body: `doctorID=${encodeURI(doctorID)}&appointTime=${encodeURI(
			time
		)}&patientFirstName=${encodeURI(firstName)}&patientLastName=${encodeURI(
			lastName
		)}&phoneNumber=${encodeURI(phone)}&patientDob=${encodeURI(
			dob
		)}&patientEmail=${encodeURI(email)}&forWhom=${forWhom}`,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	})
		.then(function(response) {
			if (response.ok) {
				//console.log(response);
				return response.json();
			}
			throw new Error("Network response was not ok");
		})
		.catch(function(error) {
			console.log(
				"There has been a problem with your fetch operation: ",
				error.message
			);
		});
}

export function useMakeAppointment(
	doctorID,
	time,
	firstName,
	lastName,
	phone,
	dob,
	email,
	forWhom
) {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null);
		setResult([]);

		try {
			if (
				!doctorID ||
				!time ||
				!firstName ||
				!lastName ||
				!phone ||
				!dob ||
				!email
			) {
				throw new Error("No Selected User Info");
			}
			postAppointment(
				doctorID,
				time,
				firstName,
				lastName,
				phone,
				dob,
				email,
				forWhom
			).then(result => {
				setResult(result);
				//console.log(result);
				setLoading(false);
			});
		} catch (e) {
			setError(e);
			setLoading(false);
		}
	}, [doctorID, time, firstName, lastName, phone, dob, email, forWhom]);

	return { loading, result, error };
}

export const localRegister = (
	phone,
	email,
	password,
	firstName,
	lastName,
	dob,
	agree
) =>
	fetch("http://localhost:8083/account/register/local", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		credentials: "include",
		body: `phone=${encodeURI(phone)}&email=${encodeURI(
			email
		)}&password=${encodeURI(password)}&firstName=${encodeURI(
			firstName
		)}&lastName=${encodeURI(lastName)}&dob=${encodeURI(dob)}&agree=${encodeURI(
			agree
		)}`
	});

// axios doesn't fetch cookies
export const localLogin = ({ email, password }) =>
	fetch("http://localhost:8083/account/login/local", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		credentials: "include",
		body: `email=${encodeURI(email)}&password=${encodeURI(password)}`
	});

export const checkStatus = () =>
	axios.get("http://localhost:8083/account/check", { withCredentials: true });

export const logoutApi = () =>
	axios.post("http://localhost:8083/account/logout", { withCredentials: true });

function getUserAppointment(userEmail) {
	const baseURL = "http://localhost:8083/api/appointments";

	return fetch(baseURL, {
		method: "POST",
		body: `email=${encodeURI(userEmail)}`,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	})
		.then(function(response) {
			if (response.ok) {
				//console.log(response);
				return response.json();
			}
			throw new Error("Network response was not ok, Unkown Error");
		})
		.catch(function(error) {
			console.log("Problem with your fetch operation: ", error.message);
		});
}

export function useUserAppointment(userEmail) {
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null);
		setAppointments([]);
		getUserAppointment(userEmail)
			.then(appointments => {
				setAppointments(appointments);
				setLoading(false);
			})
			.catch(e => {
				setError(e);
				setLoading(false);
			});
	}, [userEmail]);

	return { loading, appointments, error };
}

function getOneAppointment(appointmentID) {
	const baseURL = "http://localhost:8083/api/appointmentone";

	return fetch(baseURL, {
		method: "POST",
		body: `appointmentID=${encodeURI(appointmentID)}`,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	})
		.then(function(response) {
			if (response.ok) {
				//console.log(response);
				return response.json();
			}
			throw new Error("Network response was not ok, Unkown Error");
		})
		.catch(function(error) {
			console.log("Problem with your fetch operation: ", error.message);
		});
}

export function useOneAppointment(appointmentID) {
	const [loading, setLoading] = useState(true);
	const [appointment, setAppointment] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null);
		setAppointment([]);
		getOneAppointment(appointmentID)
			.then(appointment => {
				setAppointment(appointment);
				setLoading(false);
			})
			.catch(e => {
				setError(e);
				setLoading(false);
			});
	}, [appointmentID]);

	return { loading, appointment, error };
}

export function deleteAppointment(appointmentID) {
	const baseURL = "http://localhost:8083/api/appointmentDelete";

	return fetch(baseURL, {
		method: "POST",
		body: `appointmentID=${encodeURI(appointmentID)}`,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	})
		.then(response => {
			if (response.ok) {
				// console.log(response); //good
				return response.json();
			}
			throw new Error("Network response was not ok");
		})
		.catch(err => {
			console.log("Problem with your fetch operation: ", err.message);
		});
}
