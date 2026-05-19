import { describe, it, expect } from "vitest"
import { sidebarGroups } from "@/lib/navigation"

describe("sidebar navigation", () => {
    it("keeps correct sidebar groups and hierarchy", () => {
        const groupTitles = sidebarGroups.map((g) => g.title)
        expect(groupTitles).toEqual(["Overview", "Asset Management", "Administration", "Settings"])
    })
})