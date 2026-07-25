interface Props {
    strengths: string[]
}

export default function StrengthsCard({
    strengths,
}: Props) {
    
    return (

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-xl p-6">

            <h2 className="mb-5 text-xl font-bold text-green-400">
                Strengths
            </h2>

            <ul className="space-y-3">

                {strengths.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                        <span className="text-green-500 mt-0.5 font-bold">✓</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}