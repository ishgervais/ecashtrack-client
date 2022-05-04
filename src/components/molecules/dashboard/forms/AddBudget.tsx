import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import { useContext, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { TBudget, TUser } from "src/types";
import { CURRENCIES, EbackendEndpoints, EhttpMethod } from "src/types/enums";
import ItemListed from "@/components/atoms/custom/ItemListed";
import { AppContext } from "src/context/GlobalContext";

export default function AddBudget() {

    // context
    const {user}:TUser|any = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();


    const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.RWF)
    const [currencyToggle, setCurrencyToggle] = useState<boolean>(false)

    const currencies: CURRENCIES[] = [CURRENCIES.RWF, CURRENCIES.USD, CURRENCIES.EURO]



    async function handleForm(data: TBudget) {
        setLoading(true);
        data.currency = currency
        data.user = user._id
        const service = new Api();
        try {
            const response = await service.connect(EbackendEndpoints.CREATE_BUDGET, EhttpMethod.POST, data)
            if (response.success) {
                toast.success(response.message)
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
                    <Heading title="create a budget" capitalize bold size="lg" color="black" />
                    <br />
                </div>
                <div className="form-group my-5">
                    <input type="text" placeholder="Name" id="name" className="w-full h-full border rounded p-3 focus:outline-primary"
                        {...register("name", {
                            required: "* This field is required",
                        })}
                    />
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.name && errors.name.message}
                </div>

                <div className="form-group my-5">
                    <div className="border rounded grid grid-cols-5">

                        <div className="col-span-4 relative">
                            <input type="number" id="amount"
                                placeholder="Enter the expense amount"
                                className="w-full p-3 focus:outline-primary"
                                {...register("initiated_amount", {
                                    required: "* This field is required",
                                })}
                            />
                            <div className="absolute  text-red-600 text-xs my-2">
                                {errors.initiated_amount && errors.initiated_amount.message}
                            </div>
                        </div>

                        <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                            onClick={() => { setCurrencyToggle(!currencyToggle);}}
                        >
                            <span>{currency}</span>

                            {currencyToggle ?
                                <ChevronDown strokeWidth={1} /> :
                                <ChevronRight strokeWidth={1} />}
                            {/* select currency */}
                            {
                                currencyToggle &&
                                <div className="top-12 left-0 w-full absolute shadow-lg p-2 text-xs rounded shadow-blue-100 bg-white">
                                    {
                                        currencies.map((item: CURRENCIES, i: number) => {
                                            if (item !== currency) {
                                                return (


                                                    <div onClick={() => { setCurrency(item); setCurrencyToggle(!currencyToggle) }}>
                                                        <ItemListed key={i} title={item} />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>}
                            {/* select currency ends here */}
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="" className="text-gray-400">Start date</label>
                        <div className="form-group mt-2 mb-5 ">
                            <input type="date" id="start_date" className="w-full h-full border rounded p-3 focus:outline-primary"
                                {...register("start_date", {
                                    required: "* This field is required",
                                })} />
                        </div>
                        <div className="text-red-600 text-xs my-2">
                            {errors.start_date && errors.start_date.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-gray-400">End date</label>
                        <div className="form-group mt-2 mb-5 ">
                            <input type="date" id="end_date" className="w-full h-full border rounded p-3 focus:outline-primary"
                                {...register("end_date", {
                                    required: "* This field is required",
                                })} />
                        </div>
                        <div className="text-red-600 text-xs my-2">
                            {errors.end_date && errors.end_date.message}
                        </div>
                    </div>
                </div>


                <div className="form-group my-5 ">


                    <textarea rows={10} placeholder="Description" id="description" className="w-full h-full border rounded p-3 focus:outline-primary"
                        {...register("description", {
                            required: "* This field is required",
                        })}>

                    </textarea>
                </div>
                <div className="text-red-600 text-xs my-2">
                    {errors.description && errors.description.message}
                </div>
                <Button type="submit" title="Create" loading={loading} loadingTitle={'Creating ...'} disabled = {loading} />
            </form>
        </div>
    )
}