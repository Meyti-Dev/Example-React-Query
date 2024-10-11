"use client";
// dependencies
import createContact from "@/queries/createContact";
import { v4 as createID } from "uuid";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Link from "next/link";

export default function page() {
    // create contact
    const { mutateAsync } = createContact();

    // modal
    const [modal, setModal] = useState(null);

    // validate values
    const validate = (values) => {};

    // submit form
    const submitForm = async (values) => {
        const { statusText } = await mutateAsync({ ...values, id: createID() });
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
        <section>
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
                        className="w-96 p-5 space-y-2 bg-black/30 rounded-xl backdrop-blur-md"
                    >
                        <Field
                            as="input"
                            type="text"
                            name="userName"
                            className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-black/50 placeholder:text-white/60 text-white"
                            placeholder="نام کاربری"
                        />
                        <Field
                            as="input"
                            type="text"
                            name="firstName"
                            className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-black/50 placeholder:text-white/60 text-white"
                            placeholder="نام کوچک"
                        />
                        <Field
                            as="input"
                            type="text"
                            name="lastName"
                            className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-black/50 placeholder:text-white/60 text-white"
                            placeholder="نام خانوادگی"
                        />
                        <Field
                            as="input"
                            type="password"
                            name="password"
                            className="w-full rounded-xl h-10 px-3 word-spacing-2 text-sm bg-black/50 placeholder:text-white/60 text-white"
                            placeholder="رمز عبور"
                        />
                        <Field
                            as="input"
                            type="submit"
                            className="text-center word-spacing-3 font-vazir-medium cursor-pointer w-full rounded-xl h-10 px-3 bg-yellow-500 hover:bg-yellow-600 transition-colors"
                            value="ثبت نام"
                        />
                    </Form>
                )}
            </Formik>

            <Link
                href="/contacts"
                className="flex items-center justify-center w-full h-10 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors mt-3 font-vazir-medium word-spacing-2"
            >
                دیدن مخاطبین ثبت نام کرده
            </Link>

            {/* modal */}
            <div
                className={`py-3 bg-green-600 fixed ${
                    modal?.open ? "bottom-0" : "-bottom-12"
                } right-0 left-0 transition-all`}
            >
                <p className="text-center word-spacing-3 font-vazir-medium">
                    {modal?.content}
                </p>
            </div>
        </section>
    );
}
