---
pageClass: "rule-details"
sidebarDepth: 0
title: "vue-scoped-css/no-unused-keyframes"
description: "disallow `@keyframes` which don't use in Scoped CSS"
---
# vue-scoped-css/no-unused-keyframes

> disallow `@keyframes` which don't use in Scoped CSS

- :gear: This rule is included in all of `"plugin:vue-scoped-css/recommended"`, `"plugin:vue-scoped-css/vue3-recommended"` and `"plugin:vue-scoped-css/all"`.

## :book: Rule Details

This rule reports `@keyframes` is not used in Scoped CSS.

<eslint-code-block :rules="{'vue-scoped-css/no-unused-keyframes': ['error']}">

```vue
<style scoped>
.item {
    animation-name: slidein;
}

/* ✗ BAD */
@keyframes unused-animation {
}

/* ✓ GOOD */
@keyframes slidein {
}
</style>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## Implementation

- [Rule source](https://github.com/future-architect/eslint-plugin-vue-scoped-css/blob/master/lib/rules/no-unused-keyframes.ts)
- [Test source](https://github.com/future-architect/eslint-plugin-vue-scoped-css/blob/master/tests/lib/rules/no-unused-keyframes.js)