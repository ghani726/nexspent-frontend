import useData from "../../../hooks/Data";

const ColorBox = ({ e, selectedColor, handleColorChange }) => {
	return (
		<label
			key={e.name}
			className="relative cursor-pointer px-1 flex h-11 w-11"
		>
			<input
				type="radio"
				name="colors"
				value={e.name}
				checked={selectedColor === e.name}
				onChange={handleColorChange}
				className="peer hidden"
			/>
			<div
				className={`rounded-full h-10 aspect-square w-10 ${e.color} peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-2 dark:peer-checked:ring-offset-black dark:peer-checked:ring-white`}
				title={e.name}
			></div>
		</label>
	);
};
const ColorPicker = ({ heading, selectedColor, setSelectedColor }) => {
	const { colors } = useData();

	// Color Change Handler
	const handleColorChange = (event) => {
		setSelectedColor(event.target.value);
	};
	
	return (
		<div className="w-full flex flex-col gap-2 items-start">
			<h4 className="font-bold text-xl">{heading}:</h4>
			<div className="flex py-1 pr-2 flex-nowrap overflow-scroll w-full gap-1 justify-start items-center">
				{colors.map((e) => {
					return (
						<ColorBox
							key={e.name}
							e={e}
							selectedColor={selectedColor}
							handleColorChange={handleColorChange}
						></ColorBox>
					);
				})}
			</div>
		</div>
	);
};

export default ColorPicker;
