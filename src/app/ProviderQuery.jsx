"use client";
// dependenices
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ProviderQuery({ children }) {
    // clinet
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retryDelay: false,
                retry: 3,
                refetchOnMount: false,
                refetchInterval: false,
                refetchOnReconnect: true,
                refetchOnWindowFocus: false,
                gcTime: Infinity,
                staleTime: Infinity,
            },
            mutations: {},
        },
    });
    // provide query
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
