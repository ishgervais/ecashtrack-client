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

export default function Register() {

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TUser) {
        setLoading(true);

        if (data.confirmPassword !== data.password) {
            toast.error('Passwords don\'t match')
            setLoading(false)

        }
        else {
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.CREATE_ACCOUNT, EhttpMethod.POST, data)
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

    }

    return (
        <div className="bg-white w-full">

            <Heading title="create account" capitalize bold size="2xl" />
            <div className="my-2 flex gap-1 text-sm">
                <Heading title="Already have an account?" color="gray-500" />
                <Link href="/"><a className="text-mainYellow hover:underline">Sign in</a></Link>
            </div>

            <div className="my-5 text-sm block space-y-5">
                <form action=""
                    onSubmit={handleSubmit((data: TUser) => {
                        handleForm(data);
                    })}
                >

                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <User className="text-gray-500" strokeWidth={0.5} />
                        <input type="text" placeholder="Firstname" id="first_name" className="w-full h-full py-3 bg-white f focus:outline-none text-gray-600"
                            {...register("first_name", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.first_name && errors.first_name.message}
                    </div>

                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <User className="text-gray-500" strokeWidth={0.5} />
                        <input type="text" placeholder="Lastname" id="last_name" className="w-full h-full f py-3 bg-white focus:outline-none text-gray-600"
                            {...register("last_name", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.last_name && errors.last_name.message}
                    </div>

                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <Mail className="text-gray-500" strokeWidth={0.5} />
                        <input type="email" placeholder="Email address" id="email" className="w-full h-full py-3 bg-white f focus:outline-none text-gray-600" 
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
                        <input type="password" placeholder="Password" id="password" className="w-full h-ful py-3 bg-white fl focus:outline-none text-gray-600"
                             {...register("password", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.password && errors.password.message}
                    </div>


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                        <Lock className="text-gray-500" strokeWidth={0.5} />
                        <input type="password" placeholder="Confirm password" id="confirmPassword" className="w-full h-full py-3 bg-white focus:outline-none text-gray-600"      {...register("confirmPassword", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </div>



                    <Button type="submit" title="Sign Up" loading={loading} loadingTitle={'Creating account ...'} />
                    <div className="mt-5 mb-2 flex gap-1 text-sm">
                        {/* <Heading title="Already have an eCashTrack account?" color="gray-500" /> */}
                        <Link href="/"><a className="text-primary underline">Login here</a></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}