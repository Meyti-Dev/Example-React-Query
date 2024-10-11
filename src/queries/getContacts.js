import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function getContacts() {
    const {
        data: contacts,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["Contacts"],
        queryFn: () => axios.get("http://localhost:9000/contacts"),
        select: (data) => data.data,
    });
    return { contacts, isPending, isError };
}
