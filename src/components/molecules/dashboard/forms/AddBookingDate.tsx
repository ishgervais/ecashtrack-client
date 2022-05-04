import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TBudget } from "src/types";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function AddBookingDate() {
    const {setBookingDatesStore}:any = useContext(AppContext)

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();
    async function handleForm(data: TBudget) {
        setLoading(true);
        const service = new Api();
        try {
            const response = await service.connect(EbackendEndpoints.CREATE_BOOKING_DATE, EhttpMethod.POST, data)
            if (response.success) {
                toast.success(response.message)
                setBookingDatesStore()
                router.push('/dashboard/booking/bookingdate')
                reset(response)
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
                onSubmit={handleSubmit((data: TBudget) => {
                    handleForm(data);
                })}
            >
                <div className="">
                    <Heading title="create a booking date" capitalize bold size="lg" color="black" />
                    <br />
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="" className="text-gray-400">Date</label>
                        <div className="form-group mt-2 mb-5 ">
                            <input type="date" id="date" className="w-full h-full border rounded p-3 focus:outline-primary"
                                {...register("date", {
                                    required: "* This field is required",
                                })} />
                        </div>
                        <div className="text-red-600 text-xs my-2">
                            {errors.date && errors.date.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-gray-400">Number count</label>
                        <div className="form-group mt-2 mb-5 ">
                            <input type="number" id="count" className="w-full h-full border rounded p-3 focus:outline-primary"
                                defaultValue={1}
                                {...register("count", {
                                    required: "* This field is required",
                                })} />
                        </div>
                        <div className="text-red-600 text-xs my-2">
                            {errors.count && errors.count.message}
                        </div>
                    </div>
                </div>


                <Button type="submit" title="Create" loading={loading} loadingTitle={'Creating ...'} disabled = {loading} />
            </form>
        </div>
    )
}