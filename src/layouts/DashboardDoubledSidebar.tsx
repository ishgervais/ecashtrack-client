import DashboardNav from '@/components/molecules/dashboard/navbars/DashboardNav'
import Sidebar from '@/components/molecules/dashboard/sidebar/Sidebar'
import RightSidebar from '@/components/molecules/dashboard/sidebar/RightSidebar'
import { DashboardType } from 'src/types'
import { checkLocalStorage } from 'src/util/customFunction'

export default function DashboardDoubledSidebar(props: DashboardType) {
    const localToken: string = checkLocalStorage("token");
    if(!localToken){
         typeof window !=='undefined' && (window.location.href = "/")
         return <></>
    }
    else{
        return (
            <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* sidebar */}
                <div className="col-span-2">
                    <Sidebar />
                </div>
                {/* body & navbar */}
                <div className="col-span-8 bg-gray-50">
                    {/* navbar  */}
                    <DashboardNav title={props.title} />

                    {/* body */}

                    <div className="bg-gray-50 p-5 lg:p-10">
                        {props.children}
                    </div>
                </div>

                <div className="col-span-2">
                    <RightSidebar />
                </div>
            </div>
    )
    }
}
