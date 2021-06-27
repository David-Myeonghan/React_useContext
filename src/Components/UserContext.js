import React, { useState, useContext, useReducer } from "react";
import { authenticationReducer, initialState } from "../actions/reducer";

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
	// if the values of user is null(""), this will return anything.

	// this is saving user information.
	const [user, setUser] = useState({
		selectedDoctorId: "",
		selectedDoctorFirstName: "",
		selectedDoctorLastName: "",
		selectedDoctorAddress: "",
		selectedDoctorPhone: "",
		selectedTime: "",

		userPhoneNumber: "",
		userEmail: "",
		userFirstName: "",
		userLastName: "",
		userDob: "",
		forMyself: false
		// userAgree: false
	});

	// This is storing user's login info. If not login, this will not be used. Refer to reducer.js.
	const [state, dispatch] = useReducer(authenticationReducer, initialState);

	// set user like in infoform update. // used in useReducer
	// const logUserIn = () => setUser({ ...user, loggedIn: true });
	// const logUserOut = () => setUser({ ...user, loggedIn: false });

	const setDoctorInfo = (id, firstName, lastName, address, phone) =>
		setUser({
			// can be saparated into: [user, setUser], and [selectedDoctor, setSelectedDoctor]
			...user,
			selectedDoctorId: id,
			selectedDoctorFirstName: firstName,
			selectedDoctorLastName: lastName,
			selectedDoctorAddress: address,
			selectedDoctorPhone: phone
		});
	const setDoctorTime = time => setUser({ ...user, selectedTime: time });
	const setDoctorName = name => setUser({ ...user, selectedDoctorName: name });

	const setReducerState = state => dispatch(state);

	const setUserInfo = (
		userEmail,
		userFirstName,
		userLastName,
		userPhone,
		userDob
	) => {
		setUser({
			...user,
			userPhoneNumber: userPhone,
			userEmail: userEmail,
			userFirstName: userFirstName,
			userLastName: userLastName,
			userDob: userDob
			// userAgree: innerAgree
		});
	};

	const setForWhom = whom => {
		setUser({
			...user,
			forMyself: whom
		});
	};
	return (
		<UserContext.Provider
			/* make an object called fn and put functions in the object. */
			value={{
				user,
				state,
				fn: {
					// logUserIn,
					// logUserOut,
					setDoctorInfo,
					setDoctorTime,
					setUserInfo,
					setReducerState,
					setDoctorName,
					setForWhom
				}
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

// Use to see the status of a user.
export const useUser = () => {
	const { user } = useContext(UserContext);
	//console.log(user); // good
	return user;
};

// Use to use functions in the user context.
export const useFns = () => {
	const { fn } = useContext(UserContext);
	return fn;
};

export const useReducerState = () => {
	const { state } = useContext(UserContext);

	return state;
};

export default UserContextProvider;
