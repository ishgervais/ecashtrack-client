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
import { TExpense } from "src/types";
import { CURRENCIES, EbackendEndpoints, EhttpMethod } from "src/types/enums";
import FetchDataLoader from "../loaders/FetchDataLoader";
import ListLoader from "../loaders/ListLoader";

export default function AddExpense() {
    const router = useRouter()


    // when query search is available

    const expense_id = router.query.q as string


    const [expense, setExpense] = useState<TExpense>()
    const [expenseCategory, setExpenseCategory] = useState<string>("Select expense category")
    const [expenseCatId, setExpenseCatId] = useState<string>('')

    // getting item loading
    const [loadingOne, setLoadingOne] = useState<boolean>()
    // update
    // get the this expense
    useEffect(() => {
        async function fetchData(id: string) {
            setLoadingOne(true);
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.GET_ONE_EXPENSE + id, EhttpMethod.GET)
                if (response.success) {
                    toast.success(response.message)
                    setExpense(response.data)
                    setExpenseCategory(response.data?.category.name)
                    setExpenseCatId(expense?.category._id)
                }
                else {
                    toast.error(response.message)
                }
            } catch (e: any) {
                toast.error(e.message)
            }

            setLoadingOne(false)
        }
        expense_id && fetchData(expense_id)
    }, [expense_id, router])





    const { setExpenseStore }: any = useContext(AppContext)

    const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.RWF)
    const [currencyToggle, setCurrencyToggle] = useState<boolean>(false)
    const [expenseCategoryToggle, setExpenseCategoryToggle] = useState<boolean>(false)

    // get the expense category

    const currencies: CURRENCIES[] = [CURRENCIES.RWF, CURRENCIES.USD, CURRENCIES.EURO]




    // get expense Categories

    const [expenseCategories, setExpenseCategories] = useState<any[]>()

    const loadExpenseCategories = async () => {
        await new Api().connect(EbackendEndpoints.GET_ALL_EXPENSE_CATEGORIES, EhttpMethod.GET)
            .then((response) => {
                if (response.success) {
                    setExpenseCategories(response.data.docs)
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
        formState: { errors },
    } = useForm<any>();

    async function handleForm(data: TExpense) {
        setLoading(true);
        // add the catgory in the req body
        data.category = expenseCatId

        let newRecord = {
            name: data.name || expense?.name,
            amount: data.amount || expense?.amount,
            category: data.category || expense?.category,
            notes: data.notes || expense?.notes,
        }

        const service = new Api();
        try {

            let endpoint
            let method
            if (expense_id) {
                endpoint = EbackendEndpoints.UPDATE_EXPENSE + expense_id
                method = EhttpMethod.PUT
            } else {
                endpoint = EbackendEndpoints.CREATE_EXPENSE
                method = EhttpMethod.POST

            }
            const response = await service.connect(endpoint, method, newRecord)
            if (response.success) {
                toast.success(response.message)
                setExpenseStore()
                router.push('/dashboard/expenses')
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
            {expense_id && loadingOne && <FetchDataLoader />
            }
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit((data: TExpense) => {
                    handleForm(data);
                })}
            >

                <div className="">
                    <Heading title={expense_id ? 'Update expense' : "record new expense"} capitalize bold size="lg" color="black" />
                    <br />
                </div>

                <div className="form-group my-5">

                    <input type="text" id="name"
                        placeholder="Enter the expense name"
                        className="bg-white w-full p-3 focus:outline-primary border rounded"
                        defaultValue={expense?.name}
                        {...register("name", {
                            required: !expense && '* This field is required'
                        })}

                    />
                    <div className="text-red-600 text-xs my-2">
                        {errors.name && errors.name.message}
                    </div>

                </div>


                <div className="form-group my-5">
                    <div className="relative p-3 border rounded flex justify-between cursor-pointer hover:border-primary"
                        onClick={() => { setExpenseCategoryToggle(!expenseCategoryToggle); setCurrencyToggle(false); loadExpenseCategories() }}
                    >
                        <div className="w-full z-10">

                            {expenseCategory}

                            {/* select currency */}
                            {
                                expenseCategoryToggle &&
                                <div className="top-16 right-0 w-full absolute shadow-lg p-4 rounded shadow-blue-100 bg-white">
                                    <div className="max-h-80 overflow-auto">
                                        {
                                            expenseCategories !== [] ?
                                                (
                                                    expenseCategories ?
                                                        expenseCategories?.map((item: any, i: number) => {
                                                            if (item !== expenseCategory) {
                                                                return (
                                                                    <div onClick={() => { setExpenseCatId(item._id); setExpenseCategory(item.name); setExpenseCategoryToggle(!expenseCategoryToggle) }}>
                                                                        <ItemListed key={i} title={item.name} />
                                                                    </div>
                                                                )
                                                            }
                                                        })

                                                        : <ListLoader />
                                                ) : <span className="text-xs text-red-700">No expense category available</span>
                                        }
                                    </div>
                                </div>}
                            {/* select currency ends here */}
                        </div>

                        {expenseCategoryToggle ?
                            <ChevronDown strokeWidth={1} /> :
                            <ChevronRight strokeWidth={1} />}
                    </div>
                </div>

                <div className="form-group my-5">
                    <div className="border rounded grid grid-cols-5">

                        <div className="col-span-4">
                            <input type="number" id="amount"
                                placeholder="Enter the expense amount"
                                className="bg-white w-full p-3 focus:outline-primary"
                                defaultValue={expense?.amount}

                                {...register("amount", {
                                    required: !expense && '* This field is required'
                                })}

                            />
                            <div className="text-red-600 text-xs my-2">
                                {errors.amount && errors.amount.message}
                            </div>
                        </div>

                        <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                            onClick={() => { setCurrencyToggle(!currencyToggle); setExpenseCategoryToggle(false) }}
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

                <div className="form-group my-5">
                    <textarea id="notes" rows={10}
                        placeholder="Notes"
                        className="bg-white w-full p-3 border focus:outline-primary"
                        defaultValue={expense?.notes}

                        {...register("notes")}
                    ></textarea>
                </div>

                <Button type='submit' title={expense_id ? "Update" : "Save"} loading={loading} loadingTitle={expense_id ? "Updating ..." : "Saving ..."} disabled={loading} />

            </form>
        </div>
    )
}