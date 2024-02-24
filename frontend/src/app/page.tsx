import LoginForm from "@/app/ui/login-form"

export default function Home() {
    return (
        <div className="flex items-center justify-center w-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
                <LoginForm/>
            </div>
        </div>
    )
}
