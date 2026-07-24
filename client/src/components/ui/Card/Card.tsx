import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode
}

export default function Card({
    children,
}: CardProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
            {children}
        </div>
    )
}