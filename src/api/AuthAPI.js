import axios from "axios";
// import useAuth from "../hooks/Auth";
import config from "../config/config.js"
// Login API
export const Login = async (data) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/login`,
		data,
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const EditAccount = async (data, accessToken) => {
	const res = await axios.patch(
		`${config.BackendURL}/auth/account/`,
		{ ...data, token: accessToken },
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const DeleteAccount = async (password, accessToken) => {
	const res = await axios.delete(
		`${config.BackendURL}/auth/account/`,
		{
			data: { password: password, token: accessToken },
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};

// Automatic login using refreshToken
export const AutoLogin = async () => {
	const res = await axios.post(
		`${config.BackendURL}/auth/login/auto`,
		{},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};

// Regsiter API
export const Register = async (data) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/register`,
		data,
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);

	return res.data;
};

// Refresh the Access token
export const RefreshToken = async () => {
	const res = await axios.post(
		`${config.BackendURL}/auth/refresh`,
		{},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};

// Logout API

export const Logout = async (accessToken, currentSession) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/logout`,
		{
			token: accessToken,
			sessionID: currentSession,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const LogoutFromSpecificDevice = async (deviceID, accessToken) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/logout/specific`,
		{
			deviceID: deviceID,
			token: accessToken,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const LogoutAll = async (accessToken) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/logout/all`,
		{
			token: accessToken,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};

// GetData

export const GetDataNow = async (accessToken) => {
	const res = await axios.get(
		`${config.BackendURL}/auth/user`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
