import Login from "@/components/molecules/dashboard/forms/Login";
import AuthLayout from "src/layouts/AuthLayout";

export default function index(){
    return(
       <AuthLayout>
               <Login/>
       </AuthLayout>
    )
}