import { useState } from "react";
import Menu from "@/components/App/Account/Menu";

import Details from "@/components/App/Account/Details";
import Actions from "@/components/App/Account/Actions";
const Account = () => {
	const [slider, setSlider] = useState(0);

	return (
		<div className="flex w-full justify-start items-start flex-col gap-4 sm:gap-6">
			<Menu slider={slider} setSlider={setSlider}></Menu>
			{slider === 0 ? (
				<Details></Details>
			) :(
				<Actions setSlider={setSlider}></Actions>
			)}
			{/* <Devices></Devices> */}
		</div>
	);
};

export default Account;
