import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function updateContact() {
    const client = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (params) =>
            axios.put(
                `http://localhost:9000/contacts/${params.id}`,
                params.contact
            ),
        onSuccess: ({ data }) => {
            // client.invalidateQueries({ queryKey: ["Contacts"] });
            client.setQueryData(["Contacts"], (prev) => {
                const updateContact = prev.data.map((contact) => {
                    if (contact.id === data.id) {
                        return data;
                    }
                    return contact;
                });
                return { data: updateContact };
            });
        },
    });
    return { mutateAsync };
}
