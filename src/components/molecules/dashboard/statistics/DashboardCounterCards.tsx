import CounterCard from "@/components/atoms/cards/CounterCard"
import _ from "cypress/types/lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";

export default function DashboardCounterCards(){
    const [totalCounts, setTotalCounts] = useState<any>();
    

    useEffect(() => {
        const loadTotalCounts = async () => {
          await new Api()
            .connect(EbackendEndpoints.GET_TOTAL_COUNTS, EhttpMethod.GET)
            .then((response) => {
              if (response.success) {
                let res = response.data
                setTotalCounts(res);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        };
        loadTotalCounts();
      }, [totalCounts]);

    const countCards=[
        // {
        //     bgColor:'bg-mainYellow',
        //     icon:<svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M3 0.25H23C23.663 0.25 24.2989 0.513392 24.7678 0.982233C25.2366 1.45107 25.5 2.08696 25.5 2.75V15.25C25.5 15.913 25.2366 16.5489 24.7678 17.0178C24.2989 17.4866 23.663 17.75 23 17.75H3C2.33696 17.75 1.70107 17.4866 1.23223 17.0178C0.763392 16.5489 0.5 15.913 0.5 15.25V2.75C0.5 2.08696 0.763392 1.45107 1.23223 0.982233C1.70107 0.513392 2.33696 0.25 3 0.25ZM20.5 2.75H5.5C5.5 3.41304 5.23661 4.04893 4.76777 4.51777C4.29893 4.98661 3.66304 5.25 3 5.25V12.75C3.66304 12.75 4.29893 13.0134 4.76777 13.4822C5.23661 13.9511 5.5 14.587 5.5 15.25H20.5C20.5 14.587 20.7634 13.9511 21.2322 13.4822C21.7011 13.0134 22.337 12.75 23 12.75V5.25C22.337 5.25 21.7011 4.98661 21.2322 4.51777C20.7634 4.04893 20.5 3.41304 20.5 2.75ZM8 5.25H10.5V12.75H8V5.25ZM15.5 10.25C15.8315 10.25 16.1495 10.1183 16.3839 9.88388C16.6183 9.64946 16.75 9.33152 16.75 9C16.75 8.66848 16.6183 8.35054 16.3839 8.11612C16.1495 7.8817 15.8315 7.75 15.5 7.75C15.1685 7.75 14.8505 7.8817 14.6161 8.11612C14.3817 8.35054 14.25 8.66848 14.25 9C14.25 9.33152 14.3817 9.64946 14.6161 9.88388C14.8505 10.1183 15.1685 10.25 15.5 10.25ZM15.5 12.75C14.5054 12.75 13.5516 12.3549 12.8483 11.6517C12.1451 10.9484 11.75 9.99456 11.75 9C11.75 8.00544 12.1451 7.05161 12.8483 6.34835C13.5516 5.64509 14.5054 5.25 15.5 5.25C16.4946 5.25 17.4484 5.64509 18.1517 6.34835C18.8549 7.05161 19.25 8.00544 19.25 9C19.25 9.99456 18.8549 10.9484 18.1517 11.6517C17.4484 12.3549 16.4946 12.75 15.5 12.75Z" fill="white"/>
        //     </svg>,
        //     title:'Total bookings',
        //     total:  new Intl.NumberFormat('en-US').format(totalCounts?.bookings) 
            
        // },
        // {
        //     bgColor:'bg-green-600',
        //     icon:<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M20.8814 12.3937C20.6386 10.4538 20.9169 8.48419 21.6877 6.68747C21.8002 6.46247 22.0127 6.19997 21.8002 5.95622C21.5877 5.71247 21.2939 5.88122 21.0439 5.95622C20.3994 6.14372 19.8007 6.46264 19.2854 6.8929C18.7702 7.32316 18.3496 7.85544 18.0502 8.45622C17.8814 8.74997 17.7627 9.04372 17.3064 8.98122C15.7665 8.78029 14.2091 8.75094 12.6627 8.89372C11.503 8.96362 10.3706 9.27439 9.3377 9.80622C7.745 10.6829 6.49597 12.0729 5.79395 13.75C5.75987 13.6675 5.73473 13.5816 5.71895 13.4937C5.54395 12.6812 5.09395 12.2437 4.3877 12.35H4.3752C4.21404 12.3703 4.05872 12.4232 3.91874 12.5056C3.77877 12.588 3.65708 12.6981 3.56112 12.8292C3.46517 12.9602 3.39697 13.1095 3.36071 13.2678C3.32444 13.4261 3.32086 13.5902 3.3502 13.75C3.31247 14.4416 3.44286 15.132 3.73022 15.7622C4.01757 16.3925 4.45332 16.9437 5.0002 17.3687C5.19931 17.5051 5.3416 17.7096 5.4002 17.9437C5.76755 19.4902 6.61673 20.8799 7.8252 21.9125C8.04366 22.0913 8.21488 22.321 8.32386 22.5815C8.43283 22.8419 8.47621 23.1251 8.4502 23.4062C8.28145 25.1062 8.95645 25.9687 10.8064 26.2187C10.9486 26.2523 11.0926 26.2773 11.2377 26.2937C12.4877 26.55 12.3502 26.5437 12.5814 25.4062C12.7377 24.6437 13.0439 24.4187 13.8314 24.5375C14.4691 24.6249 15.1133 24.6563 15.7564 24.6312C17.3002 24.6312 17.3064 24.6312 17.7252 26.075C17.8002 26.3375 17.8564 26.625 18.2252 26.5562C19.0808 26.4752 19.9216 26.2798 20.7252 25.975C21.0302 25.8717 21.2967 25.6785 21.4897 25.4208C21.6827 25.1631 21.7932 24.8529 21.8064 24.5312C21.6752 23.2 22.1064 22.6562 22.9064 21.6625C23.0189 21.5312 23.2564 21.3 23.3877 21.1125C23.6241 20.737 23.9474 20.4239 24.3303 20.1998C24.7133 19.9757 25.1446 19.8471 25.5877 19.825C26.3439 19.7875 26.6814 19.5562 26.6814 18.6875V16.0625C26.7096 15.791 26.6296 15.5193 26.4588 15.3064C26.2879 15.0934 26.0401 14.9564 25.7689 14.925C25.3413 14.8397 24.9412 14.6502 24.6044 14.3733C24.2675 14.0963 24.0041 13.7406 23.8377 13.3375C23.1734 12.0351 22.1496 10.9506 20.8877 10.2125L20.8814 12.3937ZM21.9064 17C21.6107 16.9823 21.334 16.8479 21.1372 16.6265C20.9403 16.405 20.8394 16.1145 20.8564 15.8187C20.8726 15.528 21.0034 15.2555 21.2201 15.061C21.4369 14.8665 21.7219 14.7659 22.0127 14.7812V14.7812C22.1643 14.7822 22.3141 14.8139 22.453 14.8746C22.592 14.9352 22.7171 15.0234 22.8209 15.1339C22.9247 15.2444 23.005 15.3748 23.0568 15.5172C23.1087 15.6597 23.1311 15.8112 23.1226 15.9625C23.1141 16.1139 23.0749 16.2619 23.0075 16.3977C22.9401 16.5334 22.8457 16.6541 22.7303 16.7523C22.6148 16.8505 22.4805 16.9242 22.3357 16.9689C22.1909 17.0136 22.0384 17.0284 21.8877 17.0125L21.9064 17Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        //     <path d="M10.5875 9.26255C10.0834 8.93669 9.69119 8.4642 9.46371 7.90869C9.23624 7.35318 9.18441 6.74131 9.31521 6.15546C9.44602 5.5696 9.75316 5.03788 10.1953 4.63187C10.6375 4.22586 11.1934 3.96506 11.7882 3.88456C12.3831 3.80407 12.9883 3.90775 13.5225 4.18166C14.0566 4.45556 14.494 4.88653 14.7758 5.41656C15.0576 5.94659 15.1703 6.55022 15.0986 7.14621C15.027 7.7422 14.7744 8.30193 14.375 8.75005" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        //     </svg>,
        //     title:'Total booking amount',
        //     total:  new Intl.NumberFormat('en-US').format(totalCounts?.bookingAmount) + ' RWF'
            
        // },
        // {
        //     bgColor:'bg-sky-500',
        //     icon:<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M20.8814 12.3937C20.6386 10.4538 20.9169 8.48419 21.6877 6.68747C21.8002 6.46247 22.0127 6.19997 21.8002 5.95622C21.5877 5.71247 21.2939 5.88122 21.0439 5.95622C20.3994 6.14372 19.8007 6.46264 19.2854 6.8929C18.7702 7.32316 18.3496 7.85544 18.0502 8.45622C17.8814 8.74997 17.7627 9.04372 17.3064 8.98122C15.7665 8.78029 14.2091 8.75094 12.6627 8.89372C11.503 8.96362 10.3706 9.27439 9.3377 9.80622C7.745 10.6829 6.49597 12.0729 5.79395 13.75C5.75987 13.6675 5.73473 13.5816 5.71895 13.4937C5.54395 12.6812 5.09395 12.2437 4.3877 12.35H4.3752C4.21404 12.3703 4.05872 12.4232 3.91874 12.5056C3.77877 12.588 3.65708 12.6981 3.56112 12.8292C3.46517 12.9602 3.39697 13.1095 3.36071 13.2678C3.32444 13.4261 3.32086 13.5902 3.3502 13.75C3.31247 14.4416 3.44286 15.132 3.73022 15.7622C4.01757 16.3925 4.45332 16.9437 5.0002 17.3687C5.19931 17.5051 5.3416 17.7096 5.4002 17.9437C5.76755 19.4902 6.61673 20.8799 7.8252 21.9125C8.04366 22.0913 8.21488 22.321 8.32386 22.5815C8.43283 22.8419 8.47621 23.1251 8.4502 23.4062C8.28145 25.1062 8.95645 25.9687 10.8064 26.2187C10.9486 26.2523 11.0926 26.2773 11.2377 26.2937C12.4877 26.55 12.3502 26.5437 12.5814 25.4062C12.7377 24.6437 13.0439 24.4187 13.8314 24.5375C14.4691 24.6249 15.1133 24.6563 15.7564 24.6312C17.3002 24.6312 17.3064 24.6312 17.7252 26.075C17.8002 26.3375 17.8564 26.625 18.2252 26.5562C19.0808 26.4752 19.9216 26.2798 20.7252 25.975C21.0302 25.8717 21.2967 25.6785 21.4897 25.4208C21.6827 25.1631 21.7932 24.8529 21.8064 24.5312C21.6752 23.2 22.1064 22.6562 22.9064 21.6625C23.0189 21.5312 23.2564 21.3 23.3877 21.1125C23.6241 20.737 23.9474 20.4239 24.3303 20.1998C24.7133 19.9757 25.1446 19.8471 25.5877 19.825C26.3439 19.7875 26.6814 19.5562 26.6814 18.6875V16.0625C26.7096 15.791 26.6296 15.5193 26.4588 15.3064C26.2879 15.0934 26.0401 14.9564 25.7689 14.925C25.3413 14.8397 24.9412 14.6502 24.6044 14.3733C24.2675 14.0963 24.0041 13.7406 23.8377 13.3375C23.1734 12.0351 22.1496 10.9506 20.8877 10.2125L20.8814 12.3937ZM21.9064 17C21.6107 16.9823 21.334 16.8479 21.1372 16.6265C20.9403 16.405 20.8394 16.1145 20.8564 15.8187C20.8726 15.528 21.0034 15.2555 21.2201 15.061C21.4369 14.8665 21.7219 14.7659 22.0127 14.7812V14.7812C22.1643 14.7822 22.3141 14.8139 22.453 14.8746C22.592 14.9352 22.7171 15.0234 22.8209 15.1339C22.9247 15.2444 23.005 15.3748 23.0568 15.5172C23.1087 15.6597 23.1311 15.8112 23.1226 15.9625C23.1141 16.1139 23.0749 16.2619 23.0075 16.3977C22.9401 16.5334 22.8457 16.6541 22.7303 16.7523C22.6148 16.8505 22.4805 16.9242 22.3357 16.9689C22.1909 17.0136 22.0384 17.0284 21.8877 17.0125L21.9064 17Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        //     <path d="M10.5875 9.26255C10.0834 8.93669 9.69119 8.4642 9.46371 7.90869C9.23624 7.35318 9.18441 6.74131 9.31521 6.15546C9.44602 5.5696 9.75316 5.03788 10.1953 4.63187C10.6375 4.22586 11.1934 3.96506 11.7882 3.88456C12.3831 3.80407 12.9883 3.90775 13.5225 4.18166C14.0566 4.45556 14.494 4.88653 14.7758 5.41656C15.0576 5.94659 15.1703 6.55022 15.0986 7.14621C15.027 7.7422 14.7744 8.30193 14.375 8.75005" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        //     </svg>,
        //     title:'Total estimated booking amount',
        //     total:  new Intl.NumberFormat('en-US').format(totalCounts?.estimatedBookingAmount) + ' RWF'
            
        // },
        {
            bgColor:'bg-red-600',
            icon:<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.375 21.25H26.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.75 24.375L26.875 21.25L23.7503 18.125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26.875 16.25V6.25C26.875 5.21447 26.0356 4.375 25 4.375H5C3.96447 4.375 3.125 5.21447 3.125 6.25V23.75C3.125 24.7856 3.96447 25.625 5 25.625H17.7941" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.375 9.375L12.5 13.125L15.625 9.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.75 16.875H16.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.75 13.125H16.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 13.125V20.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>,            
            title:'Total Expenses',
            total:  new Intl.NumberFormat('en-US').format(totalCounts?.expenses) 
            
        },
        {
            bgColor:'bg-blue-500',
            icon:<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.945 3.24374C17.9714 3.21057 18.0042 3.18311 18.0415 3.16302C18.0788 3.14294 18.1198 3.13065 18.162 3.12691C18.2043 3.12317 18.2468 3.12805 18.287 3.14126C18.3273 3.15446 18.3645 3.17572 18.3962 3.20374L19.5475 4.21874L15.9237 8.74999H18.325L20.9575 5.45999L23.0225 7.28124C23.0836 7.3352 23.1211 7.41087 23.1272 7.49213C23.1333 7.57339 23.1074 7.65381 23.055 7.71624L22.1925 8.74999H24.6225C24.9235 8.30934 25.053 7.77385 24.9867 7.24434C24.9204 6.71483 24.6629 6.22782 24.2625 5.87499L19.6375 1.79624C19.4144 1.59974 19.1536 1.45079 18.8709 1.35848C18.5883 1.26617 18.2899 1.23244 17.9938 1.25934C17.6977 1.28625 17.4102 1.37323 17.1488 1.51497C16.8875 1.65671 16.6578 1.85024 16.4738 2.08374L11.22 8.74999H13.6075L17.945 3.24374ZM6.5625 8.12499C6.31386 8.12499 6.0754 8.22376 5.89959 8.39958C5.72377 8.57539 5.625 8.81385 5.625 9.06249C5.625 9.31113 5.72377 9.54959 5.89959 9.7254C6.0754 9.90122 6.31386 9.99999 6.5625 9.99999H22.8125C23.8899 9.99999 24.9233 10.428 25.6851 11.1899C26.447 11.9517 26.875 12.985 26.875 14.0625V22.1875C26.875 23.2649 26.447 24.2982 25.6851 25.0601C24.9233 25.822 23.8899 26.25 22.8125 26.25H7.8125C6.73506 26.25 5.70175 25.822 4.93988 25.0601C4.17801 24.2982 3.75 23.2649 3.75 22.1875V9.06249C3.75 8.31657 4.04632 7.6012 4.57376 7.07375C5.10121 6.54631 5.81658 6.24999 6.5625 6.24999H11.9625L10.4725 8.12499H6.5625ZM19.375 18.4375C19.375 18.955 19.795 19.375 20.3125 19.375H22.8125C23.0611 19.375 23.2996 19.2762 23.4754 19.1004C23.6512 18.9246 23.75 18.6861 23.75 18.4375C23.75 18.1888 23.6512 17.9504 23.4754 17.7746C23.2996 17.5988 23.0611 17.5 22.8125 17.5H20.3125C20.0639 17.5 19.8254 17.5988 19.6496 17.7746C19.4738 17.9504 19.375 18.1888 19.375 18.4375Z" fill="white"/>
            </svg>,            
            title:'Total Expenses amount ',
            total:  new Intl.NumberFormat('en-US').format(totalCounts?.expensesAmount) + ' RWF'
            
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {
                    countCards.map((item, index) =>{
                        return(
                            <CounterCard key={index} bgColor={item.bgColor} icon={item.icon} total={item.total} title={item.title} loading = {!totalCounts && true}/>
                        )
                    })
                }
        </div>
    )
}