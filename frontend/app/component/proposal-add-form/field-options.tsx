import { JSX, useMemo } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormType } from "./form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function FieldOptions(): JSX.Element {
    const form = useFormContext<FormType>()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options"
    })

    return (
        <div className="space-y-2">
            <div className="text-sm font-medium">选项</div>
            <div className="space-y-2">
                {
                    fields.map((field, index) => (
                        <div className="flex gap-2" key={field.id}>
                            <FormField control={form.control} name={`options.${index}.value`} render={(f) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input value={f.field.value} onChange={(e) => {
                                                f.field.onChange(e)
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />

                            <Button variant="secondary" size="icon" onClick={() => remove(index)} type="button" disabled={fields.length <= 2}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))
                }
                <Button variant="outline" onClick={() => {
                    append({
                        value: ""
                    })
                }} type="button">添加选项</Button>
            </div>
        </div>
    )
}