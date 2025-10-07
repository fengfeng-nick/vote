import { JSX, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';


interface Props extends React.ComponentProps<typeof ConnectButton> {
    children: ReactNode
}

export function ButtonWallet({ children, ...props }: Props): JSX.Element {
    return (
        <ConnectButton {...props}>
            {children}
        </ConnectButton>
    )
}