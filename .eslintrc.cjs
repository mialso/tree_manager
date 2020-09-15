module.exports = {
    extends: ['airbnb', 'airbnb/hooks'],
    rules: {
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'quote-props': ['error', 'consistent'],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/extensions': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [1, { "extensions": [".tsx"] }],
    },
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
};
