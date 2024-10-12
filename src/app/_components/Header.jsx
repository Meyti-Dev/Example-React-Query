// dependencies
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { RiContactsBook2Line } from "react-icons/ri";

export default function header() {
    // header
    return (
        <header className="sticky top-0 py-5 bg-gray-800 px-10 border-t-0 border-b border-r-0 border-l-0 border-solid border-white/5 z-10">
            <div className="flex items-center justify-between">
                <Link
                    href="/contacts"
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                    <RiContactsBook2Line className="text-xl" />
                </Link>
                <Link
                    href="/"
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-colors"
                >
                    <FaRegUser className="text-lg" />
                </Link>
            </div>
        </header>
    );
}
