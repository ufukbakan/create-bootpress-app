<h1 align="center"><img height=100 alt="bootpress" src="https://raw.githubusercontent.com/ufukbakan/bootpress/main/bootpress.svg" /></h1>
<p align="center">CLI tool to create a bootpres app.</p>

## How to use
```
npx create-bootpress-app your_project_name
```

## Optional parameters

### **-l, --language**
*Specifies template language. Valid values are: ts, js, typescript or javascript*

*Examples:*

*```npx create-bootpress-app tsproject -l ts```*

*```pnpm create bootpress-app tsproject -l ts```*

*```npx create-bootpress-app jsproject --language javascript```*

## Known issues:
- Coverage for Javascript template reports always 0%

## Release Notes 3.2.0:
- Added unit & integration tests with mocha, chai & supertest
- Added SWC support to JS template