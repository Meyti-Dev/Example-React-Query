import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function getContact(id) {
    const { data: contact, isPending } = useQuery({
        queryKey: ["Contacts", id],
        queryFn: () => axios.get(`http://localhost:9000/contacts/${id}`),
        select: ({ data }) => data,
    });
    return { contact, isPending };
}
