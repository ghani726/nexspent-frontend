import { useState } from "react";
import Menu from "@/components/App/Account/Menu";

import Details from "@/components/App/Account/Details";
import Actions from "@/components/App/Account/Actions";
import Devices from "@/components/App/Account/Devices";
const Account = () => {
	const [slider, setSlider] = useState(0);

	return (
		<div className="flex w-full justify-start items-start flex-col gap-4 sm:gap-6">
			<Menu slider={slider} setSlider={setSlider}></Menu>
			{slider === 0 ? (
				<Details></Details>
			) : slider === 1 ? (
				<Devices></Devices>
			) : (
				<Actions setSlider={setSlider}></Actions>
			)}
		</div>
	);
};

export default Account;
