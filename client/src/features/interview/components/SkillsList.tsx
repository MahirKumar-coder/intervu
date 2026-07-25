interface Props {
    skills: string[]
}

export default function SkillsList({
    skills,
}: Props) {
    return (
        <div className="flex flex-wrap gap-2">

            {skills.map((skill) => (

                <span
                key={skill}
                className="rounded-md bg-blue-600 px-3 py-1"
                >
                    {skill}
                </span>
            ))}
        </div>
    )
}