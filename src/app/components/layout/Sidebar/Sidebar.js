"use client"

import React, { useState } from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import { useSidebar } from "@/app/hooks/SidebarContext";


const Sidebar = () => {

	const { openSidebar } = useSidebar()

	return (
		<div className={`fixed left-0 lg:block hidden bottom-0 top-0 ${openSidebar ? 'w-72' : 'w-28'} bg-primary dark:bg-dark-depth1 transition-all duration-300 z-10`}>
			<Logo/>
			<Menu/>
		</div>
	);
};

export default Sidebar;
