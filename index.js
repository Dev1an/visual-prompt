const applescript = require('node-osascript')
const os = require('os');
const spawn = require('child_process').spawn

function prompt(message, title, defaultAnswer, callback) {
	const platform = os.platform()
	if (platform == 'darwin') {
		applescript.execute(
			'display dialog message default answer defaultAnswer',
			{
				message: message,
				defaultAnswer: defaultAnswer
			},
			function(error, result) {
				console.log(error, result)
			}
		)
	} else if (platform == 'win32') {
		var stdout  = '',
			stderr  = ''

		var childProcess = spawn (
			"cscript",
			[join(__dirname, 'msgbox.vbs'), message, title, defaultAnswer]
		)

		childProcess.stdout.on('data', function(data){
		  stdout += data.toString();
		})

		childProcess.stderr.on('data', function(data){
		  stderr += data.toString();
		})

		childProcess.on('exit', function(code){
		  cb && callback();
		})

	} else {
		console.error('platform not supported')
	}
}

prompt('Hello world', 'give answer', 'default answer')