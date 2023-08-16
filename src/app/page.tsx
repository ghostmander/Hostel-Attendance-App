import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import "./home.scss"

export default async function Home() {
    if (!cookies().get("user")) redirect("/login")

    return (
        <div id={"main-content"}>
            <div id={"instructions"}>
                {/* TODO: ADD INSTRUCTIONS */}
                <h1>Instructions</h1>
                <p>1. First you need to suck on that peepnis</p>
                <p>2. Then you need to suck on that peepnis</p>
                <p>3. YEOWCH !!!!!</p>
                <p>4. You're done!</p>
            </div>
        </div>
    );
}
