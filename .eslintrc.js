module.exports = {
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended'],
  globals: {
    JSX: 'readonly',
  },
  rules: {
    'no-unused-vars': [
      1,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: ['app/*', 'pages/api/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};