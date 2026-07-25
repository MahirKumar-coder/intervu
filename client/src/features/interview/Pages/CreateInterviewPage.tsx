import Card from "../../../components/ui/Card/Card";
import CreateInterviewForm from "../components/CreateInterviewForm";

export default function CreateInterviewPage() {
    
    return(

        <div className="min-h-screen flex justify-center items-center bg-zinc-950">

            <Card>
                <div className="w-[500px]">
                    <h1 className="mb-6 text-3xl font-bold">

                        Create Inrerview
                    </h1>

                    <CreateInterviewForm />
                </div>
            </Card>
        </div>
    )
}