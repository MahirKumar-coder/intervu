import Button from "../../../components/ui/Button/Button"

interface Props {
    previous: () => void
    next: () => void
    isFirst: boolean
    isLast: boolean
    submit: () => void
    loading?: boolean
}

export default function NavigationButtons({
    previous,
    next,
    isFirst,
    isLast,
    submit,
    loading = false
}: Props) {
    return (

        <div className="flex justify-between">

            <Button
            variant="secondary"
            disabled={isFirst}
            onClick={previous}
            >
                Previous
            </Button>

            {!isLast ? (
                <Button
                onClick={next}
                >
                    Next
                </Button>
            ) : (
                <Button
                onClick={submit}
                loading={loading}
                >
                    Submit Interview
                </Button>
            )}
        </div>
    )
}