import SkillsList from "./SkillsList"
import StatusBadge from "./StatusBadge"

interface Props {
    interview: any
}

export default function InterviewInfo({
    interview,
}: Props) {
    
    return (

        <div className="space-y-5">

            <div>

                <h1 className="text-4xl font-bold">
                    {interview.role}
                </h1>

                <p className="mt-2 text-zinc-400">
                    {interview.experience} Years Experience
                </p>
            </div>

            <StatusBadge 
            status={interview.status}
            />

            <SkillsList 
            skills={interview.skills}
            />
        </div>
    )
}