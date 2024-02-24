import clsx from "clsx"
import Link from "next/link"
import {Bars3Icon} from "@heroicons/react/24/outline"

type Props = {
    bookList: Array<{
        id: bigint
        title: string
        author: string
        isRental: boolean
    }>
}

const BooksTable = async ({bookList}: Props) => {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 pt-0">
                    <table className="min-w-full text-gray-900 table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="w-auto px-4 py-5 font-medium">
                                書籍名
                            </th>
                            <th scope="col" className="w-80 px-3 py-5 font-medium">
                                著者名
                            </th>
                            <th scope="col" className="w-20 px-3 py-5 font-medium">
                                貸出状況
                            </th>
                            <th scope="col" className="w-2 px-3 py-5 font-medium">
                                <span className="sr-only">詳細</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {bookList.map((book) => (
                            <tr
                                key={book.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex items-center gap-3">
                                        {book.title}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {book.author}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 justify-center">
                                    <span className={clsx(
                                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                                        {
                                            "bg-gray-100 text-gray-500": book.isRental,
                                            "bg-green-500 text-white": !book.isRental
                                        }
                                    )}>
                                        {book.isRental ? "貸出中" : "貸出可"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex justify-end gap-3">
                                        <Link href={`/dashboard/book/${book.id}`}>
                                            <Bars3Icon className="w-5"/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BooksTable