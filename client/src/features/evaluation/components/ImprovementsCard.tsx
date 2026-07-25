interface Props {
    imporvements: string[]
}

export default function ImporvementsCard({
    imporvements,
}: Props) {
    
    return (

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-xl p-6">

            <h2 className="mb-5 text-xl font-bold text-yellow-500">

                Improvements
            </h2>

            <ul className="space-y-3">

                {imporvements.map((item) => (

                    <li key={item} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">

                        <span className="text-yellow-500 mt-0.5 font-bold">⚠</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}