# Calendar management system

All-in-one calendar management system. Have the ability to import Google Calendar and Microsoft Outlook and combine into one. It can also stream data, which means if you have an invitation into Google Calendar, this calaendar management system will also get updated.

# Installation guide

First, install necessary modules:

```
cd frontend
npm install
cd ../backend
npm install
```

Then, in one terminal, from the root directory of the project, start the backend server:

For Window:

```
cd backend
node --env-file=config.env main
```

For Linux:
```
cd backend
dotenv -e config.env node main.js
```

Open another terminal, and start the frontend:

```
cd frontend
npm run dev
```
