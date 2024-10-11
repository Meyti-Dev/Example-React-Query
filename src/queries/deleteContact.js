import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function deleteContact() {
    const client = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id) =>
            axios.delete(`http://localhost:9000/contacts/${id}`),
        onSuccess: ({ data }) => {
            client.setQueryData(["Contacts"], (prev) => {
                const filter = prev.data.filter(
                    (contact) => !(contact.id === data.id)
                );
                return { data: filter };
            });
        },
        onError: () => console.log("Error..."),
    });
    return { mutate };
}
