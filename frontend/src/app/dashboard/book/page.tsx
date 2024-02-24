import {fetchBookList} from "@/app/lib/actions"
import BooksTable from "@/app/ui/books/BooksTable"
import Pagination from "@/app/ui/books/Pagination"

type pageProps = {
    searchParams?: {
        page?: string
    }
}
const Page = async ({searchParams}: pageProps) => {
    const currentPage = Number(searchParams?.page) || 1
    const bookList = await fetchBookList(currentPage)
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-center">
                <h1 className="text-2xl">書籍一覧</h1>
            </div>
            <BooksTable bookList={bookList.books}/>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={bookList.maxPage}/>
            </div>
        </div>
    )
}

export default Page