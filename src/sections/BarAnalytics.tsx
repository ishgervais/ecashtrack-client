import ExpensesChart from "@/components/molecules/dashboard/charts/ExpensesChart";
import { useEffect, useState } from "react";
import BookingAmountChart from "@/components/molecules/dashboard/charts/BookingAmountChart";
import _ from "cypress/types/lodash";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import expenses from "src/pages/dashboard/expenses";
import { EbackendEndpoints, EDebtStatus, EhttpMethod } from "src/types/enums";
import ListLoader from "@/components/molecules/dashboard/loaders/ListLoader";
import { ChevronDown, ChevronRight } from "react-feather";
import DebtsChart from "@/components/molecules/dashboard/charts/DeptsChart";
import { THolderStatus } from "src/types/custom";
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

        

    return (
        <div className="bg-white w-full p-5 md:p-10 rounded-xl">
            <div className="flex flex-wrap justify-between items-center">
                <h4 className="my-5 capitalize text-sm font-bold">
                    {props.title === 'debt' ? 'Debts Analytics ' : 'Expense Analytics'}
                </h4>
                <div className="flex flex-wrap gap-5">



                      {/* category */}
                      {props.title !== 'booking' &&
                        <div>
                            <div className="form-group relative w-full">
                                <h3 className="text-xs mb-2 text-gray-500">Choose category</h3>
                                <div className='border rounded-lg p-3 min-w-[200px] cursor-pointer flex items-center text-xs text-black justify-between'
                                    onClick={() => handleExpenseToggle(!expenseToggle)}
                                >
                                   {props.title === 'debt'? holderStatus.title:expenseTitle.name}
                                    <span className="">{expenseToggle ?<ChevronDown size={15}/> :<ChevronRight size={15}/>}</span>
                                </div>


                                {expenseToggle &&
                                    <div className="shadow-xl rounded-lg py-3 px-1 w-full mt-2 absolute bg-white z-40">

                                        <div className="max-h-64 overflow-y-auto    ">
                                            <ul className="text-xs">

                                                {
                                                    props.title !=='debt' && 
                                                    <li className="p-2 cursor-pointer hover:bg-primary rounded text-black hover:text-white hover:shadow-green-100"
                                                    onClick={() => {
                                                      {
                                                        setExpenseTitle({
                                                            name: 'All',
                                                            id: 0
                                                        }); 
                                                      }
                                                        
                                                        handleExpenseToggle(false)
                                                    }}
                                                >
                                                    All
                                                </li>
                                                }
                                           

                                            {props.title === 'debt' ?
                                                holder_statuses?.map((item: THolderStatus, i: number) => {
                                                    return holderStatus.id !== item.id && (
                                                            <li key={i} className="p-2 cursor-pointer hover:bg-primary text-gray-600 rounded hover:text-white hover:shadow-green-100"
                                                                onClick={() => {
                                                                    setHolderStatus({
                                                                        id: item.id,
                                                                        title: item.title
                                                                    }); handleExpenseToggle(false)
                                                                }}
                                                            >{item.title}</li>
                                                    )
                                                   
                                                })
                                                :
                                                expenses ?
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
                    {props.title === 'debt' ?
                        <DebtsChart year={yearName} cat_id={holderStatus.id} /> :
                        <ExpensesChart year={yearName} cat_id={expenseTitle.id} />
                    }
                </div>
            </div>


        </div>

    )
}