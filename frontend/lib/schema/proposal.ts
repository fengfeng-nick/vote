import { z } from "zod"

export const proposalSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    options: z.array(z.string().trim()),
    startTime: z.bigint(),
    endTime: z.bigint(),
    exists: z.boolean(),
})

export type Proposal = z.infer<typeof proposalSchema>

export const proposalResultSchema = z.array(z.bigint())

export type ProposalResult = z.infer<typeof proposalResultSchema>

export const userVoteStatusSchema = z.boolean()

export type UserVoteStatus = z.infer<typeof userVoteStatusSchema>
