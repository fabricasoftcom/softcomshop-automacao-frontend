const cypressPlugin = require("eslint-plugin-cypress");

module.exports = [
    {
        ignores: ["node_modules/**", "cypress/screenshots/**", "cypress/videos/**", "allure-report/", "allure-results/"], // Ignorar essas pastas
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            cypress: cypressPlugin,
        },
        rules: {
            "no-unused-vars": "error",
            "no-trailing-spaces": "error",
            "eol-last": ["error", "always"],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "no-console": "warn",
            "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
        },
    },
];
