# Running Tracks App

This project is a React Native application for managing running tracks. Users can add new tracks, edit existing ones, and delete tracks. It uses TypeScript, SWR for data fetching, and a custom UI theme with Restyle.

## Table of Contents

- [Running Tracks App](#running-tracks-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Screens](#screens)

## Features

- Add new running tracks with details such as name, location, distance, estimated duration, completion status and date.
- Edit existing running tracks.
- Delete running tracks.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/yourusername/running-tracks-app.git
```

2. Navigate to the project fronent directory:
   cd running-tracks-app/frontend/toDoApplication
3. Install dependencies:
   npm install
4.install all the dependencie in the back end folder
5.start the server with:
yarn ios
6.Run the front end application:
npm start

## Screens

Feed (HomeScreen)
The HomeScreen displays a feed of running tracks. Users can view all the tracks here. Each track item in the feed includes details such as name, location, distance, and status. Users can navigate to the EditTrackScreen by selecting a track.

CompletedScreen
The CompletedScreen displays the logged in USer completed running tracks. Users can view all the tracks here. Each track item in the feed includes details such as name, location, distance, and status.

MeScreen
The MeScreen displays their running tracks. Users can view their profile details and a summary of their running statistics. This screen also allows to logout

AddNewTrackScreen
This screen allows users to add a new running track. It includes fields for the track's name, location, distance, estimated duration, completion status, and date. The date is selected using a DateTimePicker.

EditTrackScreen
This screen allows users to edit an existing running track or delete it. Fields include name, location, distance, estimated duration, completion status.
