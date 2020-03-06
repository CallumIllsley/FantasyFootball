# Fantasy Football Documentation

This is a document outlining the usage of the FantasyFootball API


## API Endpoints

This is a list of all avaliable endpoints exposed by the API

### Login/Authentication

These endpoints are likely to be hidden from the end user as they handle authentication and login

- **POST '/users/' :** *Will create a new user with required Name, Email and Password fields. The password is hashed before being stored in the database. For testing purposes: use the auth token generated in the response. This post request requires a body:* 

```json 
{
    "name":, //Any string: REQUIRED
    "email":, //Any string: REQUIRED
    "password":, //Any string: REQUIRED
    "role", //Either basic or admin: REQUIRED
}
```

- **POST '/users/login' :** *Will check the database to see if a user exists with matching credentials. If so a JWT token is created for the user*
- **POST '/users/me/logout :** *Will logout the user from the current device and remove the authentication token from the database*
- **POST '/users/me/logoutall :** *Will logout the user from all connected devices and remove all autherntication tokens from the database*
- **GET '/users/me** *Will return the users page if successfully authenticated*

### Leagues

These endpoints are for creating new leagues and will require elevated access.

- **POST '/leagues/' :** *Will create a new league with the following structure:* 
```json 
{
    league_id: 1, //Any number: REQUIRED
    "name": "Example League", //Any string: REQUIRED
    "teams": [Team] //List of teams (see Team endpoints): REQUIRED
}
```
- **DELETE '/leagues/:id :** *Will delete the league with the matching ID*
- **PUT '/leagues/:id :** *Will update the league with the matching ID with the supplied body (See POST for body details)

### Team 

These endpoints are for creating new teams and are avaliable to users with basic level access 

- **POST'/teams/' :** *Will create a new team with the following structure:*
```json
{
    team_id: 1, //Any number: REQUIRED
    "name": "Example Team", //Any string: REQUIRED
    "players": [Players] //List of players (see player endpoints): REQUIRED
}
```
- **DELETE '/teams/:id' :** *Will delete the team with the matching ID*
- **PUT '/teams/:id' :** *Will update the team with the matching id with the supplied body (See POST for body details)

### Players

These endpoints are for creating new players and in the first iteration are unlikely to be used (Data will be fetched from external API) by the end user. These are still used to populate the database.

- **POST '/players/' :** *Will create a new player with the following structure:*
```json
{
    "firstName": "Callum", //Any string: REQUIRED
    "lastName": "Illsley", //Any string: REQUIRED
    "playerName": "C Illsley", //Any string: REQUIRED
    playerID: 10, //Any Number: REQUIRED
    number: 8, //Any Number: REQUIRED
    "position":  //Any string: REQUIRED
}
```
- **DELETE '/players/:id' :** *Will delete the player with the matching ID*
- **PUT '/players/:id' :** *Will update the player with the matching id with the supplied body (See POST for body details)*
