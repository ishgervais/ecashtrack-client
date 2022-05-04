import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'

export default function Booking(): JSX.Element {

  const {bookingStore, setBookingStore}:any = useContext(AppContext)
  // const [expenses, setExpenses] = useState<any>();

  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
  useEffect(() => {
    let dataArr:any[]=[]

    const loadBookings = async () => {
      // reload && setExpenses(null)
      reload && setBookingStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_BOOKINGS, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['client_names','booking_date','payment','estimated_payment','payment_status','id']))
              })
            setBookingStore(dataArr)
            // setExpenses(dataArr);
            setReload(false)
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !bookingStore) && loadBookings();
  }, [bookingStore, reload, setBookingStore]);

  const cols: string[] = [
    "client names",
    "booked date",
    "payment amount (RWF)",
    "estimated payment amount (RWF)",
    "Payment status"
  ];

  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="Booking"
        cols={cols}
        rows={bookingStore}
        actions={["view","edit", "delete"]}
        hide={["id", "created_by", "__v",]}
        populate={[{ model: "booking_date", attributes: ["date"] }]}
        actionPath="/dashboard/booking/"
        loading={bookingStore ? false: true}
        reload = {() =>handleReload()}
      />
    </div>
  );
}
