import type {Metadata} from "next"
import {Noto_Sans_JP} from "next/font/google"
import "./ui/globals.css"

const notoSansJP = Noto_Sans_JP({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "書籍管理システム",
}

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <body className={`${notoSansJP.className} antialiased flex h-screen flex-col overflow-hidden`}>
        <header className="flex w-full bg-blue-400 p-3 max-w">
            <p className="text-white text-3xl">書籍管理システム</p>
        </header>
        <main className="flex">
            {children}
        </main>
        <footer className="absolute bottom-0 bg-blue-600 p-3">
            <div className="flex">
                <div className="flex-1 w-screen">
                    <div className="flex justify-center">
                        <p className="text-white text-xs">&copy; 2024 - IT College Okinawa</p>
                    </div>
                </div>
            </div>
        </footer>
        </body>
        </html>
    )
}
