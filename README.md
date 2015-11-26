# Usage

```js
const prompter = require('visual-prompt')
prompter.prompt('Message here', 'Title here', 'Default answer here', function(error, result) {
	if (error) {
		console.log('An error has occured')
		console.log(error)
		return
	}
	console.log(result)
})
```