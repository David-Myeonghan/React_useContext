// export const AUTH_REGISTER = "AUTH_REGISTER";
// export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
// export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";
// export const AUTH_LOGIN = "AUTH_LOGIN";
// export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
// export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export function register() {
	return {
		type: "AUTH_REGISTER"
	};
}

export function registerSuccess() {
	return {
		type: "AUTH_REGISTER_SUCCESS"
	};
}

export function registerFailure(error) {
	return {
		type: "AUTH_REGISTER_FAILURE",
		error
	};
}

export function login() {
	return {
		type: "AUTH_LOGIN"
	};
}

export function loginSuccess(
	userEmail,
	userFirstName,
	userLastName,
	userPhone,
	userDob
) {
	return {
		type: "AUTH_LOGIN_SUCCESS",
		userEmail,
		userFirstName,
		userLastName,
		userPhone,
		userDob
	};
}

export function loginFailure() {
	return {
		type: "AUTH_LOGIN_FAILURE"
	};
}

export function getStatus() {
	return {
		type: "AUTH_GET_STATUS"
	};
}

export function getStatusSuccess() {
	return {
		type: "AUTH_GET_STATUS_SUCCESS"
	};
}

export function getStatusFailure() {
	return {
		type: "AUTH_GET_STATUS_FAILURE"
	};
}

export function logout() {
	return {
		type: "AUTH_LOTOUT"
	};
}

export function reservedSuccess() {
	return {
		type: "AUTH_RESERVED_SUCCESS"
	};
}
