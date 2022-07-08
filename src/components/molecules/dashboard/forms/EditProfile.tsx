
import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import router from "next/router";
import { useContext, useState } from "react";
import {Mail, User } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TUser } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function EditProfile() {

    // get user from context


    const { user, setUser }: any = useContext(AppContext)

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
        <div className="bg-white w-full p-5 md:p-10">

            <Heading title="update profile" capitalize bold size="2xl" />
            <div className="my-2 flex gap-1 text-sm">
            </div>

            <div className="my-5 text-sm block space-y-5">
                <form action=""
                    onSubmit={handleSubmit((data: TUser) => {
                        handleForm(data);
                    })}
                >

                    {/* names field */}


                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                        <div>
                            <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                                <User className="text-gray-500" strokeWidth={0.5} />
                                <input type="text" placeholder="Firstname" id="first_name" className="w-full h-full py-3 bg-white f focus:outline-none text-gray-600"

                                    defaultValue={user?.first_name}
                                    {...register("first_name", {
                                        required: "* This field is required",
                                    })}
                                />
                            </div>
                            <div className="text-red-600 text-xs my-2">
                                {errors.first_name && errors.first_name.message}
                            </div>
                        </div>

                        <div>
                            <div className="form-group my-5 border rounded flex items-center gap-4 pl-3">
                                <User className="text-gray-500" strokeWidth={0.5} />
                                <input type="text" placeholder="Lastname" id="last_name" className="w-full h-full f py-3 bg-white focus:outline-none text-gray-600"
                                    defaultValue={user?.last_name}
                                    {...register("last_name", {
                                        required: "* This field is required",
                                    })}
                                />
                            </div>
                            <div className="text-red-600 text-xs my-2">
                                {errors.last_name && errors.last_name.message}
                            </div>
                        </div>
                    </div>


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3 bg-gray-100 cursor-not-allowed">
                        <Mail className="text-gray-500" strokeWidth={0.5} />
                        <input type="email" placeholder="Email address" id="email" className="w-full h-full py-3 bg-gray-100  focus:outline-none text-gray-600"
                            defaultValue={user?.email}
                            disabled
                        />
                    </div>
                    <span className="text-xs text-gray-400">Email can't be changed now</span>
                    <div className="text-red-600 text-xs my-2">
                        {errors.email && errors.email.message}
                    </div>

                    <div className="flex justify-end">
                        <div className="w-full md:w-1/3 lg:w-1/6">
                            <Button type="submit" title="Update" loading={loading} loadingTitle={'Updating...'} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}