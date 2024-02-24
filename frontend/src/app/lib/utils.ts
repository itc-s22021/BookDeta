import ISBN from "isbn3"
import {string} from "zod"

const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1)
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages]
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ]
}

const formatDateToLocal = (
    inDate: string | Date | undefined,
    locale: string = "ja-JP",
) => {
    if (!inDate) return "-"
    const date = (inDate instanceof Date) ? inDate : new Date(inDate)
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    }
    const formatter = new Intl.DateTimeFormat(locale, options)
    return formatter.format(date)
}

const formatISBN = (isbn: number) => {
    const result = ISBN.parse(isbn.toString())
    return result?.isbn13h
}

export {generatePagination, formatDateToLocal, formatISBN}