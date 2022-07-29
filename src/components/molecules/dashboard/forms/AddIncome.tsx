import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import ItemListed from "@/components/atoms/custom/ItemListed";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TIncome } from "src/types";
import { CURRENCIES, EbackendEndpoints, EhttpMethod } from "src/types/enums";
import FetchDataLoader from "../loaders/FetchDataLoader";
import ListLoader from "../loaders/ListLoader";

export default function AddIncome() {
    const router = useRouter()


    // when query search is available

    const income_id = router.query.q as string


    const [income, setIncome] = useState<TIncome>()
    const [incomeSource, setIncomeSource] = useState<string>("Select the source of income")
    const [incomeSourceID, setIncomeSourceID] = useState<string>('')

    // getting item loading
    const [loadingOne, setLoadingOne] = useState<boolean>()
    // update
    // get the this income
    useEffect(() => {
        async function fetchData(id: string) {
            setLoadingOne(true);
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.GET_ONE_INCOME + id, EhttpMethod.GET)
                if (response.success) {
                    toast.success(response.message)
                    setIncome(response.data)
                    setIncomeSource(response.data?.source.name)
                    setIncomeSourceID(income?.source._id)
                }
                else {
                    toast.error(response.message)
                }
            } catch (e: any) {
                toast.error(e.message)
            }

            setLoadingOne(false)
        }
        income_id && fetchData(income_id)
    }, [income_id, router])





    const { setIncomeStore, setHistoryLogsStore }: any = useContext(AppContext)

    const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.RWF)
    const [currencyToggle, setCurrencyToggle] = useState<boolean>(false)
    const [incomeSourceToggle, setIncomeSourceToggle] = useState<boolean>(false)

    // get the income category

    const currencies: CURRENCIES[] = [CURRENCIES.RWF, CURRENCIES.USD, CURRENCIES.EURO]




    // get income Categories

    const [incomeSourcesList, setIncomeSourcesList] = useState<any[]>()

    const loadIncomeSourcesList = async () => {
        await new Api().connect(EbackendEndpoints.GET_ALL_INCOME_SOURCES, EhttpMethod.GET)
            .then((response) => {
                if (response.success) {
                    setIncomeSourcesList(response.data.docs)
                }
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }



    // submit data 

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TIncome) {
        // add the source in the req body
        data.source = incomeSourceID

        if(!data.source){
            toast.error("Please select the source of income")
        }
        else{
            setLoading(true);

            let newRecord = {
                amount: data.amount || income?.amount,
                source: data.source || income?.source,
                issued_date: data.issued_date || income?.issued_date,
                notes: data.notes || income?.notes,
            }
    
            const service = new Api();
            try {
    
                let endpoint
                let method
                if (income_id) {
                    endpoint = EbackendEndpoints.UPDATE_INCOME + income_id
                    method = EhttpMethod.PUT
                } else {
                    endpoint = EbackendEndpoints.CREATE_INCOME
                    method = EhttpMethod.POST
    
                }
                const response = await service.connect(endpoint, method, newRecord)
                if (response.success) {
                    toast.success(response.message)
                    setIncomeStore()
                    setHistoryLogsStore()
                    // reset({})
                    router.push('/dashboard/income')
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

      
    }
    return (
        <div className="relative">
            {income_id && loadingOne && <FetchDataLoader />
            }
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit((data: TIncome) => {
                    handleForm(data);
                })}
            >

                <div className="">
                    <Heading title={income_id ? 'Update income' : "record new income"} capitalize bold size="lg" color="black" />
                    <br />
                </div>


                <div className="form-group my-5">
                    <div className="relative p-3 border rounded flex justify-between cursor-pointer hover:border-primary"
                        onClick={() => { setIncomeSourceToggle(!incomeSourceToggle); setCurrencyToggle(false); loadIncomeSourcesList() }}
                    >
                        <div className="w-full z-10">

                            {incomeSource}

                            {/* select currency */}
                            {
                                incomeSourceToggle &&
                                <div className="top-16 right-0 w-full absolute shadow-lg p-4 rounded shadow-blue-100 bg-white">
                                    <div className="max-h-80 overflow-auto">
                                        {
                                            incomeSourcesList !== [] ?
                                                (
                                                    incomeSourcesList ?
                                                        incomeSourcesList?.map((item: any, i: number) => {
                                                            if (item !== incomeSource) {
                                                                return (
                                                                    <div onClick={() => { setIncomeSourceID(item._id); setIncomeSource(item.name); setIncomeSourceToggle(!incomeSourceToggle) }}>
                                                                        <ItemListed key={i} title={item.name} />
                                                                    </div>
                                                                )
                                                            }
                                                        })

                                                        : <ListLoader />
                                                ) : <span className="text-xs text-red-700">No income source available</span>
                                        }
                                    </div>
                                </div>}
                            {/* select currency ends here */}
                        </div>

                        {incomeSourceToggle ?
                            <ChevronDown strokeWidth={1} /> :
                            <ChevronRight strokeWidth={1} />}
                    </div>
                </div>

                <div className="form-group my-5">
                    <div className="border rounded grid grid-cols-5">

                        <div className="col-span-4">
                            <input type="number" id="amount"
                                placeholder="Enter the amount"
                                className="bg-white w-full p-3 focus:outline-primary"
                                defaultValue={income?.amount}

                                {...register("amount", {
                                    required: !income && '* This field is required'
                                })}

                            />
                            <div className="text-red-600 text-xs my-2">
                                {errors.amount && errors.amount.message}
                            </div>
                        </div>

                        <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                            onClick={() => { setCurrencyToggle(!currencyToggle); setIncomeSourceToggle(false) }}
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


                                                    <div key={i} onClick={() => { setCurrency(item); setCurrencyToggle(!currencyToggle) }}>
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

                <div className="form-group my-5">
                    <label htmlFor="" className="text-sm">Issued date</label>

                    <input type="date" id="issued_date"
                        placeholder=""
                        className="bg-white w-full p-3 focus:outline-primary border rounded mt-3"
                        defaultValue={income?.issued_date}

                        {...register("issued_date", {
                            required: !income && '* This field is required'
                        })}


                    />
                    <div className="text-red-600 text-xs my-2">
                        {errors.issued_date && errors.issued_date.message}
                    </div>

                </div>

                <div className="form-group my-5">
                    <textarea id="notes" rows={10}
                        placeholder="Notes"
                        className="bg-white w-full p-3 border focus:outline-primary"
                        defaultValue={income?.notes}

                        {...register("notes")}
                    ></textarea>
                </div>

                <Button type='submit' title={income_id ? "Update" : "Save"} loading={loading} loadingTitle={income_id ? "Updating ..." : "Saving ..."} disabled={loading} />

            </form>
        </div>
    )
}