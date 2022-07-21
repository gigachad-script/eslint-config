const {
  parser,
  parserOptions,
  extend,
  plugins,
  env,
  settings,
  rules,
} = require('./common_config.json');

module.exports = {
  parser,
  parserOptions,
  extends: [...extend.react],
  plugins,
  env: env.react,
  settings: settings.react,
  rules,
};
