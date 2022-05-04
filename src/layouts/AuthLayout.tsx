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
        <div className="grid grid-cols-1 md:grid-cols-3 md:h-screen gap-5 w-full ">
            <div className="hidden col-span-1 lg:col-span-1 bg-primary h-inherit md:flex items-center ">
                <div className="space-y-5 w-full">
                    <img src="/images/bg_2.svg" className="md:w-2/3 lg:w-1/3 m-auto" alt="" />
                    <Heading title="E-CashTrack" color="white" bold size="2xl" center />
                </div>

            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2 h-screen flex px-10  w-full items-center justify-center">
              <div className="w-full md:w-1/2">
            <div className="justify-center flex md:hidden mb-5 items-center gap-2">  <img src="/images/logo.png" className="w-10 h-10 block" alt="" /> <Heading title="e-Cashtrack 1.0" color="primary" size="xs" bold/></div>
              {props.children}
              </div>
            </div>
        </div>
    )
}