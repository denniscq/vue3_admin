module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        // https://eslint.bootcss.com/docs/rules/
        "no-var": "error",
        "no-multiple-empty-lines": ["warn", { max: 1 }],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-unexpected-multiline": "error",
        "no-useless-escape": "off",

        // https://typescript-eslint.io/rules/
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/semi": "off",

        // https://eslint.vuejs.org/rules/
        "vue/multi-word-component-names": "off",
        "vue/script-setup-uses-vars": "error",
        "vue/no-mutating-props": "off",
        "vue/attribute-hyphenation": "off"
    }
}
