import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx"
import Spinner from "../Spinner/Spinner"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    loading?: boolean
    variant?: "primary" | "secondary" | "danger"
}

export default function Button({
    children,
    loading = false,
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
        disabled={loading || props.disabled}
        className={clsx(
            "flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all disabled:opacity-60",

            variant === "primary" &&
            "bg-blue-600 hover:bg-blue-700",

            variant === "secondary" &&
            "bg-zinc-800 hover:bg-zinc-700",

            variant === "danger" &&
            "bg-red-600 hover:bg-red-700",

            className
        )}
        {...props}
        >
            {loading && <Spinner size={18}/>}

            {children}
        </button>
    )
}