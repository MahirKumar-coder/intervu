import type { InputHTMLAttributes } from "react";
import clsx from "clsx"

interface InputProps
extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export default function Input({
    label,
    error,
    className,
    ...props
}: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                </label>
            )}

            <input 
            className={clsx(
                "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 outline-none focus:border-blue-500",
                className
            )}
            {...props} />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}