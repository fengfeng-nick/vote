import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormType } from "./form";
import { useFormContext } from "react-hook-form";
import { JSX } from "react";
import { Input } from "@/components/ui/input";

export function FieldTitle(): JSX.Element {
    const form = useFormContext<FormType>()
    
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        >
        </FormField>
    )
}