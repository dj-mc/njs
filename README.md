# node-eg

More (unorganized) notes on how to build servers with nodejs.

## debug node.js

`debugger;` in your code.  
`node inspect script.js` in the cl.

## dotenv

`npm i -D dotenv`  
Store secrets, port numbers, api keys, etc. in  
`/${workspaceFolder}/.env` &larr; `SECRET="shh"`  
Get your secrets with  
`import dotenv from 'dotenv';`  
`dotenv.config();`  
`let secret = process.env.SECRET;`

## reclaim node web server port

Get the process id  
`lsof -t -i:8080` then `kill -9 <pid>`  
One-liner: `kill -9 $(lsof -t -i:8080)`  
Or kill node's process  
`pkill -f node`

## --experimental-json-modules

You will need the latest version of node (16.10.0+) to run `n-api.js`.  
I'm using ES6 modules with json as a mock db api, which means we need the `--experimental-json-modules` flag to support importing json files.  
e.g. `nodemon --experimental-json-modules n-api.js`

## curl api requests

Curl commands for `restful.js`:  
`curl http://localhost:8080/tshirt`  
or specifically: `curl -X GET http://localhost:8080/tshirt`  
`curl -X POST http://localhost:8080/tshirt/23 -H 'Content-Type: application/json' -d '{"logo":"$"}'`

Curl commands for `n-api.js`:  
`curl -X GET http://localhost:8080/api/products/3`  
`curl -X POST http://localhost:8080/api/products -H 'Content-Type: application/json' -d '{"name": "foo", "description": "bar", "price": 4.20}'`  
`curl -X PUT 'http://localhost:8080/api/products/3' -H 'content-type: application/json' -d '{"name": "my new name", "description": "my new desc", "price": 6.66}'`  
`curl -X DELETE http://localhost:8080/api/products/3`
