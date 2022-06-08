import ExpensesChart from "@/components/molecules/dashboard/charts/ExpensesChart";
import { useEffect, useState } from "react";
import BookingAmountChart from "@/components/molecules/dashboard/charts/BookingAmountChart";
import _ from "cypress/types/lodash";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import expenses from "src/pages/dashboard/expenses";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import ListLoader from "@/components/molecules/dashboard/loaders/ListLoader";
import { ChevronDown, ChevronRight } from "react-feather";
export default function BarAnalytics(props: { title: string }): JSX.Element {
    const [year, toggleyear] = useState<boolean>(false)
    const [yearName, toggleyearName] = useState<any>(new Date().getFullYear())
    const years = [2022, 2023, 2024, 2025]

    const [expenses, setExpenses] = useState<any>();
    //   for expenses

    const [expenseTitle, setExpenseTitle] = useState<any>(
        {
            name: 'All',
            id: 0
        }
    )

    const [expenseToggle, handleExpenseToggle] = useState<boolean>(false)

    useEffect(() => {
        const loadExpenses = async () => {
            await new Api()
                .connect(EbackendEndpoints.GET_ALL_EXPENSE_CATEGORIES, EhttpMethod.GET)
                .then((response) => {
                    if (response.success) {
                        let res = response.data.docs
                        setExpenses(res);
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        };
        loadExpenses();
    }, [yearName,expenseTitle ]);

    return (
        <div className="bg-white w-full p-5 md:p-10 rounded-xl">
            <div className="flex justify-between items-center">
                <h4 className="my-5 capitalize text-sm font-bold">
                    {props.title === 'booking' ? 'booking Analytics ' : 'Expense Analytics'}
                </h4>
                <div className="flex gap-5">



                      {/* category */}
                      {props.title !== 'booking' &&
                        <div>
                            <div className="form-group relative w-full">
                                <h3 className="text-xs mb-2 text-gray-500">Choose category</h3>
                                <div className='border rounded-lg p-3 min-w-[200px] cursor-pointer flex items-center text-xs text-black justify-between'
                                    onClick={() => handleExpenseToggle(!expenseToggle)}
                                >
                                   <span> {expenseTitle.name}</span>
                                    <span className="">{expenseToggle ?<ChevronDown size={15}/> :<ChevronRight size={15}/>}</span>
                                </div>


                                {expenseToggle &&
                                    <div className="shadow-xl rounded-lg py-3 px-1 w-full mt-2 absolute bg-white z-40">

                                        <div className="max-h-64 overflow-y-auto    ">
                                            <ul className="text-xs">

                                                <li className="p-2 cursor-pointer hover:bg-primary rounded hover:text-white hover:shadow-green-100"
                                                    onClick={() => {
                                                        setExpenseTitle({
                                                            name: 'All',
                                                            id: 0
                                                        }); handleExpenseToggle(false)
                                                    }}
                                                >
                                                    All
                                                </li>
                                                {expenses ?
                                                expenses?.map((item: any, i: number) => {
                                                    return expenseTitle.name !== item.name && (
                                                        <>
                                                            <li key={i} className="p-2 cursor-pointer hover:bg-primary text-gray-600 rounded hover:text-white hover:shadow-green-100"
                                                                onClick={() => {
                                                                    setExpenseTitle({
                                                                        name: item.name,
                                                                        id: item._id
                                                                    }); handleExpenseToggle(false)
                                                                }}
                                                            >{item.name}</li>
                                                            {/* <hr /> */}
                                                        </>
                                                    )
                                                   
                                                })
                                                : <ListLoader/>
                                            }

                                            </ul>
                                        </div>
                                    </div>

                                }
                            </div>
                        </div>
                    }


                    {/* choose year */}
                    <div>
                        <div className="form-group gilroy-medium relative">
                            <h3 className="text-xs mb-2 text-gray-500">Choose year</h3>
                            <div className='border rounded-lg p-3 w-full cursor-pointer flex items-center text-xs text-black justify-between'
                                onClick={() => toggleyear(!year)}
                            >
                              <span>  {yearName}</span>
                              <span className="">{year ?<ChevronDown size={15}/> :<ChevronRight size={15}/>}</span>
                            </div>


                            {year &&
                                <div className="shadow py-3 px-1 w-full mt-2 absolute bg-white z-40 gilroy-medium">

                                    <div className="max-h-64 overflow-y-auto">
                                        <ul className="text-xs">

                                            {years?.map((item: any, i: number) => {
                                                return (
                                                    <>
                                                        <li key={i} className="p-2 cursor-pointer hover:bg-primary rounded hover:text-white hover:shadow-green-100"
                                                            onClick={() => {
                                                                toggleyearName(item
                                                                ); toggleyear(false)
                                                            }}
                                                        >{item} </li>
                                                        <hr />
                                                    </>
                                                )
                                            })}

                                        </ul>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>

                  
                </div>
            </div>
            <div className="overflow-x-auto my-10">
                <div className="w-max md:w-full">
                    {props.title === 'booking' ?
                        <BookingAmountChart year={yearName} /> :
                        <ExpensesChart year={yearName} cat_id={expenseTitle.id} />
                    }
                </div>
            </div>


        </div>

    )
}