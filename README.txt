------------------------
StageWood Test Application Installation Process
-------------------------

This applications was built using the following stack technologies:

React JS
GraphQL  
Prisma 2 ORM
MySQL
Nodejs
npm
Apollo Server


<--Server-->

1.  The Database

This application was originally developed for MySQL DBMS.
Included in the server directory there's a sql script named "stagewood_test.sql" that allows you to import the database structure into your MySQL instance.
The database structure is a really simple one it only contains:

	1 Database named stagewood_test
	1 Table named user
	
	Beware this script contains a "CREATE DATABASE" statement. You could just simply delete it from the file if unwanted.
	
	
	
2. Environmental variables

Make a copy of server/.env.example file  and name it .env

The main and only env variable the server app needs is the database URL for Prisma ORM database connection:

DATABASE_URL String

It generally consists of the following components:

User: The name of your database user
Password: The password for your database user
Host: The IP or domain name of the machine where your database server is running
Port: The port on which your database server is running
Database name: The name of the database you want to use

Example: mysql://root:password@localhost:3306/stagewood_test

It is not necessary to introspect the database as there’s a defined Prisma schema already for the db tables in the app.

3- Config Variables:

Make a copy of server/config.js.example and name it config.js  

It exports an object with 2 properties 
SALT: String  			//String for Adding Salt to Password Hashing
TOKEN_KEY: String		// String for generating encrypted jwt 


On both cases it could be any literal string you could think of, better make it long enough :D.


<--Client-->

1- Config Variables:

There's a config.js.example file inside client/test/src/ Make a copy in the same file path and name it config.js

It exports an object with 1 property.

endPointUri: "" // Endpoint URL for the Apollo Client Helper 

When running Apollo server locally it generally runs at : http://localhost:4000/

------------------------
StageWood Test Application Running Process
-------------------------
It is recommended to execute npm install to install all aplications dependency.

-Running Server
Open a command line 
go to  server root folder
cd server
run npm install || yarn install to install any missing dependencies
run   node index.js in  CLI
Once it is running it will ouput: Server ready at <URL>;



-Running Client
From a different command line  go to client's app root folder client/test/
cd client/test/

run npm install || yarn install to install any missing dependencies
Run npm start || yarn start 

It might open the app on browser automatically. 

It will also output the URL location where is running at in CLI, usually http://localhost:3000



