"use client";
// dependencies
import createContact from "@/queries/createContact";
import { v4 as createID } from "uuid";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Link from "next/link";
import TimeAgo from "react-timeago";

export default function page() {
    // create contact
    const { mutateAsync } = createContact();

    // modal
    const [modal, setModal] = useState(null);

    const date = new Date();
    console.log(date.getTime());

    // validate values
    const validate = (values) => {};

    // submit form
    const submitForm = async (values) => {
        const { statusText } = await mutateAsync({
            ...values,
            id: createID(),
            date: new Date().getTime(),
        });
        if (statusText === "Created") {
            setModal({
                open: true,
                content: "ثبت نام شما موفقیت آمیز بود",
            });
            setTimeout(() => {
                setModal({
                    open: false,
                });
            }, 5000);
        }
    };

    // [form & modal]
    return (
        <section className="custom-height flex items-center justify-center">
            <div className="">
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
                                value="ثبت نام"
                            />
                        </Form>
                    )}
                </Formik>

                {/* modal */}
                <div
                    className={`h-16 bg-green-600 fixed ${
                        modal?.open ? "bottom-0" : "-bottom-16"
                    } right-0 left-0 transition-all z-10`}
                >
                    <p className="text-center word-spacing-3 font-vazir-medium">
                        {modal?.content}
                    </p>
                </div>
            </div>
        </section>
    );
}
