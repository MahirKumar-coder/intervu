import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useInterviewEvents(
    interviewId: string
) {
    const queryClient = useQueryClient()
    
    useEffect(() => {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_API_URL}/interviews/${interviewId}/events`,
        {
            withCredentials: true
        }
      )

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        queryClient.setQueryData(
            ["interview", interviewId],
            (old: any) => ({
                ...old,
                data: {
                    ...old.data,
                    status: data.status,
                }
            })
        )
      }
    
      return () => {
        eventSource.close()
      }
    }, [interviewId, queryClient])
    
}