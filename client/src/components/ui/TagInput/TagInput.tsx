import { useState, type KeyboardEvent } from "react"
import Tag from "./Tag"

interface Props {
    value: string[]
    onChange: (skills: string[]) => void
    placeholder?: string
    maxTags?: number
}

export default function TagInput({
    value,
    onChange,
    placeholder = "Type a skill...",
    maxTags = 10,
}: Props) {
    const [input, setInput] = useState("")

    const addTag = () => {
        const tag = input.trim()

        if (!tag) return

        if (value.includes(tag)) {
            setInput("")
            return
        }

        if (value.length >= maxTags) {
            return
        }

        onChange([...value, tag])
        setInput("")
    }

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag))
    }

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }

        if (
            e.key === "Backspace" &&
            input === "" &&
            value.length
        ) {
            removeTag(value[value.length - 1])
        }
    }

    return (
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3">

            <div className="mb-2 flex flex-wrap gap-2">

                {value.map((tag) => (
                    <Tag 
                    key={tag}
                    label={tag}
                    onRemove={() => removeTag(tag)}
                    />
                ))}
            </div>

            <input 
            className="w-full bg-transparent outline-none"
            value={input}
            placeholder={placeholder}
            onChange={(e) => 
                setInput(e.target.value)
            }
            onKeyDown={handleKeyDown} />
        </div>
    )
}