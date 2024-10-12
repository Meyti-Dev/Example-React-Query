"use client";
import getContact from "@/queries/getContact";
import Image from "next/image";
import React from "react";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import fars from "react-timeago/lib/language-strings/fa";

export default function page({ params }) {
    // get contact
    const { contact, isPending } = getContact(params.id);

    const persian = buildFormatter(fars);

    // jsx
    if (isPending) return <p>loading....</p>;
    return (
        <section className="space-y-3 custom-height flex items-center justify-center">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-center text-sm text-white">
                        {contact.id}
                    </p>
                    <p className="text-white/50 text-center word-spacing-2 text-sm">
                        <TimeAgo date={contact?.date} formatter={persian} />
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5 flex items-stretch justify-center gap-5">
                    {/* image */}
                    <div className="w-52 h-52">
                        <Image
                            className="w-full h-full object-cover object-center"
                            src="/images/219988.png"
                            width={500}
                            height={500}
                            alt="..."
                            loading="lazy"
                        />
                    </div>
                    {/* content */}
                    <div className="flex items-start justify-around flex-col">
                        <div className="w-56 flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2">
                            <p className="word-spacing-2 text-sm text-white/60">
                                نام کاربری
                            </p>
                            <p className="text-white word-spacing-2">
                                {contact.userName}
                            </p>
                        </div>
                        <div className="w-56 flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2">
                            <p className="word-spacing-2 text-sm text-white/60">
                                نام کوچک
                            </p>
                            <p className="text-white word-spacing-2">
                                {contact.firstName}
                            </p>
                        </div>
                        <div className="w-56 flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2">
                            <p className="word-spacing-2 text-sm text-white/60">
                                نام خانوادگی
                            </p>
                            <p className="text-white word-spacing-2">
                                {contact.lastName}
                            </p>
                        </div>
                        <div className="w-56 flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2">
                            <p className="word-spacing-2 text-sm text-white/60">
                                رمز عبور
                            </p>
                            <p className="text-white word-spacing-2">
                                {contact.password}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
