"use client";
// dependencies
import deleteContact from "@/queries/deleteContact";
import getContacts from "@/queries/getContacts";
import Link from "next/link";
import TimeAgo from "react-timeago";
import Fars from "react-timeago/lib/language-strings/fa";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import updateContact from "@/queries/updateContact";

export default function page() {
    // open edit form
    const [openEdit, setOpenEdit] = useState(false);
    const [editInformations, setEditInformations] = useState(null);

    const { contacts, isPending, isError } = getContacts();
    const { mutate } = deleteContact();
    const { mutateAsync } = updateContact();

    // time ago formatter --
    const formatter = buildFormatter(Fars);

    // validate values
    const validate = (values) => {};

    // submit form
    const submitForm = async (values) => {
        const { statusText } = await mutateAsync({
            id: editInformations.id,
            contact: { ...values, date: editInformations.date },
        });
        setOpenEdit((prev) => !prev);
    };

    if (isPending) {
        return <p>loading....</p>;
    }
    if (isError) {
        return <p>loading....</p>;
    }
    return (
        <section className="p-10 custom-min-height">
            <div className="grid grid-cols-4 gap-4">
                {contacts?.map((contact, i) => (
                    <div
                        className="bg-gray-800 w-full backdrop-blur-md rounded-xl p-3 border border-solid border-white/5 flex items-stretch justify-between capitalize hover:scale-105 transition-all"
                        key={i}
                    >
                        {/* title */}
                        <div className=" space-y-3">
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
                            <TimeAgo
                                className="text-white/50 text-xs word-spacing-2"
                                date={contact.date}
                                formatter={formatter}
                            />
                        </div>
                        {/* btns -- */}
                        <div className="flex items-end justify-around flex-col">
                            <button
                                onClick={() => {
                                    setOpenEdit((prev) => !prev);
                                    setEditInformations({
                                        id: contact.id,
                                        date: contact.date,
                                    });
                                }}
                                className="block transition-colors word-spacing-2 text-blue-500 hover:text-blue-600 font-vazir-medium"
                            >
                                <MdEdit className="text-lg" />
                            </button>
                            <button
                                onClick={() => mutate(contact.id)}
                                className="block transition-colors word-spacing-2 text-red-500 hover:text-red-600 font-vazir-medium"
                            >
                                <AiOutlineDelete className="text-lg" />
                            </button>
                            <Link
                                className="block transition-colors word-spacing-2 text-green-500 hover:text-green-600 font-vazir-medium"
                                href={`/view/${contact.id}`}
                            >
                                <FaRegEye className="text-lg" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* edit */}
            <div
                onClick={() => setOpenEdit((prev) => !prev)}
                className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm ${
                    openEdit ? "visible opacity-100" : "invisible opacity-0"
                } transition-all z-20`}
            >
                <Formik
                    initialValues={{
                        userName: "",
                        firstName: "",
                        lastName: "",
                        password: "",
                    }}
                    validate={validate}
                    onSubmit={submitForm}
                >
                    {(prop) => (
                        <Form
                            onClick={(e) => e.stopPropagation()}
                            autoComplete="off"
                            className="w-96 p-5 space-y-4 bg-gray-800 rounded-xl"
                        >
                            <div className="space-y-2">
                                <Field
                                    as="input"
                                    type="text"
                                    name="userName"
                                    className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-gray-900 placeholder:text-white/60 text-white"
                                    placeholder="نام کاربری"
                                />
                                <Field
                                    as="input"
                                    type="text"
                                    name="firstName"
                                    className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-gray-900 placeholder:text-white/60 text-white"
                                    placeholder="نام کوچک"
                                />
                                <Field
                                    as="input"
                                    type="text"
                                    name="lastName"
                                    className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-gray-900 placeholder:text-white/60 text-white"
                                    placeholder="نام خانوادگی"
                                />
                                <Field
                                    as="input"
                                    type="password"
                                    name="password"
                                    className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-gray-900 placeholder:text-white/60 text-white"
                                    placeholder="رمز عبور"
                                />
                            </div>
                            <Field
                                as="input"
                                type="submit"
                                className="text-center word-spacing-3 font-vazir-medium cursor-pointer w-full rounded-xl h-10 px-3 bg-yellow-500 transition-all hover:shadow-[0_0_1rem_#eab308] hover:scale-95"
                                value="ارسال"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
