import { atom } from "jotai"

export const isMobileSidebarOpenAtom = atom<boolean>(false)
export const isChatbotOpenAtom = atom<boolean>(false)
export const lastNonSettingsRouteAtom = atom<string>("/dashboard")
