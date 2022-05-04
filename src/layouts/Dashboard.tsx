import DashboardNav from '@/components/molecules/dashboard/navbars/DashboardNav'
import Sidebar from '@/components/molecules/dashboard/sidebar/Sidebar'
import { DashboardType } from 'src/types'
import { checkLocalStorage } from 'src/util/customFunction'

export default function Dashboard(props: DashboardType) {
    const localToken: string = checkLocalStorage("token");
    if(!localToken){
         typeof window !=='undefined' && (window.location.href = "/")
         return <></>
    }
    else{
        return (
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* sidebar */}
                <div className="col-span-2">
                    <Sidebar />
                </div>
                {/* body & navbar */}
                <div className="col-span-10 bg-gray-100">
                    {/* navbar  */}
                    <DashboardNav title={props.title} />

                    {/* body */}

                    <div className="bg-gray-100 p-5 md:p-10">
                        {props.children}
                    </div>
                </div>
            </div>
    )
    }
}
