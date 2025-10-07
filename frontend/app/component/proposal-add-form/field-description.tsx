import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormType } from "./form";
import { useFormContext } from "react-hook-form";
import { JSX } from "react";
import { Textarea } from "@/components/ui/textarea";

export function FieldDescription(): JSX.Element {
    const form = useFormContext<FormType>()

    return (
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel aria-required>描述</FormLabel>
                    <FormControl>
                        <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        >
        </FormField>
    )
}