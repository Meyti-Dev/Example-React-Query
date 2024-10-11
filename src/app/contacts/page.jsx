"use client";
import deleteContact from "@/queries/deleteContact";
// dependencies
import getContacts from "@/queries/getContacts";
import Link from "next/link";

export default function page() {
    const { contacts, isPending, isError } = getContacts();
    const { mutate } = deleteContact();

    if (isPending) {
        return <p>loading....</p>;
    }
    if (isError) {
        return <p>loading....</p>;
    }
    return (
        <section className="w-96">
            <Link
                href="/"
                className="flex items-center justify-center w-full h-10 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors mb-3 font-vazir-medium word-spacing-2"
            >
                بازگشت به صفحه اصلی
            </Link>

            <div className="space-y-2">
                {contacts?.map((contact, i) => (
                    <div
                        className="bg-black/50 w-full backdrop-blur-md rounded-xl p-3 border border-solid border-white/10 flex items-stretch justify-between capitalize"
                        key={i}
                    >
                        {/* title */}
                        <div className=" space-y-2">
                            <p className="text-white text-xs">{contact.id}</p>
                            <p className="text-white">
                                <span className="text-sm text-white/60">
                                    {contact.firstName} {contact.lastName}
                                </span>{" "}
                                - {contact.userName}
                            </p>
                            <p className="text-white text-sm">
                                {contact.password}
                            </p>
                        </div>
                        {/* btns */}
                        <div className="flex items-end justify-around flex-col">
                            <button className="block transition-colors word-spacing-2 text-blue-500 hover:text-blue-600 font-vazir-medium">
                                ویرایش
                            </button>
                            <button
                                onClick={() => mutate(contact.id)}
                                className="block transition-colors word-spacing-2 text-red-500 hover:text-red-600 font-vazir-medium"
                            >
                                حذف
                            </button>
                            <Link
                                className="block transition-colors word-spacing-2 text-green-500 hover:text-green-600 font-vazir-medium"
                                href={`/view/${contact.id}`}
                            >
                                دیدن
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
