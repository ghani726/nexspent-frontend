const Menu = ({ slider, setSlider }) => {
	return (
		<div className="flex justify-center items-center w-full">
			<div
				className={`flex duration-300 ease-in-out bg-white justify-center p-2 px-3 gap-1 items-center rounded-full relative `}
			>
				<div
					className={`absolute top-2 left-2 w-19.5 rounded-full bottom-2 bg-primary duration-300 ease-in-out`}
					style={{ transform: `translateX(${slider * 100}%)` }}
				></div>
				<div
					onClick={() => {
						setSlider(0);
					}}
					className={`w-1/3 p-2.5 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 0? "text-white font-semibold": "font-medium text-black"}`}				>
					Details
				</div>
				<div
					onClick={() => {
						setSlider(1);
					}}
					className={`w-1/3 p-2.5 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 1? "text-white font-semibold ": "font-medium text-black"}`}				>
					Devices
				</div>
				<div
					onClick={() => {
						setSlider(2);
					}}
					className={`w-1/3 p-2.5 z-3 flex justify-center items-center shrink-0 rounded-full cursor-pointer duration-300 ease-in-out ${slider === 2? "text-white font-semibold": "font-medium text-black"}`}				>
					Actions
				</div>
			</div>
		</div>
	);
};

export default Menu;
