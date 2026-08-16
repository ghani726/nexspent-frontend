import useAuth from "../../../hooks/Auth";

const Details = () => {
	const { user } = useAuth();

	return (
		<>
			<div className="flex animate-fade-in flex-col justify-center items-center w-full bg-white dark:bg-gray-800 p-4 rounded-5xl">
				<h2 className="text-3xl whitespace-break-spaces text-primary wrap-anywhere w-full text-center font-bold">
					{user.fullName}
				</h2>
				<h3 className="w-full text-center text-lg font-medium">
					{user.email}
				</h3>
				<h3 className="w-full text-center text-xl font-semibold text-gray-600">
					@{user.userName}
				</h3>
			</div>
			<div className="flex flex-col justify-center items-center w-full bg-white dark:bg-gray-800 p-4 rounded-4xl gap-4">
				<h3 className="font-bold text-xl w-full text-start text-primary">
					Info:
				</h3>
				{/* <ul className="flex-col flex justify-start items-start w-full">
					<li className="font-medium list-disc list-inside w-full text-start">
						<strong>Total Notes: </strong> {notes.length}
					</li>
					<li className="font-medium list-disc list-inside w-full text-start">
						<strong> Total Requests: </strong> {requests.length}
					</li>
					<li className="font-medium list-disc list-inside w-full text-start">
						<strong> Total Shared Notes: </strong>{" "}
						{sharedNotes.length}
					</li>
					<li className="font-medium list-disc list-inside w-full text-start">
						<strong> Total Deleted Notes: </strong>{" "}
						{deletedNotes.length}
					</li>
				</ul> */}
			</div>
		</>
	);
};

export default Details;
