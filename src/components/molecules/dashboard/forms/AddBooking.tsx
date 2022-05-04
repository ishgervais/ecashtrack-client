import Button from "@/components/atoms/custom/Button";
import Heading from "@/components/atoms/custom/Heading";
import ItemListed from "@/components/atoms/custom/ItemListed";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, X } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { TBooking, TBookingDate, TExpense } from "src/types";
import { CURRENCIES, EbackendEndpoints, EhttpMethod } from "src/types/enums";
import { formatDate } from "src/util/customFunction";
import FetchDataLoader from "../loaders/FetchDataLoader";
import ListLoader from "../loaders/ListLoader";

export default function AddBooking() {
    const {setBookingStore}:any = useContext(AppContext)

        const router = useRouter()


    // when query search is available

    const booking_id = router.query.q as string

    const [currency, setCurrency] = useState<CURRENCIES>(CURRENCIES.RWF)
    const [currencyToggle, setCurrencyToggle] = useState<boolean>(false)
    const [bookingDateToggle, setBookingDateToggle] = useState<boolean>(false)

    const currencies: CURRENCIES[] = [CURRENCIES.RWF, CURRENCIES.USD, CURRENCIES.EURO]


    // get expense Categories

    const [bookingDates, setBookingDates] = useState<any[]>()

    const loadBookingDates = async () => {
        await new Api().connect(EbackendEndpoints.GET_ALL_ACTIVE_BOOKING_DATES, EhttpMethod.GET)
            .then((response) => {
                if (response.success) {
                    setBookingDates(response.data.docs)
                }
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    
    // submit data 

    const [loading, setLoading] = useState<boolean>(false);
    const [bookingDateID, setBookingDateId] = useState<TBookingDate>()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();



    const [booking, setBooking] = useState<TBooking>()
    const [loadingOne, setLoadingOne] = useState<boolean>()

    useEffect(() => {
        async function fetchData(id:string){
            setLoadingOne(true);
            const service = new Api();
            try {
                const response = await service.connect(EbackendEndpoints.GET_ONE_BOOKING+id, EhttpMethod.GET)
                if (response.success) {
                    toast.success(response.message)
                    setBooking(response.data)
                }
                else {
                    toast.error(response.message)
                }
            } catch (e: any) {
                toast.error(e.message)
            }

            setLoadingOne(false)
        }
        booking_id && fetchData(booking_id)
    }, [booking_id, router])



    let booking_starter =  !booking_id ?'Select booking date': (booking?.booking_date.date)
    // alert(booking_starter)
    const [bookingDate, setBookingDate] = useState<string>('Select booking date')


    const handleForm: SubmitHandler<TBooking> =  async(data: TBooking) => {
        
        console.log('holaaaaaaa', data)
        setLoading(true);
        // add the catgory in the req body
        data.booking_date = bookingDateID as TBookingDate

        let newRecord = {
            client_names: data.client_names || booking?.client_names,
            booking_date: data.booking_date || booking?.booking_date,
            payment: data.payment || booking?.payment,
            estimated_payment: data.estimated_payment || booking?.estimated_payment,
            notes: data.notes || booking?.notes,
         }

        const service = new Api();
        try {
            let endpoint
            let method
            if(booking_id){
                endpoint = EbackendEndpoints.UPDATE_BOOKING+ booking_id
                method = EhttpMethod.PUT
            }else{
                endpoint = EbackendEndpoints.CREATE_BOOKING
                method = EhttpMethod.POST

            }
            const response = await service.connect(endpoint,method, newRecord)
            if (response.success) {
                toast.success(response.message)
                setBookingStore()
                router.push('/dashboard/booking')
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
            {booking_id && loadingOne && <FetchDataLoader/>
            }
            <form action="" className="text-sm w-full lg:w-1/2 bg-white p-5 md:p-10 text-gray-500"
                onSubmit={handleSubmit(handleForm)}
            >
                <div className="">
                    <Heading title={booking ? 'Update booking':"record new booking"} capitalize bold size="lg" color="black" />
                    <br />
                </div>

                <div className="form-group my-5">

                    <input type="text" id="name"
                        placeholder="Client names"
                        className="w-full p-3 focus:outline-primary border rounded"
                        defaultValue = {booking?.client_names}
                        
                        {...register("client_names", {
                            required: !booking && '* This field is required'
                        })}


                    />
                    <div className="text-red-600 text-xs my-2">
                        {errors.client_names && errors.client_names.message}
                    </div>

                </div>


                <div className="form-group my-5">
                    <div className="relative p-3 border rounded flex justify-between cursor-pointer hover:border-primary"
                        onClick={() => { setBookingDateToggle(!bookingDateToggle); setCurrencyToggle(false); loadBookingDates() }}
                    >
                        <div className="w-full z-10">

                            {booking_id? booking_starter && formatDate(booking_starter as string): bookingDate && formatDate(bookingDate as string)}

                            {/* select currency */}
                            {

                                bookingDateToggle &&
                                <div className="top-16 right-0 w-full absolute shadow-lg p-4 rounded shadow-blue-100 bg-white">
                                 <div className="max-h-80 overflow-auto">
                                 { bookingDates !== [] ? (
                                        bookingDates ?
                                        bookingDates?.map((item: any, i: number) => {
                                            if (item !== bookingDate) {
                                                return (
                                                    <div key={i} onClick={() => { setBookingDateId(item._id); setBookingDate(formatDate(item.date)); setBookingDateToggle(!bookingDateToggle) }}>
                                                        <ItemListed key={i} title={formatDate(item.date)} />
                                                    </div>
                                                )
                                            }
                                        })
                                        :  <ListLoader/>
                                    ): <span className="text-xs text-red-700">No booking date available</span>
                                    }
                                 </div>
                                </div>}
                            {/* select currency ends here */}
                        </div>

                        {bookingDateToggle ?
                            <ChevronDown strokeWidth={1} /> :
                            <ChevronRight strokeWidth={1} />}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-group my-5">
                        <div className="border rounded grid grid-cols-5">

                            <div className="col-span-4">
                                <input type="number" id="amount"
                                    placeholder="Payment"
                                    className="w-full p-3 focus:outline-primary"
                                    defaultValue = {booking?.payment}
                                   
                                    {...register("payment", {
                                        required: !booking && '* This field is required'
                                        
                                    })}


                                />

                            </div>

                            <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                                onClick={() => { setCurrencyToggle(!currencyToggle); setBookingDateToggle(false) }}
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
                    <div className="form-group my-5">
                        <div className="border rounded grid grid-cols-5">

                            <div className="col-span-4">
                                <input type="number" id="estimated_payment"
                                    placeholder="Estimated payment"
                                    className="w-full p-3 focus:outline-primary"
                                    defaultValue = {booking?.estimated_payment}
                                    
                                    {...register("estimated_payment", {
                                        required: !booking && '* This field is required'
                                        
                                    })}


                                />

                            </div>

                            <div className="col-span-1 relative flex text-xs justify-end border-l p-3 items-center gap-2 cursor-pointer "
                                onClick={() => { setCurrencyToggle(!currencyToggle); setBookingDateToggle(false) }}
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

                <div className="form-group my-5">
                    <textarea id="notes" rows={10}
                        placeholder="Notes"
                        className="w-full p-3 border focus:outline-primary"
                        defaultValue = {booking?.notes}
                        
                        {...register("notes", {
                            required: !booking && '* This field is required'
                        })}

                        
                    ></textarea>
                     <div className="text-red-600 text-xs my-2">
                            {errors.estimated_payment && errors.estimated_payment.message}
                        </div>
                </div>

                <Button type = 'submit' title={booking ? "Update":"Create"} loading={loading} loadingTitle={booking ? "Updating ...":"Creating ..."} disabled = {loading} />

            </form>
        </div>
    )
}