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
                <p>1. Click on the hamburger menu on top right</p>
                <p>2. Upload the files that haven't been uploaded</p>
                <p>3. In case of a file has already been uploaded,</p>
                <p>if you reupload it, then previous data will be discarded.</p>
                <p>4. Go to view report to see report for your respective block or all,<br/>clicking on certain parts of
                    the graph will show those entries exclusively</p>
                <p>5. Put on required filters like name, registration number, or status.</p>
                <p>6. Export report as required in excel or pdf.</p>
                <p>7. Don't forget to sign out when you're done!</p>
            </div>
        </div>
    );
}
