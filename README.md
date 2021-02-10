# ssl_secure_server
This Program consumes command line arguments while starting the server. Eg. node server.js https 4000 (argument can be of any format, ie oprt number first or http/https first).

Server is build using Typescript and compiled against es5 Javascript.

JS_Dir Folder is created when 'npm run build' is executed.

To ignite the server cd to the Created JS_Dir folder and enter CLI commonds.

Server can be initiated in two ways, HTTP(secureless), HTTPS(secured).

Type of initiation can be decided by the arguments passed in the command line. 

Any invalid type will start the server with 'http', with default port 3000.

When server is initialized with 'https', secure server is initialized with self-signed ssl certificate(not for external use than localhost).

Also when started the server with https, user get to view the list of associated cert details and also can download the server ssl certificates.

The appropriate routes will be displayed when server is begin.

If user started the server with http and try to access certificate details. He/She will be restrcited to do so,





