import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import ItemListed from "@/components/atoms/custom/ItemListed";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AlertCircle, ChevronDown, ChevronRight, X } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TDebt } from "src/types";
import { THolderStatus } from "src/types/custom";
import { CURRENCIES, EbackendEndpoints, EDebtStatus, EhttpMethod } from "src/types/enums";
import { formatDate } from "src/util/customFunction";
import FetchDataLoader from "../loaders/FetchDataLoader";

export default function AddDebt() {
    const { setDebtStore }: any = useContext(AppContext)

    const router = useRouter()


    // when query search is available

    const debt_id = router.query.q as string

    const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.RWF)
    const [currencyToggle, setCurrencyToggle] = useState<boolean>(false)
    const [holderStatusToggle, setholderStatusToggle] = useState<boolean>(false)

    const currencies: CURRENCIES[] = [CURRENCIES.RWF, CURRENCIES.USD, CURRENCIES.EURO]


    // submit data 

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();



    const [debt, setDebt] = useState<TDebt>()
    const [loadingOne, setLoadingOne] = useState<boolean>()

    useEffect(() => {
        async function fetchData(id: string) {
            setLoadingOne(true);
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.GET_ONE_DEBT + id, EhttpMethod.GET)
                if (response.success) {
                    toast.success(response.message)
                    setDebt(response.data)
                }
                else {
                    toast.error(response.message)
                }
            } catch (e: any) {
                toast.error(e.message)
            }

            setLoadingOne(false)
        }
        debt_id && fetchData(debt_id)
    }, [debt_id, router])


    // holder statuses


    const holder_statuses: THolderStatus[] = [
       
        {
            id: EDebtStatus.SOMEONE_OWES_ME,
            title: 'Someone owes me'
        },
        {
            id: EDebtStatus.I_OWE_SOMEONE,
            title: 'I owe someone'
        },

    ]

    const [holderStatus, setHolderStatus] = useState<THolderStatus>(
        {
            id: holder_statuses[0].id,
            title: holder_statuses[0].title
        }
    )


    const handleForm: SubmitHandler<TDebt> = async (data: TDebt) => {

        setLoading(true);
        // add the catgory in the req body

        data.holder_status = holderStatus.id

        console.log('holaaaaaaa', data)


        let newRecord = {
            name: data.name || debt?.name,
            payment: data.payment || debt?.payment,
            estimated_payment: data.estimated_payment || debt?.estimated_payment,
            issued_date: data.issued_date || debt?.issued_date,
            notes: data.notes || debt?.notes,
            holder_status: data.holder_status || debt?.holder_status
        }

        const service = new Api();
        try {
            let endpoint
            let method
            if (debt_id) {
                endpoint = EbackendEndpoints.UPDATE_DEBT + debt_id
                method = EhttpMethod.PUT
            } else {
                endpoint = EbackendEndpoints.CREATE_DEBT
                method = EhttpMethod.POST

            }
            const response = await service.connect(endpoint, method, newRecord)
            if (response.success) {
                toast.success(response.message)
                setDebtStore()
                router.push('/dashboard/debts')
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

    const [hint, toggleHint] = useState<boolean>(false)
    return (
        <div className="relative">
            {debt_id && loadingOne && <FetchDataLoader />
            }
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit(handleForm)}
            >
                <div className="">
                    <Heading title={debt ? 'Update debt' : "record new debt"} capitalize bold size="lg" color="black" />
                    <br />
                </div>




                <div className="form-group my-5">

                    <label htmlFor="" className="text-sm">Status</label>
                    <div className="mt-3 relative p-3 border rounded flex justify-between cursor-pointer hover:border-primary"
                        onClick={() => { setholderStatusToggle(!holderStatusToggle); setCurrencyToggle(false); }}
                    >
                        <div className="w-full z-10">

                            {holderStatus.title}

                            {/* select currency */}
                            {

                                holderStatusToggle &&
                                <div className="top-16 right-0 w-full absolute shadow-lg p-4 rounded shadow-blue-100 bg-white">
                                    <div className="max-h-80 overflow-auto">
                                        {
                                            holder_statuses?.map((item: THolderStatus, i: number) => {
                                                if (item.id !== holderStatus.id) {
                                                    return (
                                                        <div key={i} onClick={() => {
                                                            setHolderStatus(
                                                                {
                                                                    id: item.id,
                                                                    title: item.title
                                                                }
                                                            ); setholderStatusToggle(!holderStatusToggle)
                                                        }}>
                                                            <ItemListed key={i} title={formatDate(item.title)} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>}
                            {/* select currency ends here */}
                        </div>

                        {holderStatusToggle ?
                            <ChevronDown strokeWidth={1} /> :
                            <ChevronRight strokeWidth={1} />}
                    </div>
                </div>

                <div className="form-group my-5">

                    <input type="text" id="name"
                        placeholder={`${holderStatus.id === EDebtStatus.SOMEONE_OWES_ME ? '(Debtor)' : '(Who you owe)'} names`}
                        className="w-full p-3 focus:outline-primary border rounded"
                        defaultValue={debt?.name}

                        {...register("name", {
                            required: !debt && '* This field is required'
                        })}


                    />
                    <div className="text-red-600 text-xs my-2">
                        {errors.name && errors.name.message}
                    </div>

                </div>

            <div className="form-group">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-group my-2">
                        <div className="border rounded grid grid-cols-5">

                            <div className="col-span-4">
                                <input type="number" id="amount"
                                    placeholder="Return Amount"
                                    className="w-full p-3 focus:outline-primary"
                                    defaultValue={debt?.payment}

                                    {...register("payment", {
                                        required: !debt && '* This field is required'

                                    })}


                                />

                            </div>

                            <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                                onClick={() => { setCurrencyToggle(!currencyToggle); setholderStatusToggle(false) }}
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
                        <div className="text-red-600 text-xs my-2">
                            {errors.payment && errors.payment.message}
                        </div>
                    </div>

                    {/* final payment */}
                    <div className="form-group my-2">
                        <div className="border rounded grid grid-cols-5">

                            <div className="col-span-4">
                                <input type="number" id="estimated_payment"
                                    placeholder="Estimated Return Amount"
                                    className="w-full p-3 focus:outline-primary"
                                    defaultValue={debt?.estimated_payment}

                                    {...register("estimated_payment", {
                                        required: !debt && '* This field is required'

                                    })}


                                />

                            </div>

                            <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                                onClick={() => { setCurrencyToggle(!currencyToggle); setholderStatusToggle(false) }}
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
                        <div className="text-red-600 text-xs my-2">
                            {errors.estimated_payment && errors.estimated_payment.message}
                        </div>
                    </div>

                    {/* final payment ends here */}
                </div>

          <div className="flex justify-end">
          <div className="flex gap-1 items-center badge bg-red-500 text-white p-2 rounded mb-3 cursor-pointer justify-center text-xs hover:opacity-60 shadow-red-300 shadow-xl"
          onClick={() => {toggleHint(!hint)}}
          
          >
            <AlertCircle size={20}/>
                   {hint ? 'Close hint':' Check hint for this!'}
                    </div>
          </div>
{hint &&   <span className="text-gray-400 text-xs my-2">
                    If the there is no returned amount yet, let the <b>RETURNED AMOUNT</b> be 0, and add amount in the estimated amount; Which is the debt. And when the person is paying you back, or you paying back the amount you owe someone, You just change the <b>RETURN AMOUNT</b> till it matches the <b>ESTIMATED RETURNED AMOUNT</b> via Edit from debts table.

                    </span>}
                  
               
            </div>

                <div className="form-group my-5">
                    <label htmlFor="" className="text-sm">Issued date</label>

                    <input type="date" id="issued_date"
                        placeholder=""
                        className="w-full p-3 focus:outline-primary border rounded mt-3"
                        defaultValue={debt?.issued_date}

                        {...register("issued_date", {
                            required: !debt && '* This field is required'
                        })}


                    />
                    <div className="text-red-600 text-xs my-2">
                        {errors.issued_date && errors.issued_date.message}
                    </div>

                </div>

                <div className="form-group my-5">
                    <textarea id="notes" rows={10}
                        placeholder="Notes"
                        className="w-full p-3 border focus:outline-primary"
                        defaultValue={debt?.notes}

                        {...register("notes", {
                            required: !debt && '* This field is required'
                        })}


                    ></textarea>
                    <div className="text-red-600 text-xs my-2">
                        {errors.estimated_payment && errors.estimated_payment.message}
                    </div>
                </div>

                <Button type='submit' title={debt ? "Update" : "Save"} loading={loading} loadingTitle={debt ? "Updating ..." : "Saving ..."} disabled={loading} />

            </form>
        </div>
    )
}