
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/admin";

// import dynamic from "next/dynamic";
// const App = dynamic(() => import("./app"), { ssr: false } ); //, { ssr: false } 

import App from "./app";

const AdminPage = async () => {

    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        redirect("/");
    }

    return ( 
        <App />
     );
}
 
export default AdminPage;