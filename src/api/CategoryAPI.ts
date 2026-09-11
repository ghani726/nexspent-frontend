import axios from "axios";
import config from "@/config/config";
import type { ICategory } from "@/types/category";

// Interfaces
interface Create extends ICategory {token: string}
interface Edit extends Create {categoryID: string}
interface Delete {categoryID: string, token: string}
interface Merge extends Delete {mergeCategoryID: string}

// Add Account API
export const CreateCategory = async ({
	name,
	bgColor,
	categoryType,
	icon,
	token,
}: Create) => {
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
}: Edit) => {
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
export const DeleteCategory = async ({ categoryID, token }: Delete) => {
	const res = await axios.delete(
		`${config.BackendURL}/user/category/`,
		{
			data: {
				categoryID: categoryID,
				token: token,
			},
		}
	);
	return res.data;
};
export const MergeCategory = async ({ categoryID, mergeCategoryID, token }: Merge) => {
	const res = await axios.post(
		`${config.BackendURL}/user/category/merge`,
		{
			categoryID: categoryID,
			mergeCategoryID: mergeCategoryID,
			token: token,
		},
		{
			withCredentials: true, // <--- THIS IS REQUIRED
		},
	);
	return res.data;
};
