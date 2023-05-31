# City Bikes App

This is a city bike app for viewing city bike rides and stations, based on open data. The Backend is built with .NET Core Web API, using Dapper with SQL Server database. The frontend is built with React using Typescript.
Thanks to Solita for the project idea. 

## Running the Backend

In order to build the backend, run the **BikeBack.sln** file in the **BikeBack** folder. Then, in Visual Studio (or other IDE) define a connection string in the **appsettings.json** file, like so:   
"ConnectionStrings": {
    "Default": ”put your connection string here”
  } 
After that, right click on the **PollsDB** project and select **publish**. Define a *SQL Server database connection and database name as in your connection string. This will initiate the database. 
Now open and run the **SeedData.sln** project from the **SeedData** folder, in order to seed the database with bike data. Finally, **build** the project and **run**. Swagger API will open in a browser at https://localhost:5001/.

## Running the Frontend

For the frontend, navigate to the directory and run npm install. NPM package manager required. Then run: **npm start** to start the project. There are also a few e2e tests, which can be run with a command: **npm run cypress**. Both the backend and frontend need to be running while running the tests. 

## The data

The journey data is owned by City Bike Finland and can be found at HSL open data: https://www.hsl.fi/en/hsl/open-data </br>
The station data can be found at Avoin Data: https://www.avoindata.fi/data/en_GB/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902
