import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const AddButton = ({ showModal, setShowModal, title, position = "fixed" }: {
	showModal: boolean
	setShowModal: Dispatch<SetStateAction<boolean>>
	title: string
	position?: "fixed" | "absolute"
}) => {
	return (
		<div
			title={title}
			onClick={()=>{
            setShowModal((prev) => !prev)
        }}
			className={`${position === "fixed" ? "fixed bottom-22 md:bottom-6 right-4" : "absolute bottom-6 right-6"} z-5 md:z-10 flex justify-center items-center font-extrabold rounded-full min-h-12 w-12 cursor-pointer active:scale-95 bg-primary text-white duration-300 ease-in-out ${showModal ? "rotate-45" : "rotate-0"}`}
		>
			<Plus strokeWidth={2.5}></Plus>
		</div>
	);
};

export default AddButton;
