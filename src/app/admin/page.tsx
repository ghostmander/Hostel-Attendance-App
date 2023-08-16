import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function AdminPage() {
    if (!cookies().get("user")) redirect("/login")
    if (cookies().get("user")?.value !== "admin") redirect("/")
    return (
        <div id={"main-content"}>
            <h1 style={{
                textAlign: "center",
                fontSize: "3rem",
                color: "red",
                marginTop: "5rem"
            }}>Admin Page under construction!!!!</h1>
        </div>
    );
}
