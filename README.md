# TalentProject (TlProject)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.1. 
By Shady Yahia

## For hosting the application on IIS, please do the following steps:

1- Extract the "dist.zip" into a folder.<br />
2- Create new web site on IIS and make the physical path refers to the extracted folder distination.<br />
3- give the web site an application pool with enough permissions to access all local files, let's say use account "Local System".<br />
and the you can browse using the IIS web site now.<br />


## For hosting the application on light http-server, please do the following steps:

1- Make sure that you have NodeJS installed on your machine.<br /> 
2- Extract "dist.zip" into a folder and name it any name, Ex: "Folder1". <br />
3- Using CMD go to the location of the "Folder1". <br />
4- Run  npm install http-server -g. <br />
5- Then run http-server. <br />

This last command will serve all the files in your folder. you can check the terminal what ip-address and port you can use to access the application. Now open up your browser and type ip-adress:port/index.html


## For running the application in development mode:
1- Copy all files in one folder, name it tlProject. <br />
2- Open cmd and go to the folder, then Install angular Cli using : npm install -g @angular/cli.<br />
2- Run npm install in the tlProject folder.<br />
3- Run ng build in the same folder and make sure that build succeeds.<br />
Note: If the build failed for missing package, you can install using npm install <package>  <br />
4- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.<br />

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Features:
1- Welcome screen 
2- Quick search for searching for talents and groups in the same search box.
3- All talents in one  list , All Groups in one list from the top navigation bar.
4- Delete talent or a group.
5- Adding new talent or a group.
6- Validation if a group has at least one talent , it can't be deleted.
7- A New Group must have at least one talent before creating it.
8- Validation for Form input
9- Help tooltip.
10- Confirmation message before deleting talent/group.


## What's good about the application:
1- It is a master piece for Angular 2 along with Angular CLI frameworks
2- Perfect data synchronization between talents and groups.Data updated every where tightly.
3- All tests ran successfully using Jasmine and Karma frameworks including the end-to-end test.
4- Fancy and friendly UI for usability.
5- Responsive UI( responsive navigation bar, and content )
6- A Splash screen in the introduction.
7- Light weight client code which was minified and bundled for security and easy deployment.( using Angular CLI )
8- Testable and easy to maintain.


## Things to be improved in the future and they are easy to be done :
1- Confirmation messages to be done using bootstrap-confirmation library instead of the native JS support.
2- Coloring enhancement. a significant time was spent while choosing the colors.
3- Creating a reusable  angular component for the User/Group card.
4- Search result component has more smooth animation.



