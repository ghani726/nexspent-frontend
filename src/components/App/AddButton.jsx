import { Plus } from "lucide-react";

const AddButton = ({ showModal, setShowModal, title }) => {
	return (
		<div
			title={title}
			onClick={()=>{
            setShowModal((prev) => !prev)
         }}
			className={`fixed bottom-22 md:bottom-6 right-4 z-5 md:z-10 flex justify-center items-center font-extrabold rounded-full min-h-12 w-12 cursor-pointer active:scale-95 bg-primary text-white duration-300 ease-in-out ${showModal ? "rotate-45" : "rotate-0"}`}
		>
			<Plus strokeWidth={2.5}></Plus>
		</div>
	);
};

export default AddButton;
