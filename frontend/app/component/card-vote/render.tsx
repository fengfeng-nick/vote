import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { JSX } from "react"
import { useProps } from "./context"

export function Render(): JSX.Element {
    const { title, description, options, startTime, endTime } = useProps()
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {options.map((option, index) => (
                        <div key={index}>{option}</div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}