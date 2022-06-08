import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { Lock, Mail } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { TUser } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TUser) {
        setLoading(true);
        const service = new Api();
        try {
            const response = await service.connect(EbackendEndpoints.LOGIN, EhttpMethod.POST, data)
            if (response.success) {
                toast.success(response.message)
                localStorage.setItem('token', JSON.stringify(response.data))
                router.push("/dashboard")
            }
            else {
                toast.error(response.message)
            }
        } catch (e: any) {
            toast.error(e.message)
        }

        setLoading(false)

    }

    return (
        <div className="bg-white w-full">

            <Heading title="sign in" capitalize bold size="xl" />
            {/* <div className="my-2 flex gap-1 text-sm">
                <Heading title="Already have an account?" color="gray-500" />
                <Link href="/register"><a className="text-mainYellow hover:underline">Sign up</a></Link>
            </div> */}

            <div className="my-5 text-sm block space-y-5">
                <form action=""
                    onSubmit={handleSubmit((data: TUser) => {
                        handleForm(data);
                    })}
                    className="w-full"
                >


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <Mail className="text-gray-500" strokeWidth={0.5} />
                        <input type="email" placeholder="Email address" id="email" className="w-full h-full py-3 focus:outline-none"
                            {...register("email", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.email && errors.email.message}
                    </div>


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <Lock className="text-gray-500" strokeWidth={0.5} />
                        <input type="password" placeholder="Password" id="password" className="w-full h-full py-3 focus:outline-none"
                            {...register("password", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.password && errors.password.message}
                    </div>






                    <Button type="submit" title="Sign In" loading={loading} loadingTitle={'Signing in ...'} />
                    <div className="mt-5 mb-2 flex gap-1 text-sm">
                        <Heading title="Forgot password?" color="gray-500" />
                        <Link href="/forgotpassword"><a className="text-primary hover:underline">Reset password</a></Link>
                    </div>
                    <Link href="/register"><a className="text-primary underline">Register account</a></Link>

                </form>
            </div>
        </div>
    )
}