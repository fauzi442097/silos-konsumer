import React from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import { useSidebar } from "@/hooks/SidebarContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
	const { openSidebar } = useSidebar()
	return (
		<div className={cn(['fixed left-0 lg:block hidden bottom-0 top-0 bg-primary dark:bg-dark-depth1 transition-all duration-300 z-10 group peer', !openSidebar && 'hover:w-72', openSidebar ? 'w-72' : 'w-28'])}>
			<Logo/>
			<Menu/>
		</div>
	);
};

export default Sidebar;
