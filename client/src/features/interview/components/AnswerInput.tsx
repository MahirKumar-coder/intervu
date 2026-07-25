interface Props {
    answer: string
    onChange: (value: string) => void
}

export default function AnswerInput({
    answer, 
    onChange,
}: Props) {
    return (

        <textarea 
        rows={10}
        value={answer}
        onChange={(e) => 
            onChange(e.target.value)
        }
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4 outline-none"
        placeholder="Write your answer..."
        />
    )
}