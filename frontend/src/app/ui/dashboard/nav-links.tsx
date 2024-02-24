"use client"

import Link from "next/link"
import clsx from "clsx"
import {usePathname} from "next/navigation"
import {BookOpenIcon, HomeIcon, RectangleStackIcon, WrenchIcon} from "@heroicons/react/24/outline"
import {boolean} from "zod"

const links = [
    {name: "ホーム", href: "/dashboard", icon: HomeIcon, show: true},
    {name: "書籍一覧", href: "/dashboard/book", icon: BookOpenIcon, show: true},
    {name: "貸出記録", href: "/dashboard/history", icon: RectangleStackIcon, show: true},
    {name: "管理機能", href: "/dashboard/admin", icon: WrenchIcon, show: false}
]

const NavLinks = ({isa}: Readonly<{ isa: boolean }>) => {
    const pathname = usePathname()
    return (
        <>
            {links.filter(link => isa || link.show).map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-100 p-2 px-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 flex-none",
                            {
                                "bg-sky-200 text-blue-600": pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-1/6"/>
                        <p className="block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}

export default NavLinks