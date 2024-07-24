import globals from "globals";
import js from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js"

export default [
    {
        ...js.configs.recommended,
        ...reactRecommended,
        "rules": {
            "indent": [
                "off",
                4
            ],
            "quotes": [
                "error",
                "double"
            ],
            "linebreak-style": [
                "error",
                "windows"
            ],
            "semi": [
                "error",
                "always"
            ],
            "react/prop-types": ["warn"]
        },
        languageOptions: {
            ...reactRecommended.languageOptions,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser
            }
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];