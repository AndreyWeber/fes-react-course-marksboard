module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "arrowFunctions": true,
            "binaryLiterals": true,
            "blockBindings": true,
            "classes": true,
            "defaultParams": true,
            "destructuring": true,
            "experimentalObjectRestSpread": true,
            "forOf": true,
            "generators": true,
            "modules": true,
            "objectLiteralComputedProperties": true,
            "objectLiteralDuplicateProperties": true,
            "objectLiteralShorthandMethods": true,
            "objectLiteralShorthandProperties": true,
            "octalLiterals": true,
            "regexUFlag": true,
            "regexYFlag": true,
            "spread": true,
            "superInFunctions": true,
            "templateStrings": true,
            "unicodeCodePointEscapes": true,
            "globalReturn": true,
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": false
    },
    "plugins": [
        "babel",
        "flowtype",
        "jsx-a11y",
        "react"
    ],
    "rules": {
        "quotes": ["error", "single", { "avoidEscape": true }],
        "semi": ["error", "always"],
        "eol-last": "error",
        "react/jsx-uses-vars": "error",
        "react/forbid-component-props": ["error", {
            "forbid": []
        }],
        "react/forbid-prop-types": "error",
        "react/sort-prop-types": ["error", {
            "callbacksLast": true,
            "ignoreCase": true,
            "requiredFirst": false
        }],
        "react/jsx-sort-props": ["error", {
            "callbacksLast": true,
            "ignoreCase": true
        }]
    }
};
