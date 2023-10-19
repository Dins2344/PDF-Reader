
import LoginComponents from "../components/login_components/login"

const LoginPage: React.FC = () => {
    return (
        <>
            <div className="w-screen h-screen">
                <div className=" flex h-full w-full">
                    <div className="w-[70%]" >
                        <LoginComponents />
                    </div>
                    <div className="w-[30%]">
                            <h3 className="text-bl">signup compnent</h3>
                    </div>
                </div>
        </div>
        </>
    )
}

export default LoginPage