#!/usr/bin/env node

/* eslint-disable no-console */

const { writeFile, access, mkdir } = require('fs/promises');
const prettier = require('prettier');

async function setup() {
  const reactArg = process.argv[2] || null;

  if (reactArg && reactArg !== '--react') {
    console.log('🤔 INVALID SWITCH (DID YOU MEAN TO ADD --react ?) 🤔');
    return;
  }

  const writeOptions = { encoding: 'utf-8' };
  const vscodeDir = './.vscode';

  const eslintFile = './.eslintrc.jsonc';
  const prettierFile = './.prettierrc.jsonc';
  const vscodeExtensionsFile = `${vscodeDir}/extensions.json`;
  const vscodeSettingsFile = `${vscodeDir}/settings.json`;

  const eslintExtend = reactArg
    ? '@gigachad-script/eslint-config/react'
    : '@gigachad-script';
  const eslintContents = prettier.format(
    JSON.stringify({
      extends: [eslintExtend],
      parseOptions: {
        project: './tsconfig.json',
      },
    }),
    { parser: 'json-stringify' },
  );
  const prettierContents = '"@gigachad-script/eslint-config/prettier"';
  const vscodeExtensionsContents = prettier.format(
    JSON.stringify({
      recommendations: ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode'],
    }),
    {
      parser: 'json-stringify',
    },
  );
  const vscodeSettingsContents = prettier.format(
    JSON.stringify({
      '[css][html][json][jsonc][javascript][javascriptreact][typescript][typescriptreact][yaml]':
        {
          'editor.defaultFormatter': 'esbenp.prettier-vscode',
        },
      'editor.codeActionsOnSave': {
        'source.fixAll': true,
      },
      'editor.formatOnPaste': true,
      'editor.formatOnSave': true,
      'editor.formatOnType': true,
      'eslint.alwaysShowStatus': true,
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
      ],
    }),
    {
      parser: 'json-stringify',
    },
  );

  try {
    await access(vscodeDir);
  } catch (e) {
    await mkdir(vscodeDir);
  }

  try {
    await writeFile(eslintFile, eslintContents, writeOptions);
    await writeFile(prettierFile, prettierContents, writeOptions);
    await writeFile(
      vscodeExtensionsFile,
      vscodeExtensionsContents,
      writeOptions,
    );
    await writeFile(vscodeSettingsFile, vscodeSettingsContents, writeOptions);

    console.log('💪 GIGACHAD-SCRIPT SETUP COMPLETE 💪');
  } catch (e) {
    console.log("😫 THERE WAS A PROBLEM BUT I'M TOO LAZY TO WORK ON IT 😫");
  }
}

setup();
