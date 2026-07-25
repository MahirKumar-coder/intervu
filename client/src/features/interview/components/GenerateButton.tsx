import Button from "../../../components/ui/Button/Button"
import { useGenerateQuestions } from "../Hook/useGenerateQuestions"

interface Props {
    interviewId: string
    status: string
}

export default function GenerateButton({
    interviewId,
    status,
}: Props) {
    
    const mutation = 
    useGenerateQuestions(interviewId)

    if (status !== "CREATED" && status !== "FAILED") {
        return null
    }

    return (

        <Button
        loading={mutation.isPending}
        onClick={() => mutation.mutate()}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 transform hover:-translate-y-0.5 transition-all"
        >
            Generate Questions
        </Button>
    )
}