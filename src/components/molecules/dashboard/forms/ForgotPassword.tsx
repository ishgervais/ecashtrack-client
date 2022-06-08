import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { Lock, Mail, User } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { TUser } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function ForgotPassword() {

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
                    router.push("/")
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

            <Heading title="Forget your password?" capitalize bold size="xl" />
            <div className="my-2 flex gap-1 text-sm">
                <Heading title="Enter your email to get a reset link" color="gray-500" />
                {/* <Link href="/register"><a className="text-mainYellow hover:underline">Sign up</a></Link> */}
            </div>

            <div className="my-5 text-sm block space-y-5">
                <form action=""
                    onSubmit={handleSubmit((data: TUser) => {
                        handleForm(data);
                    })}
                >


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <Mail className="text-gray-500" strokeWidth={0.5} />
                        <input type="email" placeholder="Email address" id="email" className="w-full h-full py-3 bg-white focus:outline-none" 
                             {...register("email", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.email && errors.email.message}
                    </div>

                    <Button type="submit" title="Send OTP" loading={loading} loadingTitle={'Signing in ...'} />
                    <div className="my-5 flex gap-1 text-sm">
                <Heading title="Remembered password?" color="gray-500" />
                <Link href="/"><a className="text-primary hover:underline">Sign in here</a></Link>
            </div>

                </form>
            </div>
        </div>
    )
}