import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TIncomeSource } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import FetchDataLoader from "../loaders/FetchDataLoader";

export default function AddIncomeSource() {
    const router = useRouter()

    const { setIncomeSourceStore }: any = useContext(AppContext)




    // updating the income source

    const income_source_id = router.query.q as string

    // getting item loading
    const [loadingOne, setLoadingOne] = useState<boolean>()
    // update
    // get the this income
    const [incomeSource, setIncomeSource] = useState<TIncomeSource>()
    useEffect(() => {
        async function fetchData(id: string) {
            setLoadingOne(true);
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.GET_ONE_INCOME_SOURCE + id, EhttpMethod.GET)
                if (response.success) {
                    toast.success(response.message)
                    setIncomeSource(response.data)
                }
                else {
                    toast.error(response.message)
                }
            } catch (e: any) {
                toast.error(e.message)
            }

            setLoadingOne(false)
        }
        income_source_id && fetchData(income_source_id)
    }, [income_source_id, router])






    const [loading, setLoading] = useState<boolean>(false);
    // const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TIncomeSource) {
        setLoading(true);
        const service = new Api();
        let newRecord = {
            name: data.name || incomeSource?.name,
            notes: data.notes || incomeSource?.notes,
        }

        try {
            let endpoint
            let method
            if (income_source_id) {
                endpoint = EbackendEndpoints.UPDATE_INCOME_SOURCE + income_source_id
                method = EhttpMethod.PUT
            } else {
                endpoint = EbackendEndpoints.CREATE_INCOME_SOURCE
                method = EhttpMethod.POST

            }
            const response = await service.connect(endpoint, method, newRecord)
            if (response.success) {
                toast.success(response.message)
                setIncomeSourceStore()
                // reset({})
                router.push('/dashboard/income/source')
            }
            else {
                toast.error(response.message)
            }
            // reset({ ...{} })
        } catch (e: any) {
            toast.error(e.message)
        }

        setLoading(false)

    }

    return (


        <div className="relative">
            {income_source_id && loadingOne && <FetchDataLoader />
            }
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit((data: TIncomeSource) => {
                    handleForm(data);
                })}
            >

                <div className="">
                    <Heading title={income_source_id ? 'Update income source' : "record new income source"} capitalize bold size="lg" color="black" />
                    <br />
                </div>



                <div className="form-group my-5">
                    <input type="text" placeholder="Source" id="name" className="w-full bg-white h-full border rounded p-3 focus:outline-primary"
                        defaultValue={incomeSource?.name}
                        {...register("name", {
                            required: !incomeSource && "* This field is required",
                        })}
                    />
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.name && errors.name.message}
                </div>


                <div className="form-group my-5 ">


                    <textarea rows={10} placeholder="Notes" id="notes" className="w-full bg-white h-full border rounded p-3 focus:outline-primary"
                        defaultValue={incomeSource?.notes}
                        {...register("notes", {
                            required: !incomeSource && "* This field is required",
                        })}>

                    </textarea>
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.notes && errors.notes.message}
                </div>
                <Button type='submit' title={income_source_id ? "Update" : "Save"} loading={loading} loadingTitle={income_source_id ? "Updating ..." : "Saving ..."} disabled={loading} />

            </form>
        </div>
    )
}