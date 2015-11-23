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

		var childProcess = spawn (
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
			console.log("position", stdout.search("\r\n\r\n"))
			const result = {
				'text returned': stdout.substr(stdout.search("\r\n\r\n") + 4, -2)
			}
			var error;
			if (stderr.length > 0) error = stderr
			callback && callback(error, result);
		})

	} else {
		console.error('platform not supported')
	}
}

prompt('Hello world', 'give answer', 'default answer', function(error, result) {
	console.log(error, result)
})