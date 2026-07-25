import type { ReactNode } from "react"
import Card from "../../../components/ui/Card/Card"

interface Props {
    title: string
    value: string | number
    icon?: ReactNode
}

export default function DashboardCard({
    title,
    value,
    icon,
}: Props) {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-zinc-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>
                </div>

                {icon}
            </div>
        </Card>
    )
}