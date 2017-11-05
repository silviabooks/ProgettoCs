# Your Personal Blog
Project for "Modern concurrent data-oriented applications in C#" course @ Università di Catania, LM Ingegneria Informatica, a.a. 2017/2018
This application lets you create a personal blog, where you can create and manage your posts. Other people can also add comments to the posts in the application in total freedom.

The technologies used to develop this application are: C#, MongoDB, Angular 2 and Bootstrap.

For the data access to the MongoDB NoSQL database, a series of classes have been created: a __context__ (where the DB and the "Post" and "Comment" collections are created), a __repository__ and the related interface (in which all the methods for the data access are defined) and two __controllers__ (respectively for the Post and the Comment classes) in which the REST API are created. 

## Requirements
* Visual Studio
* .NET Core
* MongoDB
* Angular 2
* Robo 3T (a GUI for MongoDB, optional)

## Initialization
You have to compile and run the application with IIS service. Once the application is started, to initialize the database with some sample data, go to http://localhost:PORTNUMBER/api/admin/initialize.

Have fun!
