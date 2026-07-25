import { useEffect, useState } from "react"

interface Props {
    seconds: number
}

export default function Timer({
    seconds,
}: Props) {
    
    const [time, setTime] = 
    useState(seconds)

    useEffect(() => {
      const interval = 
      setInterval(() => {

        setTime((prev) => {

            if (prev <= 1) {

                clearInterval(interval)

                return 0
            }

            return prev - 1
        })
      }, 1000)
    
      return () => {
        clearInterval(interval)
      }
    }, [])

    return (

        <div className="rounded bg-red-600 px-4 py-2">

            {Math.floor(time / 60)}:

            {(time % 60)
            .toString()
            .padStart(2, "0")}
        </div>
    )
    
}