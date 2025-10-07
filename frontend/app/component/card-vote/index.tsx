import { JSX } from "react"
import { Props, PropsContext } from "./context"
import { Render } from "./render"

export function CardVote(props: Props): JSX.Element {
    return (
        <PropsContext.Provider value={{...props}}>
            <Render />
        </PropsContext.Provider>
    )
}