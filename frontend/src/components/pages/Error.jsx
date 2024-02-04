import { useRouteError } from "react-router-dom";
import PageContent from "../PageContent";

export default function ErrorPage() {
    const error = useRouteError();

    let message = "Something went wrong!";
    let title = "An error occurred!";

    if (error.status === 500) {
        message = error.data.message;
    }
    if (error.status === 404) {
        title = "Not found";
        message = "Could not find resource or page.";
    }

    return (
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    );
}
