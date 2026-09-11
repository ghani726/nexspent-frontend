import axios from "axios";
// import useAuth from "../hooks/Auth";
import config from "@/config/config"
// Login API
export const Login = async (data: object) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/login`,
		data,
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const EditAccount = async (data: object, accessToken: string) => {
	const res = await axios.patch(
		`${config.BackendURL}/auth/account/`,
		{ ...data, token: accessToken },
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const DeleteAccount = async (password: string, accessToken: string) => {
	const res = await axios.delete(
		`${config.BackendURL}/auth/account/`,
		{
			data: { password: password, token: accessToken },
		},
	);
	return res.data;
};

// Regsiter API
export const Register = async (data: object) => {
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

export const Logout = async (accessToken: string, currentSession: string) => {
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
export const LogoutFromSpecificDevice = async (deviceID: string, accessToken: string) => {
	const res = await axios.post(
		`${config.BackendURL}/auth/logout/specific`,
		{
			sessionID: deviceID,
			token: accessToken,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const LogoutAll = async (accessToken: string) => {
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

export const GetDataNow = async (accessToken: string) => {
	const res = await axios.get(
		`${config.BackendURL}/auth/user`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return res.data;
};
