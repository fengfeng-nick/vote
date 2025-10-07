"use client"

import { JSX, RefObject } from "react";
import { FormType } from "./form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FieldTitle } from "./field-title";
import { FieldDescription } from "./field-description";
import { FieldOptions } from "./field-options";

export {  Provider as ProposalAddFormProvider } from "./provider";

interface Props {
    className?: string;
    formRef?: RefObject<HTMLFormElement | null>;
    onSubmit: (data: FormType) => void;
}

export function ProposalAddForm({ className, formRef, onSubmit }: Props): JSX.Element {
    const form = useFormContext<FormType>()
    
    return (
        <form ref={formRef} className={cn("space-y-4", className)} onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e).catch(console.error)
        }}>
            <FieldTitle />
            <FieldDescription />
            <FieldOptions />
        </form>
    )
}