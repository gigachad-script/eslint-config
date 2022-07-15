# @chadscript/eslint-config

[![publish](https://github.com/chadscript/eslint-config/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/chadscript/eslint-config/actions/workflows/publish.yml) [![npm version](https://badge.fury.io/js/@chadscript%2Feslint-config.svg)](https://www.npmjs.com/package/@chadscript/eslint-config)

Linting and formatting for typescript chads

---

## what?

**uncompromising typescript (node and react) eslint configurations**

this package mainly extends [airbnb's excellent guide](https://github.com/airbnb/javascript), while disabling or tweaking a couple rules in order to become awesome

includes [this enhancement on top of it to allow typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript), and a generic jest linting configuration

rules read for usage with typescript paths setup in tsconfig.json (eslint will resolve import paths without issues)

it also exposes a somewhat standard prettier configuration that can be extended

finally, it includes a setup script to create vscode, eslint, and prettier configuration files in one go

---

## why?

convenience?

---

## how?

**install**:

```bash
yarn add @chadscript/eslint-config -D
```

**configure**:

this can be done in one of two ways

1. automatically, by running `npx chadsetup` (`npx chadsetup --react` if it's a react project) on your terminal and install the recommended vscode extensions if you are using it

2. manually, by being lame and creating the config files yourself, as described below:

    * create `.eslintrc.json` file and fill it with

        ```json
        {
          "extends": [
            "@chadscript" // "@chadscript/eslint-config/react" if it's a react project
          ],
          "parseOptions": {
            "project": "./tsconfig.json"
          }
        }
        ```

    * create `.prettierrc.json` file and fill it with

        ```json
        "@chadscript/eslint-config/prettier"
        ```

        ***follwing steps only if using vscode:***

    * install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions

    * create `settings.json` inside a `.vscode` directory and fill it with

        ```json
        {
          "[css][html][json][jsonc][javascript][javascriptreact][typescript][typescriptreact][yaml]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
          },
          "editor.codeActionsOnSave": {
            "source.fixAll": true
          },
          "editor.formatOnPaste": true,
          "editor.formatOnSave": true,
          "editor.formatOnType": true,
          "eslint.alwaysShowStatus": true,
          "eslint.validate": [
            "javascript",
            "javascriptreact",
            "typescript",
            "typescriptreact"
          ]
        }
        ```

---

## disabled/tweaked rules

### no-underscore-dangle

this [rule](https://eslint.org/docs/rules/no-underscore-dangle) just makes it awkward to deal with mongodb models (which have a `_id` field by default)

### import/prefer-default-export

this [rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md) spoils [tree-shaking](https://webpack.js.org/guides/tree-shaking/) (in some projects) and marks the [exporting of cloud functions that require a named export](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) as incorrect

### class-methods-use-this

this [rule](https://eslint.org/docs/rules/class-methods-use-this) errors perfectly valid NestJS controllers and it just doesn't make a whole lot of sense IMO

### jest/expect-expect

this [rule](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md) warns about jest tests without an `expect` call, which is the case when using suits like [supertest](https://www.npmjs.com/package/supertest), so it was tweaked to allow the usual supertest format of `request.**.expect`
