module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.ts', '.native.tsx', '.d.ts'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',

    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-native', 'promise', 'import', 'eslint-comments'],
  rules: {
    // this next group is disabled because they duplicate checks performed by
    // Typescript.
    //
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#my-linting-feels-really-slow
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',

    'no-console': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'dot-notation': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'prefer-template': 'error',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',

    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface', 'typeAlias', 'typeParameter'],
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/prefer-optional-chain': 'error',

    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/no-access-state-in-setstate': 'error',
    'react/no-danger': 'error',
    'react/self-closing-comp': ['error', { html: true }],
  },
}
