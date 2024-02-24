import {ReactNode} from "react"
import SideNav from "@/app/ui/dashboard/sidenav"
import {cookies} from "next/headers"

const DashboardLayout = ({children}: { children: ReactNode }) => {
    const isAdmin = Boolean(cookies().get("isa")?.value)
    return (
        <div className="flex w-screen flex-row overflow-hidden">
            <div className="flex-none w-1/6">
                <SideNav isa={isAdmin}/>
            </div>
            <div className="flex-grow overflow-y-auto p-12">{children}</div>
        </div>
    )
}
export default DashboardLayout