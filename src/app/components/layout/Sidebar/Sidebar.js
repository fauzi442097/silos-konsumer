import React from "react";
import Image from "next/image";
import Menu from "./Menu";
import Logo from "./Logo";


const Sidebar = () => {
	return (
		<sidebar className="fixed left-0 bottom-0 top-0 w-72 bg-primary">
			<Logo/>
			<Menu/>
		</sidebar>
	);
};

export default Sidebar;
