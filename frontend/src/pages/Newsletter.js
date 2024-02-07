import { json } from "react-router-dom";

import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

function NewsletterPage() {
    return (
        <PageContent title="Join our awesome newsletter!">
            <NewsletterSignup />
        </PageContent>
    );
}

export default NewsletterPage;

export async function action({ request }) {
    const data = await request.formData();
    const email = data.get("email");

    // send to backend newsletter server ...
    if (!email) {
        throw json({ message: "Invalid email" }, { status: 422 });
    }
    return { message: "Signup successful!" };
}
