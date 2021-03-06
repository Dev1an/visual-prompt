const applescript = require('node-osascript')
const os = require('os');
const spawn = require('child_process').spawn
const join = require('path').join

function prompt(message, title, defaultAnswer, callback) {
	const platform = os.platform()
	if (platform == 'darwin') {
		applescript.execute(
			'display dialog message default answer defaultAnswer',
			{
				message: message,
				defaultAnswer: defaultAnswer
			},
			callback
		)
	} else if (platform == 'win32') {
		var stdout  = '',
			stderr  = ''

		var childProcess = spawn(
			"cscript",
			[join(__dirname, 'inputbox.vbs'), message, title, defaultAnswer]
		)

		childProcess.stdout.on('data', function(data){
			stdout += data.toString();
		})

		childProcess.stderr.on('data', function(data){
			stderr += data.toString();
		})

		childProcess.on('exit', function(code){
			const result = {
				'text returned': stdout.slice(stdout.search("\r\n\r\n") + 4, -2)
			}
			var error;
			if (stderr.length > 0) error = stderr
			callback && callback(error, result);
		})

	} else if (platform == 'linux') {
		var stdout  = '', stderr  = ''
		var childProcess = spawn(
			"zenity",
			['--entry', '--title=' + title, '--text=' + message, '--entry-text=' + defaultAnswer]
		)

		childProcess.stdout.on('data', function(data){
			stdout += data.toString();
		})

		childProcess.stderr.on('data', function(data){
			stderr += data.toString();
		})

		childProcess.on('exit', function(code){
			const result = {
				'text returned': stdout.slice(0, -1),
				'button returned': 'OK'
			}
			var error;
			if (stdout.length == 0) error = new Error('The user canceled the operation')
			callback && callback(error, result);
		})

    } else {
		console.error('platform not supported')
	}
}

module.exports.prompt = prompt
