module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2],
    'max-len': ['error', { code: 80 }],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'no-console': 'error',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false
      }
    ]
  }
};
