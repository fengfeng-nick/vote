"use client"

import { JSX, ReactNode } from "react";
import { iniialValues, useValidateForm } from "./form";
import { Form } from "@/components/ui/form";

interface Props {
    children: ReactNode
}

export function Provider({ children }: Props): JSX.Element {
    const form = useValidateForm({
        defaultValues: {
            ...iniialValues
        }
    })

    return (
        <Form {...form}>
            {children}
        </Form>
    )
}