#!/usr/bin/env node
let program = require('commander')

program.command('init [projectname] [templatename]')
    .version('0.0.1', '-v, --version')
    .description('create a new project')
    .option('-t --template [template]', 'specify template application')
    // .option('-n, --name <name>', 'your name', 'GK')
    // .option('-a, --age <age>', 'your age', '22')
    // .option('-e, --enjoy [enjoy]')
    .action(function(projectname, templatename, options) {
    	// console.log(options.template)
    	// console.log(dir, options.enjoy);
    	require('./libs/generator.js')(projectname, templatename);
    	
    });
// 这段代码必须加上，否则不执行上面的command命令，进而不执行action	
program.parse(process.argv)
