import NavLinks from "@/app/ui/dashboard/nav-links"
import {PowerIcon} from "@heroicons/react/24/outline"

const SideNav = ({isa}: Readonly<{ isa: boolean }>) => {
    return (
        <div className="flex flex-col px-2 py-4">
            <div className="relative flex grow flex-col justify-between space-x-0 space-y-2">
                <NavLinks isa={isa}/>
                <form action={async () => {
                    "use server"

                }}>
                    <button
                        className="flex flex-none h-[48px] w-full grow items-center justify-start gap-2 rounded-md bg-gray-100 p-2 px-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                        <PowerIcon className="w-1/6" />
                        <div className="block">ログアウト</div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SideNav