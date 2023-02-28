const process = require("process");

const majorNodeVersion = process.versions.node.split('.')[0];
console.log("Node version: " + majorNodeVersion);
if (majorNodeVersion < 10) {
    console.error('Express.js requires node version 10.X.X+ ');
    process.exit(1);
}

const { Command } = require('commander');
const program = new Command();

program
    .name("create-bootpress-app")
    .description("CLI tool to create a bootpress application")
    .version("1.0.0");

program.argument("<project_name>", "Project name");
program.option("-l, --language <lang>", "Language");
program.parse();

const { init } = require('./createBootpressApp');

init(program.args[0], program.opts());