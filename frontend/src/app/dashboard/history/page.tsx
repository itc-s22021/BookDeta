import {fetchCurrentRentalBooks, fetchRentalBooksHistory, rentalInfo, returnBook} from "@/app/lib/actions"
import Link from "next/link"
import {formatDateToLocal} from "@/app/lib/utils"

type Prop = {
    searchParams: {
        mode?: "returned"
    }
}

const Page = async ({searchParams}: Prop) => {
    const isPast = searchParams.mode === "returned"
    const rentals = isPast ? await fetchRentalBooksHistory() : await fetchCurrentRentalBooks()

    return (
        <>
            <div>
                {isPast ? (
                    <>
                        <Link href="/dashboard/history" className="text-blue-700 underline">
                            現在借りている書籍一覧
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard/history?mode=returned" className="text-blue-700 underline">
                            以前に借りた書籍一覧
                        </Link>
                    </>
                )}
            </div>
            <div className="mt-6 flex-root">
                <div className="rounded-lg bg-gray-50 p-2 pt-0">
                    <table className="min-w-full text-gray-900 table table-fixed">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="w-auto px-4 py-5 font-medium whitespace-break-spaces">タイトル
                            </th>
                            <th scope="col" className="w-1/6 px-4 py-5 font-medium">貸出日</th>
                            <th scope="col"
                                className="w-1/6 px-4 py-5 font-medium">{isPast ? "返却日" : "返却期限"}</th>
                            <th scope="col" className="w-1/12 px-4 py-5 font-medium">
                                <span className="sr-only">返却</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {rentals.map((rental) => (
                            <tr
                                key={rental.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="py-3 pl-6 pr-3">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/dashboard/book/${rental.bookId}`} className="w-full">
                                            {rental.bookName}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    {formatDateToLocal(rental.rentalDate)}
                                </td>
                                <td className="px-3 py-3">
                                    {formatDateToLocal(isPast ? rental.returnDate : rental.returnDeadline)}
                                </td>
                                <td>
                                    {!isPast && (
                                        <form action={async () => {
                                            "use server"
                                            await returnBook(rental.bookId)
                                        }} className="w-full text-center m-0.5">
                                            <button
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                            >
                                                返却
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Page