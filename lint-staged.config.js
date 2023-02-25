// https://github.com/okonet/lint-staged
const scriptCommand = ['prettier --write', 'eslint --fix'];

module.exports = {
  '*.js': scriptCommand,
  '*.jsx': scriptCommand,
  '*.ts': scriptCommand,
  '*.tsx': scriptCommand,
  '*.md': 'prettier --list-different',
};
