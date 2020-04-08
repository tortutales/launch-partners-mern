module.exports = {
    "extends": "airbnb-base",
    "ignorePatterns": ["node_modules/"],
    "rules": {
        "camelcase": [
            "error",
            { "ignoreDestructuring": true }
        ],
        "comma-dangle": ["error", "never"],
        "function-paren-newline": [
            "error",
            "consistent"
        ],
        "implicit-arrow-linebreak": "off",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": "off",
        "max-len": [
            1,
            120,
            2,
            {
                "ignoreComments": true
            }
        ],
        "no-undef": "off",
        "no-underscore-dangle": [
            "error",
            { "allow": ["_doc"] }
        ],
        "no-case-declarations": 0,
        "no-confusing-arrow": 0,
        "no-empty": [
            "error",
            {
                "allowEmptyCatch": true
            }
        ],
        "no-param-reassign": [
            "error",
            {
                "props": false
            }
        ],
        "no-shadow": "off",
        "prefer-object-spread": 0,
    }
};
