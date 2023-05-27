"use client"

import React, { useState } from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import { useSidebar } from "@/app/hooks/SidebarContext";


const Sidebar = () => {

	const { openSidebar } = useSidebar()

	return (
		<div className={`fixed left-0 bottom-0 top-0 ${openSidebar ? 'w-72' : 'w-28'} bg-primary transition-all duration-300`}>
			<Logo/>
			<Menu/>
		</div>
	);
};

export default Sidebar;
