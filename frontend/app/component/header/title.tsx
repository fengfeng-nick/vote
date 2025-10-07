import { JSX } from "react";

interface Props {
    name: string;
    subname?: string;
}

export function Title({ name, subname }: Props): JSX.Element {
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-sm text-gray-500">{subname}</p>
        </div>
    )
}