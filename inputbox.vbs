Set objArgs = WScript.Arguments
messageText = objArgs(0)
messageTitle = objArgs(1)
defaultResponse = objArgs(2)
WScript.Echo(InputBox(messageText, messageTitle, defaultResponse))