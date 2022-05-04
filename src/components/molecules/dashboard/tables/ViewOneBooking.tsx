import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'
import { useRouter } from "next/router";
import { TBooking } from "src/types";
import FetchDataLoader from "../loaders/FetchDataLoader";
import Heading from "@/components/atoms/custom/Heading";
import DataKeyValueBlock from "@/components/atoms/custom/DataKeyValueBlock";
import { formatDate } from "src/util/customFunction";

export default function ViewOneBooking(): JSX.Element {

  const router = useRouter()

  // when query search is available

  const booking_id = router.query.q as string



  const [booking, setBooking] = useState<TBooking>()
  const [loadingOne, setLoadingOne] = useState<boolean>()

  useEffect(() => {
    async function fetchData(id: string) {
      setLoadingOne(true);
      const service = new Api();
      try {
        const response = await service.connect(EbackendEndpoints.GET_ONE_BOOKING + id, EhttpMethod.GET)
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
    fetchData(booking_id)
  }, [booking_id, router])


  return (
    <div className="relative ">
      {loadingOne && <FetchDataLoader />}


      <div className="bg-white p-5 md:p-10">

        <Heading title="Booking info" bold size="md"/>
        <br />

        <DataKeyValueBlock title='Client names' value={booking?.client_names as string} />
        <DataKeyValueBlock title='Booking date' value={booking?.booking_date.date && formatDate(booking?.booking_date?.date as any)} />
        <DataKeyValueBlock title='Payment' value={booking?.payment} />
        <DataKeyValueBlock title='Estimated payment' value={booking?.estimated_payment} />
        <DataKeyValueBlock title='Payment status' value={booking?.payment_status} />
        <DataKeyValueBlock title='Notes' value={booking?.notes} />
        <DataKeyValueBlock title='Status' value={booking?.status} />

        <DataKeyValueBlock title='Done on' value={booking?.createdAt && formatDate(booking?.createdAt as any)} />

      </div>

    </div>
  );
}
