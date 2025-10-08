import { JSX } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useProps } from "./context"
import { Button } from "@/components/ui/button"
import { voteAbi } from "@/abi/vote"
import { useReadContracts, useAccount, useWriteContract } from "wagmi"
import { proposalResultSchema, userVoteStatusSchema } from "@/lib/schema/proposal"
import { Skeleton } from "@/components/ui/skeleton"

export function Vote(): JSX.Element {
    const { options, proposalIndex } = useProps()
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()

    const { data } = useReadContracts({
        contracts: [
            {
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: voteAbi,
                functionName: "getUserVoteStatus",
                args: [proposalIndex, address]
            },
            {
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: voteAbi,
                functionName: "getProposalResult",
                args: [proposalIndex]
            }
        ]
    })

    const voteStatus = userVoteStatusSchema.safeParse(data?.[0].result)
    const proposalResult = proposalResultSchema.safeParse(data?.[1].result)
    
    if (!data || !voteStatus.success || !proposalResult.success) {
        return <Skeleton className="max-w-prose" />
    }

    async function vote(optionIndex: number) {
        await writeContractAsync({
            abi: voteAbi,
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "vote",
            args: [address, proposalIndex, optionIndex]
        })
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>投票结果</AccordionTrigger>
                <AccordionContent>
                    {
                        voteStatus.data && (<div className="text-muted-foreground">该提案您已投过票</div>)
                    }
                    <div className="flex flex-col gap-2">
                        {
                            options.map((option, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <Button disabled={voteStatus.data} variant="ghost" className="font-bold cursor-pointer inline-block min-w-20" onClick={() => vote(index)}>{option}</Button>
                                    <div className="text-muted-foreground">{proposalResult.data[index]}</div>
                                </div>
                            ))
                        }
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}