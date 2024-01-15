module.exports = {
	env: {
		es2021: true,
		node: true
	},
	parser: '@babel/eslint-parser',
	extends: ['eslint:recommended', 'prettier'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		presets: ['@babel/preset-env']
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': 1
	}
}
