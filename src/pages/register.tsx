import Register from "@/components/molecules/dashboard/forms/Register";
import AuthLayout from "src/layouts/AuthLayout";

export default function login(){
    return(
       <AuthLayout>
               <Register/>

       </AuthLayout>
    )
}