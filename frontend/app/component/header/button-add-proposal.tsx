"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { JSX, useRef, useState } from "react";
import { ProposalAddForm, ProposalAddFormProvider } from "@/app/component/proposal-add-form";
import { useMutation } from "@tanstack/react-query";
import { FormType } from "@/app/component/proposal-add-form/form";
import { Spinner } from "@/components/ui/spinner";
import { useWriteContract } from "wagmi";
import { voteAbi } from "@/abi/vote";
import { toast } from "sonner";

export default function ButtonAddProposal(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null);
    const { writeContractAsync } = useWriteContract()
    const [open, setOpen] = useState(false)

    const { mutate, isPending } = useMutation({
        async mutationFn(formData: FormType) {
            const { title, description, options } = formData
            try {
                const res = await writeContractAsync({
                    abi: voteAbi,
                    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                    functionName: "createProposal",
                    args: [title, description, options.map((o) => o.value)],
                    chainId: 31337,
                })
            } catch (error) {
                console.error(error)
            }
        },
        onSuccess: () => {
            toast.success("提案提交成功")
            setOpen(false)
        }
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>新增提案</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>新增提案</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <ProposalAddFormProvider>
                    <ProposalAddForm formRef={formRef} onSubmit={mutate} />
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">取消</Button>
                            </DialogClose>
                            <Button type="button" onClick={() => {
                                formRef.current?.requestSubmit()
                            }} disabled={isPending}>{isPending ? <Spinner /> : "提交"}</Button>
                        </div>
                    </DialogFooter>
                </ProposalAddFormProvider>

            </DialogContent>
        </Dialog>
    )
}