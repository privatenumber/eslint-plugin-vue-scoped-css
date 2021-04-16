import { RuleTester } from "eslint"
import semver from "semver"
import rule = require("../../../lib/rules/require-scoped")

const parserVersion = require("vue-eslint-parser/package.json").version

const tester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
    },
})

tester.run("require-scoped", rule as any, {
    valid: [
        `
        <template>
        </template>
        <style scoped>
        </style>
        `,
        `
        <template>
        </template>
        `,
        {
            code: `
            <template>
            </template>
            <style>
            </style>
            `,
            options: ["never"],
        },
        {
            code: `
            <template>
            </template>
            <style module>
            </style>
            `,
            options: [
                "always",
                {
                    acceptCssModules: true,
                },
            ],
        },
        {
            code: `
            <template>
            </template>
            <style module="$style">
            </style>
            `,
            options: [
                "always",
                {
                    acceptCssModules: true,
                },
            ],
        },
        {
            code: `
            <template>
            </template>
            <style module>
            </style>
            `,
            options: ["never"],
        },
    ],
    invalid: [
        {
            code: `
            <template>
            </template>
            <style>
            </style>
            `,
            errors: [
                {
                    messageId: "missingScoped",
                    line: 4,
                    column: 13,
                    endLine: 4,
                    endColumn: 20,
                    suggestions: [
                        {
                            desc: "Add `scoped` attribute.",
                            output: `
            <template>
            </template>
            <style scoped>
            </style>
            `,
                        },
                    ],
                },
            ],
        },
        {
            code: `
            <template>
            </template>
            <style />
            `,
            errors: [
                {
                    messageId: "missingScoped",
                    line: 4,
                    column: 13,
                    endLine: 4,
                    endColumn: 22,
                    suggestions: [
                        {
                            desc: "Add `scoped` attribute.",
                            output: `
            <template>
            </template>
            <style  scoped/>
            `,
                        },
                    ],
                },
            ],
        },
        ...(semver.satisfies(parserVersion, ">=7.0.0")
            ? [
                  {
                      code: `
                        <script>
                        </script>
                        <style />
                        `,
                      errors: [
                          {
                              messageId: "missingScoped",
                              line: 4,
                              column: 25,
                              endLine: 4,
                              endColumn: 34,
                          },
                      ],
                  },
              ]
            : []),
        {
            code: `
            <template>
            </template>
            <style scoped>
            </style>
            `,
            options: ["never"],
            errors: [
                {
                    messageId: "forbiddenScoped",
                    line: 4,
                    column: 20,
                    endLine: 4,
                    endColumn: 26,
                    suggestions: [
                        {
                            desc: "Remove `scoped` attribute.",
                            output: `
            <template>
            </template>
            <style >
            </style>
            `,
                        },
                    ],
                },
            ],
        },
        {
            code: `
            <template>
            </template>
            <style module>
            </style>
            `,
            options: ["always"],
            errors: [
                {
                    messageId: "missingScoped",
                    line: 4,
                    column: 13,
                    endLine: 4,
                    endColumn: 27,
                    suggestions: [
                        {
                            desc: "Change `module` attribute to `scoped`.",
                            output: `
            <template>
            </template>
            <style scoped>
            </style>
            `,
                        },
                    ],
                },
            ],
        },
        {
            code: `
            <template>
            </template>
            <style module>
            </style>
            `,
            options: [
                "never",
                {
                    acceptCssModules: true,
                },
            ],
            errors: [
                {
                    messageId: "forbiddenModule",
                    line: 4,
                    column: 20,
                    endLine: 4,
                    endColumn: 26,
                    suggestions: [
                        {
                            desc: "Remove `module` attribute.",
                            output: `
            <template>
            </template>
            <style >
            </style>
            `,
                        },
                    ],
                },
            ],
        },
    ],
})
