import React from "react";
import { json, useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../EventItem";

export default function EventDetailPage() {
    const { event } = useRouteLoaderData("event-detail");

    return <EventItem event={event} />;
}

export async function loader({ request, params }) {
    const eventId = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + eventId);
    if (!response.ok) {
        throw json(
            { messgae: "Could not fetch event details" },
            { status: 500 }
        );
    } else {
        return response;
    }
}

export async function action({ request, params }) {
    const eventId = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + eventId, {
        method: request.method,
    });
    if (!response.ok) {
        throw json({ messgae: "Could not delete event" }, { status: 500 });
    } else {
        return redirect("/events");
    }
}
