import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import Link from "next/link";
import router from "next/router";
import { useContext, useState } from "react";
import { Lock, Mail, User } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TUser } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function ChangePassword() {

    const [loading, setLoading] = useState<boolean>(false);
    const { user }: any = useContext(AppContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TUser) {
        setLoading(true);

        if (data.confirmPassword !== data.newPassword) {
            toast.error('Passwords don\'t match')
            setLoading(false)

        }
        else {
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.CHANGE_PASSWORD + user?._id + '/changepassword', EhttpMethod.POST, data)
                if (response.success) {
                    toast.success(response.message)
                    reset({...{}})
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

        <div className="bg-white w-full lg:w-2/3 p-5 md:p-10">
            <Heading title="change password" capitalize bold size="2xl" />
            <div className="my-5 text-sm block space-y-5">
                <form action=""
                    onSubmit={handleSubmit((data: TUser) => {
                        handleForm(data);
                    })}
                >
                    {/* old password */}


                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3 bg-white">
                        <Lock className="text-gray-500" strokeWidth={0.5} />
                        <input type="password" placeholder="Old password" id="password" className="w-full h-ful py-3 bg-white fl focus:outline-none text-gray-600"
                            {...register("oldPassword", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.oldPassword && errors.oldPassword.message}
                    </div>

                    {/* new password */}

                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3 bg-white">
                        <Lock className="text-gray-500" strokeWidth={0.5} />
                        <input type="password" placeholder="New Password" id="password" className="w-full h-ful py-3 bg-white fl focus:outline-none text-gray-600"
                            {...register("newPassword", {
                                required: "* This field is required",
                            })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.newPassword && errors.newPassword.message}
                    </div>


                    {/* confirm password */}

                    <div className="form-group my-5 border rounded flex items-center gap-4 pl-3 bg-white">
                        <Lock className="text-gray-500" strokeWidth={0.5} />
                        <input type="password" placeholder="Confirm password" id="confirmPassword" className="w-full h-full py-3 bg-white focus:outline-none text-gray-600"      {...register("confirmPassword", {
                            required: "* This field is required",
                        })}
                        />
                    </div>
                    <div className="text-red-600 text-xs my-2">
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </div>



                    <Button type="submit" title="Change password" loading={loading} loadingTitle={'Changing...'} />

                </form>
            </div>
        </div>
    )
}