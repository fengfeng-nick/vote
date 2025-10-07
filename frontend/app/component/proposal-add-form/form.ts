import z from "zod";
import { DateTime } from "luxon";
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    options: z.array(z.object({
        value: z.string().trim(),
    })),
    // startDate: z.number(),
    // endDate: z.number(),
})

export type FormType = z.infer<typeof formSchema>

export const iniialValues: FormType = {
    title: "",
    description: "",
    options: [{ value: "" }, { value: "" }],
    // startDate: DateTime.now(),
    // endDate: DateTime.now().plus({ days: 1 }).second,
}

export function useValidateForm(args: Omit<UseFormProps<FormType>, "resolver">): UseFormReturn<FormType> {
    const { title, description } = formSchema.shape
    const validator = z.object({
        title: title.min(1, { message: "标题不能为空" }),
        description: description.min(1, { message: "描述不能为空" }),
        options: z.array(z.object({
            value: z.string().trim().min(1, { message: "选项不能为空" })
        }))
        // startDate: startDate.min(DateTime.now().second, { message: "Start date must be in the future" }),
        // endDate: endDate.min(DateTime.now().second, { message: "End date must be in the future" })
    })
    // .refine((data) => data.endDate < data.startDate, { message: "End date must be after start date" })

    return useForm<FormType>({
        resolver: zodResolver(validator),
        ...args,
        mode: "onSubmit"
    })
}
