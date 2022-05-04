import ForgotPassword from "@/components/molecules/dashboard/forms/ForgotPassword";
import AuthLayout from "src/layouts/AuthLayout";

export default function login(){
    return(
       <AuthLayout>
               <ForgotPassword/>

       </AuthLayout>
    )
}