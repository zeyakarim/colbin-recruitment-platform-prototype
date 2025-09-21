import { useQuery } from "@tanstack/react-query";
import { fetcher } from ".";

export const useProfileData = () => {
    return useQuery({
        queryKey: ["getMe"],
        queryFn: async () => {
            const res = await fetcher(`/user/profile`, "get");

            if (!res || !res.data) {
                throw new Error(res?.message || "Failed to fetch profile data.");
            }
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};