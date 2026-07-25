interface TagProps {
    label: string
    onRemove: () => void
}

export default function Tag({
    label,
    onRemove,
}: TagProps) {
    return(
        <div className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-sm">
            <span>{label}</span>

            <button
            type="button"
            onClick={onRemove}
            className="text-white transition hover:text-red-300"
            >
                x
            </button>
        </div>
    )
}