module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off'
  }
  // root: true,
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  // env: {
  //   browser: true
  // },
  // extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  // plugins: ['vue', 'prettier'],
  // rules: {
  //   'generator-star-spacing': 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'prettier/prettier': 'error'
  // }
}
