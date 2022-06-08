import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TExpenseCategory } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function AddExpenseCategory() {
    const {setExpenseCategoryStore}:any = useContext(AppContext)

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TExpenseCategory) {
        setLoading(true);
        const service = new Api();
        try {
            const response = await service.connect(EbackendEndpoints.CREATE_EXPENSE_CATEGORY, EhttpMethod.POST, data)
            if (response.success) {
                toast.success(response.message)
                setExpenseCategoryStore()
                router.push('/dashboard/expenses/categories')
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


        <div className="">
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit((data: TExpenseCategory) => {
                    handleForm(data);
                })}
            >

                <div className="">
                    <Heading title="add expense category" capitalize bold size="lg" color="black" />
                    <br />
                </div>



                <div className="form-group my-5">
                    <input type="text" placeholder="Category" id="name" className="w-full bg-white h-full border rounded p-3 focus:outline-primary"
                        {...register("name", {
                            required: "* This field is required",
                        })}
                    />
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.name && errors.name.message}
                </div>


                <div className="form-group my-5 ">
                  

                    <textarea rows = {10} placeholder="Notes" id="notes" className="w-full bg-white h-full border rounded p-3 focus:outline-primary"
                        {...register("notes", {
                            required: "* This field is required",
                        })}>

                    </textarea>
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.notes && errors.notes.message}
                </div>
                <Button type="submit" title="Create" loading={loading} loadingTitle={'Creating ...'} disabled = {loading} /> 

            </form>
        </div>
    )
}