import axios from "axios";

import config from "../config/config.js";

// Add Account API
export const CreateCategory = async ({
	name,
	bgColor,
	categoryType,
	icon,
	token,
}) => {
	const res = await axios.post(
		`${config.BackendURL}/user/category/`,
		{
			name: name,
			bgColor: bgColor,
			categoryType: categoryType,
			icon: icon,
			token: token,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const UpdateCategory = async ({
	name,
	bgColor,
	categoryType,
	icon,
	categoryID,
	token,
}) => {
	const res = await axios.patch(
		`${config.BackendURL}/user/category/`,
		{
			name: name,
			bgColor: bgColor,
			categoryType: categoryType,
			icon: icon,
			categoryID: categoryID,
			token: token,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
export const DeleteCategory = async ({ categoryID, token }) => {
	const res = await axios.delete(
		`${config.BackendURL}/user/category/`,
		{
			data: {
				categoryID: categoryID,
				token: token,
			},
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
