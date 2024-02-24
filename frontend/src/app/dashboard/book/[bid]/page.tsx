import {fetchBookDetail, rentalBook} from "@/app/lib/actions"
import {formatDateToLocal, formatISBN} from "@/app/lib/utils"

type Props = {
    params: {
        bid: string
    }
}

const Page = async ({params}: Props) => {
    const id = params.bid
    const bookDetail = await fetchBookDetail(id)
    return (
        <div className="flex flex-col w-9/12">
            <div className="w-full text-center">
                <p className="text-2xl p-2">書籍詳細情報</p>
            </div>
            <div className="flex-col space-y-1.5">
                <LV label="タイトル" value={bookDetail.title}/>
                <LV label="著者名" value={bookDetail.author}/>
                <LV label="ISBN" value={formatISBN(bookDetail.isbn13)}/>
                <LV label="出版日" value={formatDateToLocal(bookDetail.publishDate)}/>
            </div>
            {bookDetail.rentalInfo && (
                <>
                    <div className="w-full text-center">
                        <p className="text-2xl p-2">貸出情報</p>
                    </div>
                    <div className="flex-col space-y-1.5">
                        <LV label="ユーザ名" value={bookDetail.rentalInfo.userName}/>
                        <LV label="貸出日" value={formatDateToLocal(bookDetail.rentalInfo.rentalDate)}/>
                        <LV label="返却期限" value={formatDateToLocal(bookDetail.rentalInfo.returnDeadline)}/>
                    </div>
                </>
            )}
            {!bookDetail.rentalInfo && (
                <>
                    <form action={async () => {
                        "use server"
                        await rentalBook(bookDetail.id)
                    }} className="w-full text-center mt-8">
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                            借りる
                        </button>
                    </form>
                </>
            )}
        </div>
    )
}

const LV = ({label, value}: { label: string, value?: string }) => {
    return (
        <div className="flex flex-wrap w-full">
            <div className="w-44 bg-gray-500 p-4 text-right text-gray-200">{label}</div>
            <div
                className="w-[calc(100%-11rem)] bg-gray-300 p-4 text-left text-gray-700">{value}</div>
        </div>
    )
}

export default Page