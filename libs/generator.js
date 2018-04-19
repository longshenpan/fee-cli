const Yeoman = require('yeoman-environment');
const exec = require('child_process').exec;
const _ = require('lodash');
const Path = require('path');

let env = Yeoman.createEnv();

module.exports = (dirname, template) => {
	let appname = dirname;
	let inCurrentDir = false;
	let appCommand = template || 'webapp';
	let generator = 'generator-' + template;

	exec('npm root -g', {async: true, silent: true}, (code, stdout) => {
		let npmRoot = _.trim(stdout);// 使用trim去掉返回值的空白行
		let generatorPath = Path.posix.join(npmRoot, generator);
		try {
			// console.log(npmRoot, generatorPath);
			// require.resolve(generatorPath);
			env.register(require.resolve(generatorPath), appCommand);
			env.run(`${appCommand} ${appname} -c`);
			console.log(npmRoot, generatorPath);
		}catch(e) {
			console.log(e);
			exec(`npm install -g ${generator}`, {
				async: true,
				silent: true
			}, (code) => {
				if (code !== 0) {
					process.exit();
				}
				env.register(require.resolve(generatorPath), appCommand);
				env.run(`${appCommand} ${appname} -c`);
			})
		}
		
	});
	
}