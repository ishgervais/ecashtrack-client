import Heading from '@/components/atoms/custom/Heading'
import SecondButton from '@/components/atoms/custom/SecondButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Api } from 'src/pages/api/services/Api';
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums';

type DeleteModal = {
  id: string
  model: string
  path: string
  close: () => void
  reload: () => void
}

export default function DeleteModal(props: DeleteModal) {

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  async function deleteItem() {
    let endpoint: string = ''
    let method:EhttpMethod = EhttpMethod.PUT
    if (props.model === "Booking") {
      endpoint = EbackendEndpoints.DELETE_BOOKING_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }

    if (props.model === "Debt") {
      endpoint = EbackendEndpoints.DELETE_DEBT_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }

    else if (props.model === "Expense") {
      endpoint = EbackendEndpoints.DELETE_EXPENSE_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }
    else if (props.model === "BookingDate") {
      endpoint = EbackendEndpoints.DELETE_BOOKING_DATE_PERMANENTLY+props.id
      method = EhttpMethod.DELETE

    }
    else if (props.model === "ExpenseCategory") {
      endpoint = EbackendEndpoints.DELETE_EXPENSE_CATEGORIES_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }

    // income source


    else if (props.model === "IncomeSource") {
      endpoint = EbackendEndpoints.DELETE_INCOME_SOURCE_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }

    // income 
    else if (props.model === "Income") {
      endpoint = EbackendEndpoints.DELETE_INCOME_TEMPORARLY
    endpoint = endpoint + props.id + '/status?action=INACTIVE'
    method = EhttpMethod.PUT

    }
    

    
    setLoading(true);
    await new Api()
      .connect(endpoint, method)
      .then((res) => {
        if (res.success) {
          toast.success(res.message)
          props.reload()
        }
        else {
          toast.error(res.message)
        }
      })

      .catch((error) => {
        toast.error(error.message)
      });
    setLoading(false);
  }


  return (
    <div className="w-full h-full flex items-center justify-center absolute left-0 top-0 modal z-40">
      <div className="w-5/6 md:w-1/4 bg-white p-10 text-center rounded-xl  modal-content">
        <Heading title="Are you sure you want to delete this record?" color="black" />
        <div className="flex gap-2 mt-5 justify-center">
          <div className="">
            <SecondButton padding = "p-2 text-xs" title="Delete" loading={loading} loadingTitle="Deleting ..." bgColor="bg-red-500" color="text-white" shadow="hover:shadow-red-300"
            handleClick = {()=>{deleteItem(); props.close() }}
            
            />
          </div>
          <div className="text-black text-xs">
            <SecondButton padding = "p-2" handleClick={()=>props.close()} title="Cancel" bgColor="bg-gray-100" color="text-gray-500" shadow="hover:shadow-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

