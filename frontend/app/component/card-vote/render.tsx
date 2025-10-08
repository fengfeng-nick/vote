import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { JSX } from "react"
import { useProps } from "./context"
import { Vote } from "./vote"

export function Render(): JSX.Element {
    const { title, description, options, startTime, endTime } = useProps()
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Vote />
            </CardContent>
        </Card>
    )
}