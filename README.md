# @gigachad-script/eslint-config

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gigachad-script/eslint-config/publish) ![npm (scoped)](https://img.shields.io/npm/v/@gigachad-script/eslint-config)

Linting and formatting for typescript chads

---

## what?

an uncompromising typescript and typescript-react eslint configurations with bonuses

![chadscript](chadscript.png)

this package includes:

* an extended, custom version of [airbnb's excellent guide](https://github.com/airbnb/javascript) working 100% with typescript (all dependencies are installed)

* a somewhat default-ish prettier configuration

* an also kind of standard editorconfig configuration

* vscode settings to provide seamless linting/formatting experience and the suggested extensions to do so

---

## why?

convenience, lazyness, to appease the forgotten gods of yore

---

## how?

> **❗️** install typescript and have a `tsconfig.json` file setup beforehand
`yarn add typescript -D && npx tsc --init` will do

### install

```bash
# you can use npm but why would you?
yarn add @gigachad-script/eslint-config -D
```

### configure

**automatically (recommented for NEW projects):**

```bash
# node, without react
npx chadsetup

# for react projects
npx chadsetup --react
```

**manually:**

create a `.eslintrc.json` file at root (or edit an existing one) adding the following to it:

(regular node projects)

```json5 {.line-numbers}
{
  "extends": [
    "@gigachad-script"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

(react projects)

```json5 {.line-numbers}
{
  "extends": [
    "@gigachad-script/eslint-config/react"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

create a `.prettierrc.json` file at root (or edit an existing one) adding the following to it:

```json5 {.line-numbers}
"@gigachad-script/eslint-config/prettier"
```

(optional) create a `.editorconfig` file at root (or edit an existing one) adding the following to it:

```editorconfig
root=true

[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
max_line_length = 80
```

***follwing steps only if using vscode:***

(optional) install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions from the link, searching through vscode's extension widget, or using the terminal:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

(optional) create `settings.json` inside a `.vscode` directory (or edit an existing one) adding the following to it:

```json5 {.line-numbers}
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
