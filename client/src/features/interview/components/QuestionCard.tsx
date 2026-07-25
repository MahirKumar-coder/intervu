interface Props {
    question: string
}

export default function QuestionCard({
    question,
}: Props) {
    return (

        <div className="rounded-xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-semibold">

                {question}
            </h2>
        </div>
    )
}