import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export default async function Home() {
    if (!cookies().get("user")) redirect("/login")

    return (
        <div id={"main-content"}>
        </div>
    );
}
