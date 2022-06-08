import Heading from "@/components/atoms/custom/Heading"
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "src/context/GlobalContext";
import { checkLocalStorage } from "src/util/customFunction";

/* eslint-disable @next/next/no-img-element */
type AuthLayoutType = {
    children: object
}
export default function AuthLayout(props: AuthLayoutType) {
    const { user } = useContext(AppContext)
    const router = useRouter();
    const localToken: string = checkLocalStorage("token");

    // redirects the user if logged in
    if (user && localToken && router.pathname === '/') {
        router.push('/dashboard')
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen gap-5 w-full bg-white ">
            <div className="hidden col-span-1 bg-white lg:h-inherit md:flex items-center ">
                <div className="space-y-5 w-full">
                    <img src="/images/bg_3.svg" className="md:w-2/3 lg:w-2/3 m-auto" alt="" />
                    <Heading title="E-CashTrack" color="primary" bold size="2xl" center />
                </div>

            </div>
            <div className="col-span-1 md:col-span-1 h-screen md:h-full lg:h-screen flex px-10  w-full items-center justify-center bg-white">
              <div className="w-full md:w-2/3">
            <div className="justify-center flex md:hidden mb-5 items-center gap-2">  <img src="/images/logo.png" className="w-10 h-10 block" alt="" /> <Heading title="e-Cashtrack 1.0" color="primary" size="xs" bold/></div>
              {props.children}
              </div>
            </div>
        </div>
    )
}