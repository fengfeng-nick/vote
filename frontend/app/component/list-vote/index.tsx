import { JSX } from "react"
import { useReadContract } from "wagmi"
import { voteAbi } from "@/abi/vote"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CardVote } from "@/app/component/card-vote"
import { proposalSchema } from "@/lib/schema/proposal"
import z from "zod"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"


interface Props {
    className?: string
}

export function ListVote({ className }: Props): JSX.Element {

    const { data, isLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: voteAbi,
        functionName: "getProposals"
    })

    if (isLoading) return <Skeleton className="max-w-prose" />

    const proposals = z.array(proposalSchema).parse(data)

    if (proposals.length === 0) return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyTitle>暂无提案</EmptyTitle>
                <EmptyDescription>
                    如果你是管理员，你可以创建提案。
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )

    return (
        <div className={cn(className, "space-y-4")}>
            {proposals.map((item, index) => (
                <CardVote key={index} {...item} />
            ))}
        </div>
    )
}