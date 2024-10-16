// dependencies
import "../css/globals.css";
import localFont from "next/font/local";
import ProviderQuery from "./ProviderQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./_components/header";

// fonts
const vazir_regular = localFont({
    src: "../../public/fonts/Vazir.woff2",
});
const vazir_medium = localFont({
    src: "../../public/fonts/Vazir-Medium.woff2",
    variable: "--font-vazir-medium",
});

// head
export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

// html & body
export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="rtl">
            <body
                className={`${vazir_regular.className} ${vazir_medium.variable}`}
            >
                <Header />
                <main>
                    <ProviderQuery>
                        {children}
                        <ReactQueryDevtools />
                    </ProviderQuery>
                </main>
                <footer className="bg-gray-800 py-5 border-t border-b-0 border-r-0 border-l-0 border-solid border-white/5">
                    <p className="text-green-500 word-spacing-2 text-center">
                        ساخته شده توسط مهدی رمضانی
                    </p>
                </footer>
            </body>
        </html>
    );
}
