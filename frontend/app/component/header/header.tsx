import Image from "next/image";
import { JSX } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ButtonWallet } from "./button-wallet";
import ButtonAddProposal from "./button-add-proposal";

interface Props {
    className?: string;
}

export function Header({ className }: Props): JSX.Element {
    return (
        <div className={cn("flex h-20 w-full justify-between items-center p-4", className)}>
            <div className={"flex gap-2"}>
                <Image src="/vote.jpg" alt="logo" width={80} height={80} />
                <Title name="去中心化投票系统" subname="Decentralized Voting System" />
            </div>
            <div className="flex items-center gap-4">
                <ButtonAddProposal />
                <ButtonWallet>Connect Wallet</ButtonWallet>
            </div>
        </div>
    )
}