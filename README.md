![reconnect header](https://github.com/Rhematic/ReConnect/assets/111538729/65fe148a-2687-4999-992b-e7bf422c8bd7)

<h3 align="center">RECONNECT</h3>

  <p align="center">
Reconnect is a mental health and well being platform for families going through divorce with children at the center. Reconnect offers separate accounts for parents and children including a custody calendar, journal, emption survey, access to therapy, peer connection, and resources. Reconnect is on a mission to build a future of happier children and more resilient families. 
    <br />
    <br />
<a href="LINK GOES HERE" target="_blank"><strong>JOIN RECONNECT»</strong></a>
    <br />
    <br />
    <a href="https://docs.google.com/document/d/101jtA3QJ7x5wuVp1GeXgvGrcZB8YwBn9OCv7VVni0n8/edit?usp=sharing" target="_blank">View Application Overview</a>
    <br />
    <a href="https://docs.google.com/document/d/1egaiGiEw7fzemX9nb9pkDb4jfK-DPASXCVSpf4zy5u8/edit?usp=sharing" target="_blank">Application Features and Bug Fixes</a>

   

## Meet The Team

![the team](https://github.com/Rhematic/ReConnect/assets/111538729/a9d3fa4a-0aa0-4f7c-a605-09d59c143e91)

---

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

--- 

## Create database and table

Create a new database called `reconnect` and create a `user` table:

- [SQL](database.sql)

---

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

---

![reconnectgif](https://github.com/Rhematic/ReConnect/assets/111538729/dfc674de-119a-4f60-ab43-220709a20001)

---

# Built with

![technologies](https://github.com/Rhematic/ReConnect/assets/111538729/1f188bae-6f4c-4e5d-9e63-1aa2d02479f7)


---

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

---

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

---

## Lay of the Land

---

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
- AdminConsoleView/AdminConsoleView
- App/App
- BottomNavigation/BottomNavigation
- CalendarView/CalendarView
- FreeForm/FreeForm
- JournalView/JournalView
- LandingPage/LandingPage
- LikertForm/LikertForm
- LoginPage/LoginPage
- ProtectedRoute/ProtectedRoute
- RegisterPage/RegisterPage
- ResourcesView/ResourcesView
 - Survey/Survey
 


