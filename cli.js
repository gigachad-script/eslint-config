#!/usr/bin/env node

/* eslint-disable no-console */

const { writeFile, access, mkdir } = require('fs/promises');
const prettier = require('prettier');

const config = require('./cli_config.json');

async function setup() {
  const reactArg = process.argv[2] || null;

  if (reactArg) {
    if (reactArg !== '--react') {
      console.log('🤔 INVALID SWITCH (DID YOU MEAN TO ADD --react ?) 🤔');
      return;
    }
    config.eslintRc.contents.extends = ['@gigachad-script/eslint-config/react'];
  }

  try {
    await access('./.vscode');
  } catch (e) {
    await mkdir('./.vscode');
  }

  try {
    const files = Object.keys(config).map((k) => config[k]);
    await Promise.all(
      files.map((file) =>
        writeFile(
          file.path,
          file.path.includes('editorconfig')
            ? file.contents
            : prettier.format(JSON.stringify(file.contents), {
                parser: 'json-stringify',
              }),
          { encoding: 'utf-8' },
        ),
      ),
    );

    console.log('💪 GIGACHAD-SCRIPT SETUP COMPLETE 💪');
  } catch (e) {
    console.log("😫 THERE WAS A PROBLEM BUT I'M TOO LAZY TO WORK ON IT 😫");
    console.log(e);
  }
}

setup();
