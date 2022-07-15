#!/usr/bin/env node

const { writeFile } = require('fs/promises');
const prettier = require('prettier');

async function setup() {
  const writeOptions = { encoding: 'utf-8' };

  const eslintFile = './.eslintrc.json';
  const prettierFile = './.prettierrc.json';

  const eslintContents = prettier.format(
    JSON.stringify({
      extends: ['@chadscript'],
      parseOptions: {
        project: './tsconfig.json',
      },
    }),
    { parser: 'json-stringify' },
  );
  const prettierContents = '"@chadscript/eslint-config/prettier"';

  await writeFile(eslintFile, eslintContents, writeOptions);
  await writeFile(prettierFile, prettierContents, writeOptions);
}

setup();
