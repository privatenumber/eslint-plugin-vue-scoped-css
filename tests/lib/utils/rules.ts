import assert from "assert"
import path from "path"
import fs from "fs"

import { collectRules, rules as allRules } from "../../../lib/utils/rules"

/**
 * @returns {Array} Get the list of rules placed in the directory.
 */
function getDirRules() {
    const rulesRoot = path.resolve(__dirname, "../../../lib/rules")
    const result = fs.readdirSync(rulesRoot)
    const rules: { [key: string]: any } = {}
    for (const name of result) {
        const ruleName = name.replace(/\.ts$/u, "")
        const ruleId = `vue-scoped-css/${ruleName}`
        const rule = require(path.join(rulesRoot, name))
        rules[ruleId] = rule
    }
    return rules
}

const dirRules = getDirRules()

describe("Check if the struct of all rules is correct", () => {
    it("rule count equals (collectRules)", () => {
        const collect = collectRules()

        const deprecatedRules = allRules.filter((r) => r.meta.deprecated)
        assert.ok(
            Object.keys(collect).length + deprecatedRules.length ===
                Object.keys(dirRules).length,
            `Did not equal the number of rules. expect:${
                Object.keys(dirRules).length
            } actual:${Object.keys(collect).length}`,
        )
    })
    it("rule count equals (rules)", () => {
        assert.ok(
            allRules.length === Object.keys(dirRules).length,
            `Did not equal the number of rules. expect:${
                Object.keys(dirRules).length
            } actual:${allRules.length}`,
        )
    })

    for (const rule of allRules) {
        it(rule.meta.docs?.ruleId || "", () => {
            assert.ok(Boolean(rule.meta.docs.ruleId), "Did not set `ruleId`")
            assert.ok(
                Boolean(rule.meta.docs.ruleName),
                "Did not set `ruleName`",
            )
            assert.ok(
                Boolean(dirRules[rule.meta.docs?.ruleId || ""]),
                "Did not exist rule",
            )
        })
    }
})
