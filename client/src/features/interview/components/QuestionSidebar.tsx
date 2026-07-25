interface Props {

    questions: any[]

    current: number

    goTo: (index: number) => void
}

export default function QuestionSidebar({

    questions,

    current,

    goTo,
}: Props) {
    return (
        <div className="space-y-2">

            {
                questions.map((_, index) => (

                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`

h-10

w-10

rounded-lg

${current === index

                                ?

                                "bg-blue-600"

                                :

                                "bg-zinc-800"

                            }

`}

                    >

                        {index + 1}
                    </button>
                ))
            }
        </div>
    )
}