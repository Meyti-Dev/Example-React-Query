"use client";
import getContact from "@/queries/getContact";
import React from "react";

export default function page({ params }) {
    const { contact, isPending } = getContact(params.id);
    if (isPending) return <p>loading....</p>;
    return (
        <div>
            <p>{contact.userName}</p>
        </div>
    );
}
