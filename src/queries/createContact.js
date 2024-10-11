import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function createContact() {
    const client = useQueryClient();
    const clientData = client.getQueryData(["Contacts"]);
    const { mutateAsync } = useMutation({
        mutationFn: (contact) =>
            axios.post("http://localhost:9000/contacts", contact),
        onSuccess: ({ data }) => {
            client.setQueryData(["Contacts"], (prev) => {
                return { data: [...prev.data, data] };
            });
        },
    });
    return { mutateAsync };
}
