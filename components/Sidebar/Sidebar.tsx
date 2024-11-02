import { Logo } from "@/components/Logo";

import { SidebarRoutes } from "../SidebarRoutes";

export function Sidebar() {
    return (
        <div className="h-screen bg-[#e6f0fe]" >
            <div className="h-full flex flex-col border-r"> 
                <Logo/>
                <SidebarRoutes/>

            </div>

        </div>
    )
}
