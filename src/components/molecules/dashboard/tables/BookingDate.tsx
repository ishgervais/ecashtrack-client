import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'
import { AppContext } from "src/context/GlobalContext";

export default function BookingDate(): JSX.Element {
  const {bookingDatesStore, setBookingDatesStore}:any = useContext(AppContext)
  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }

  useEffect(() => {
    let dataArr:any[]=[]
    const loadData = async () => {
      reload && setBookingDatesStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_BOOKING_DATE, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['date','count','status','id']))
              })
              setBookingDatesStore(dataArr);
            setReload(false)
            
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !bookingDatesStore) && loadData();
  }, [bookingDatesStore, reload, setBookingDatesStore]);

  console.log('reload', reload)
  const cols: string[] = [
    "date",
    "Available times (x)",
    "status",
  ];

  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="BookingDate"
        cols={cols}
        rows={bookingDatesStore}
        actions={["delete"]}
        hide={["id", "created_by", "__v",]}
        populate={[{ model: "", attributes: [""] }]}
        actionPath="/dashboard/booking/bookingdate/"
        loading={bookingDatesStore? false: true}
        reload = {() =>handleReload()}
      />
    </div>
  );
}
