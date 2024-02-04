import {
    useNavigate,
    Form,
    useNavigation,
    redirect,
    json,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";
    function cancelHandler() {
        navigate("..");
    }

    return (
        <Form method={method} className={classes.form}>
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    defaultValue={event && event.title}
                />
            </p>
            <p>
                <label htmlFor="description">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    required
                    defaultValue={event && event.image}
                />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    defaultValue={event && event.date}
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={event && event.description}
                />
            </p>
            <div className={classes.actions}>
                <button
                    type="button"
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save"}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export async function action({ request, params }) {
    const method = request.method;
    const formData = await request.formData();
    const newEvent = {
        title: formData.get("title"),
        image: formData.get("image"),
        date: formData.get("date"),
        description: formData.get("description"),
    };
    let url = "http://localhost:8080/events";
    if (method === "PATCH") {
        const eventId = params.eventId;
        url = "http://localhost:8080/events/" + eventId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
    });
    if (!response.ok) {
        throw json({ message: "Failed to create new event" }, { status: 500 });
    } else {
        return redirect("/events");
    }
}
