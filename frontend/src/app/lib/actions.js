"use server";

import { fetch } from 'node-fetch'; // assuming node-fetch is used for fetching
import { cookies } from "next/headers";
import cookieParser from "set-cookie-parser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const api = async (endpoint, method, body) => {
    return await fetch(`http://localhost:3040${endpoint}`, {
        method,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookies().toString()
        },
        body: JSON.stringify(body)
    });
};

const clientCookieRefresh = (res) => {
    cookieParser(res.headers.getSetCookie()).forEach(cookie => {
        cookies().set(cookie.name, cookie.value, {
            domain: cookie.domain,
            path: cookie.path,
            expires: cookie.expires,
            httpOnly: cookie.httpOnly,
            maxAge: cookie.maxAge,
            secure: cookie.secure,
        });
    });
};

const UserLogin = z.object({
    email: z.string().email(),
    password: z.string()
});
const userLogin = async (prevState, formData) => {
    const validatedFields = UserLogin.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    if (!validatedFields.success) {
        return "未入力の項目があります。";
    }
    try {
        const { email, password } = validatedFields.data;
        const res = await api("/user/login", "POST", { email, password });
        if (!res.ok) {
            console.log(`${res.status}: ${JSON.stringify(res.body)}`);
            return "ログインに失敗しました";
        }
        clientCookieRefresh(res);

        revalidatePath("/");
        redirect("/dashboard");
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const fetchBookList = async (page) => {
    try {
        const res = await api(`/book/list?page=${page}`, "GET");
        return await res.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const fetchBookDetail = async (id) => {
    try {
        const res = await api(`/book/detail/${id}`, "GET");
        clientCookieRefresh(res);
        return await res.json();
    } catch (e) {
        console.error("書籍詳細のフェッチでエラー", e);
        throw e;
    }
};

const rentalBook = async (id) => {
    try {
        const res = await api("/rental/start", "POST", { bookId: id });
        if (!res.ok) {
            console.log(`${res.status}: ${JSON.stringify(res.body)}`);
            return "何故か借りられませんでした";
        }
        clientCookieRefresh(res);
        revalidatePath(`/dashboard/book/${id}`);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const returnBook = async (id) => {
    try {
        const res = await api("/rental/return", "PUT", { bookId: id });
        clientCookieRefresh(res);
        revalidatePath(`/dashboard/history`);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const fetchCurrentRentalBooks = async () => {
    try {
        const res = await api("/rental/current", "GET");
        const data = await res.json();
        clientCookieRefresh(res);
        return data.rentalBooks;
    } catch (e) {
        console.error("借りてる本一覧の取得でエラー", e);
        throw e;
    }
};

const fetchRentalBooksHistory = async () => {
    try {
        const res = await api("/rental/history", "GET");
        const data = await res.json();
        clientCookieRefresh(res);
        return data.rentalHistory;
    } catch (e) {
        console.error("過去に借りた本一覧の取得でエラー", e);
        throw e;
    }
};

export { userLogin, fetchBookList, fetchBookDetail, rentalBook, returnBook, fetchCurrentRentalBooks, fetchRentalBooksHistory };
