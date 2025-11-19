import naverpay from '@naverpay/eslint-config'

export default [
    {
        ignores: ['**/dist/**'],
    },
    ...naverpay.configs.react,
    ...naverpay.configs.packageJson,
    {
        rules: {
            'no-console': 'off',
            'react/jsx-handler-names': 'off',
        },
    },
]
