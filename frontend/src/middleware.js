import { fetch } from 'node-fetch'; // assuming node-fetch is used for fetching
import { cookies } from "next/headers";

/**
 * ログイン状態をチェックするミドルウェア
 */
const check = async (request) => {
    const res = await fetch("http://localhost:3040/user/check", {
        credentials: "include",
        headers: {
            Cookie: cookies(request.headers).toString() // Pass request.headers to cookies()
        }
    });

    if (request.nextUrl.pathname === "/") {
        if (res.status === 200) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    } else {
        if (res.status === 401) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
    const data = await res.json();
    const clonedRequest = request.clone();
    clonedRequest.headers.append("Cookie", `isa=${data.isAdmin}`);
    const response = NextResponse.rewrite(request.url.toString(), { request: clonedRequest });
    return response;
};

export default check;

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/((?!.*\\.png$))"
    ]
};
