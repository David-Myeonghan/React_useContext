import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";

// Images
import searchSVG from "../images/Main/search.svg";
//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SForm = styled.form`
    
    width: 100%
    justify-content: center;
`;

const SInput = styled.input`
    width: 100%
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background: url(${props => props.imgUrl});
    background-position: 7px 6px; 
    background-size: 32px 32px;
    background-repeat: no-repeat;
    padding: 10px 20px 10px 40px;
    //-webkit-transition: width 0.4s ease-in-out;
    //transition: width 0.4s ease-in-out;

    // input[type=text]:focus {
    //   width:100%;
    // }
`;

export function SearchBar(props) {
	const [innerSearch, setInnerSearch] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		//console.log(innerSearch);
		props.onSubmit(innerSearch);
	};

	return (
		<div>
			<SForm onSubmit={handleSubmit}>
				<SInput
					aria-labelledby="search-button"
					name="search"
					id="search"
					type="search"
					value={innerSearch}
					placeholder="Search Doctor Name"
					imgUrl={searchSVG}
					onChange={e => setInnerSearch(e.target.value)}
				/>
			</SForm>
		</div>
	);
}

export function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}

export function BasicInfoForm(props) {
	const [innerInputForm, setInnerInputForm] = useState({
		innerPhoneNumber: "",
		innerEmail: "",
		innerFirstName: "",
		innerLastName: "",
		innerDob: "",
		innerAgree: false
	});
	const [validated, setValidated] = useState(false);
	// const [innerValidated, setInnerValidated] = useState(false);
	// validated is used for validation in the Form validated={validated}.
	// So, we need another boolean variable to link to the next page.

	const handleSubmit = e => {
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else if (form.checkValidity() === true) {
			e.preventDefault();
			e.stopPropagation();
			props.onSubmit(innerInputForm);

			setValidated(true);
			//console.log(innerInputForm);
		}
		setValidated(true);
		// console.log(innerInputForm);
	};

	const updateField = e => {
		setInnerInputForm({
			...innerInputForm,
			[e.target.name]: e.target.value
		});
	};

	const updateCheck = e => {
		innerInputForm.innerAgree === true
			? setInnerInputForm({
					...innerInputForm,
					[e.target.name]: false
			  })
			: setInnerInputForm({
					...innerInputForm,
					[e.target.name]: true
			  });
	};

	return (
		<div className="BasicInfo">
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicPhoneNumber">
					<Form.Control
						required
						type="number"
						name="innerPhoneNumber"
						placeholder="Phone Number"
						value={innerInputForm.innerPhoneNumber}
						onChange={updateField}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Control
						required
						type="email"
						name="innerEmail"
						placeholder="Email Address"
						value={innerInputForm.innerEmail}
						onChange={updateField}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicFirstName">
					<Form.Control
						required
						type="text"
						name="innerFirstName"
						placeholder="First Name"
						value={innerInputForm.innerFirstName}
						onChange={updateField}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicLastName">
					<Form.Control
						required
						type="text"
						name="innerLastName"
						placeholder="Last Name"
						value={innerInputForm.innerLastName}
						onChange={updateField}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicDOB">
					<Form.Control
						required
						type="date"
						name="innerDob"
						placeholder="DOB"
						value={innerInputForm.innerDob}
						onChange={updateField}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicChecbox">
					<Form.Check
						required
						type="checkbox"
						name="innerAgree"
						label="Agree to Terms and Conditions"
						value={innerInputForm.innerAgree}
						onChange={updateCheck}
						feedback="You must agree before submitting."
					/>
				</Form.Group>

				<p>
					or <Link to="/login">Sign in</Link> to Save time
				</p>

				<Button variant="primary" type="submit" className="BookButton" block>
					Book Appointment
				</Button>
			</Form>
		</div>
	);
}

// /// handle multiple inputs. way 1. using multiple callback, cause onSubmit can take only one callback.
// export function LoginForm(props) {
//     const [innerUserID, setInnerUserID] = useState("");
//     const [innerUserPassword, setInnerUserPassword] = useState("");

//     return (
//         <div>
//             <form
//                 onSubmit={e => {
//                     e.preventDefault();
//                     console.log(innerUserID, innerUserPassword);
//                     props.onCreate(innerUserID); // Is this a right way to pass the multi values to parent component? using different callback?
//                     props.onSubmit(innerUserPassword);
//                 }}
//             >
//                 <label htmlFor="">ID: </label>
//                 <input id="innerUserID" name="innerUserID" type="id" value={innerUserID} onChange={event => {setInnerUserID(event.target.value);}} />
//                 <br />
//                 <label htmlFor="Password">Password: </label>
//                 <input id="innerUserPassword" name="innerUserPassword" type="password" value={innerUserPassword} onChange={event => {setInnerUserPassword(event.target.value);}} />
//                 <br />
//                 <button id="login" type="submit">
//                     Login
//                 </button>
//                 <br />
//                 <Link to="/register">Sign Up</Link> if you don't have an account
//             </form>
//         </div>
//     );
// }

/// handle multiple inputs. way 2. using array destructuring. simpler and no repeat.
export function LoginForm(props) {
	const [innerLoginForm, setInnerLoginForm] = useState({
		innerEmail: "",
		innerPassword: ""
	});
	const [validated, setValidated] = useState(false);

	const handleSubmit = e => {
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else if (form.checkValidity() === true) {
			e.preventDefault();
			console.log(innerLoginForm.innerEmail, innerLoginForm.innerPassword);
			props.onLogin(innerLoginForm.innerEmail, innerLoginForm.innerPassword);
		}
		setValidated(true);
		//console.log(innerLoginForm);
	};

	const updateField = e => {
		setInnerLoginForm({
			...innerLoginForm,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicEmail">
				<Form.Control
					required
					type="email"
					name="innerEmail"
					placeholder="Email Address"
					value={innerLoginForm.innerEmail}
					onChange={updateField}
				/>
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Control
					required
					type="password"
					name="innerPassword"
					placeholder="Password"
					value={innerLoginForm.innerPassword}
					onChange={updateField}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" className="LoginButton" block>
				Login
			</Button>
			<br />
			<Link to="/register">Sign Up</Link> if you don't have an account
		</Form>
	);
}

export function RegisterForm(props) {
	const [innerRegisterForm, setInnerRegisterForm] = useState({
		innerPhoneNumber: "",
		innerEmail: "",
		innerPassword: "",
		innerRePassword: "",
		innerFirstName: "",
		innerLastName: "",
		innerDob: "",
		innerAgree: false
	});
	const [validated, setValidated] = useState(false);

	const handleSubmit = e => {
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else if (form.checkValidity() === true) {
			if (
				innerRegisterForm.innerPassword !== innerRegisterForm.innerRePassword
			) {
				e.preventDefault();
				alert("Password not matched!");
				//console.log(innerRegisterForm);
			} else if (
				innerRegisterForm.innerPassword === innerRegisterForm.innerRePassword
			) {
				e.preventDefault();
				//console.log(innerRegisterForm);
				//props.onSubmit(form);
				props.onRegister(innerRegisterForm);
			}
			setValidated(true);
			//console.log(innerRegisterForm);
		}
	};

	const updateField = e => {
		setInnerRegisterForm({
			...innerRegisterForm,
			[e.target.name]: e.target.value
		});
	};

	const updateCheck = e => {
		innerRegisterForm.innerAgree === true
			? setInnerRegisterForm({
					...innerRegisterForm,
					[e.target.name]: false
			  })
			: setInnerRegisterForm({
					...innerRegisterForm,
					[e.target.name]: true
			  });
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicPhoneNumber">
				<Form.Control
					required
					type="number"
					name="innerPhoneNumber"
					placeholder="Phone Number"
					value={innerRegisterForm.innerPhoneNumber}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicEmail">
				<Form.Control
					required
					type="email"
					name="innerEmail"
					placeholder="Email Address"
					value={innerRegisterForm.innerEmail}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Control
					required
					type="password"
					name="innerPassword"
					placeholder="Password"
					value={innerRegisterForm.innerPassword}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Control
					required
					type="password"
					name="innerRePassword"
					placeholder="Type password again"
					value={innerRegisterForm.innerRePassword}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicFirstName">
				<Form.Control
					required
					type="text"
					name="innerFirstName"
					placeholder="First Name"
					value={innerRegisterForm.innerFirstName}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicLastName">
				<Form.Control
					required
					type="text"
					name="innerLastName"
					placeholder="Last Name"
					value={innerRegisterForm.innerLastName}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicDOB">
				<Form.Control
					required
					type="date"
					name="innerDob"
					placeholder="DOB"
					value={innerRegisterForm.innerDob}
					onChange={updateField}
				/>
			</Form.Group>

			<Form.Group controlId="formBasicChecbox">
				<Form.Check
					required
					type="checkbox"
					name="innerAgree"
					label="Agree to Terms and Conditions"
					value={innerRegisterForm.innerAgree}
					onChange={updateCheck}
					feedback="You must agree before submitting."
				/>
			</Form.Group>
			<Button variant="primary" type="submit" className="RegisterButton" block>
				Sign up
			</Button>
			<br />
			<Link to="/login">Sign in</Link>
		</Form>
	);
}

// Example usage:
// const [name, setName] = useLocalStorage('name', 'Bob');
export function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that
	// persists the new value to localStorage
	const setValue = value => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to localStorage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}

// localStorage helper
// example:
// storage.set('foo', 'bar');
// storage.set('foo', { foo: 'bar'});
// var foo = storage.get('foo');
// storage.remove('foo');
export const storage = {
	set: (key, object) => {
		if (!localStorage) return;
		// if object, automatically Json.stringify, if string, put it as it is.
		localStorage[key] =
			typeof object === "string" ? object : JSON.stringify(object);
	},
	get: key => {
		if (!localStorage) return null;

		if (!localStorage[key]) {
			return null;
		}

		try {
			// if object, parse string into object
			const parsed = JSON.parse(localStorage[key]);
			return parsed;
		} catch (error) {
			// if not string?
			console.log(error);
			return localStorage[key];
		}
	},
	remove: key => {
		if (!localStorage) return null;

		if (localStorage[key]) {
			localStorage.removeItem(key);
		}
	}
};
