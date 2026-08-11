import { LoaderCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/Auth";

const DeleteModal = ({
	handleCancel,
	text = "category",
	dialogRef,
	DeleteHandler,
	GetData,
	objID,
}) => {
	const { accessToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const UpperCaseText = text[0].toUpperCase() + text.slice(1);

	return (
		<dialog
			onClick={(e) => {
				if (e.target === dialogRef.current) {
					handleCancel();
				}
			}}
			ref={dialogRef}
			id="delete-modal"
			className={`fixed hidden  top-1/2 left-1/2 -translate-1/2 open:flex dark:bg-gray-900 dark:text-white max-h-9/10 overflow-auto ease-in-out duration-300 animate-fade-in flex-col justify-between items-center shadow-[0_0_10px_rgba(0,0,0,0.3)] p-8 rounded-5xl w-9/10 ms:w-md gap-3 bg-white`}
		>
			<div className="flex justify-center items-center p-3 rounded-full aspect-square bg-red-100 dark:bg-red-900/50 dark:text-red-600">
				<TriangleAlert></TriangleAlert>
			</div>
			<h2 className="text-2xl font-bold -mb-1">Delete {UpperCaseText}</h2>
			<p className="text-gray-500 text-center">
				Are you sure you want to delete this {text}? This {text} would
				be permanently deleted from your account and all of your
				devices.
			</p>
			<div className="flex justify-between items-center gap-2">
				<button
					onClick={handleCancel}
					disabled={isLoading}
					className="px-6 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-full bg-app dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 hover:scale-103 disabled:active:scale-100  duration-300 ease-in-out"
				>
					Keep {UpperCaseText}
				</button>
				<button
					disabled={isLoading}
					onClick={() => {
						DeleteHandler({
							objID,
							token: accessToken,
							CancelDelete: handleCancel,
							GetData,
                     setIsLoading 
						});
					}}
					className="px-6 disabled:bg-red-400 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer active:scale-95 py-3 rounded-full bg-red-600 dark:bg-red-700 hover:scale-103 text-white font-bold hover:bg-red-700 duration-300 ease-in-out flex gap-2"
				>
					{isLoading && (
						<LoaderCircle className="animate-spin"></LoaderCircle>
					)}
					Delete {UpperCaseText}
				</button>
			</div>
		</dialog>
	);
};

export default DeleteModal;
