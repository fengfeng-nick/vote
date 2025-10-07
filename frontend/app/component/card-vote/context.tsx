"use client"

import { createContext, useContext } from "react"

export interface Props {
    title: string
    description: string
    options: string[]
    startTime: bigint
    endTime: bigint
    exists: boolean
}

export const PropsContext = createContext<Props>(undefined!)

export function useProps(): Props {
    return useContext(PropsContext)
}
