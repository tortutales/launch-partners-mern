# LaunchPartners MERN

## Needed prerequisites

- [VSCode](https://code.visualstudio.com/)
- [MongoDB](https://www.mongodb.com/download-center)
- [NodeJS](https://nodejs.org/en/download/)
- [Npm](https://www.npmjs.com/)

## Optionals tools to manage mongo databases
- [Studio3T](https://studio3t.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

### Each `backend` and `frontend` folder has its own VSCode workspace settings so I recommend to open each one separate.

# Setting up MongoDB instance

Just install MongoDB, get the needed server info and keep the instance running while you're working with it.


# Setting up backend

In `backend` root folder run the following command to install the npm dependencies

```bash
npm install
# or the shortcut
npm i
```

Copy the `.env.example` file content to a new `.env` file in `backend` root folder, then edit the variables if you want to, here is a brief explanation of them:

| VAR             | VALUE   | DEFAULT                    | DESCRIPTION                                                                         |
| --------------- |---------| -------------------------- | ----------------------------------------------------------------------------------- |
| PORT            | Number  | 7589                       | Port number where the API expected to be hosted                                     |
| DEBUG           | Boolean | TRUE                       | To see different logs during development process                                    |
| DB_NAME         | String  | launchPartners             | MongoDB database name                                                               |
| DB_PORT         | Number  | 27017                      | MongoDB instance port                                                               |
| JWT_PRIVATE_KEY | String  | SECRET_AND_PRIVATE_KEY_123 | A secret or private key to generate Json Web Tokens to handle auth and API requests |

Once you finished with the environment variables you can start a development server by running the following command:

```bash
npm run dev
```

## NOTE
> The first time you start a development server the database is created with the users collection, also this collection is populated with some mock data.

Then you can check the API is working by accesing some endpoints such as:

- [http://localhost:7589/api/](http://localhost:7589/api/)
- [http://localhost:7589/api/user](http://localhost:7589/api/user)

# Setting up frontend

In `frontend` root folder run the following command to install the npm dependencies

```bash
npm install
# or the shortcut
npm i
```
> Over here you can play as well with some environment variables with an `.env` file

Then you can start a development server running:

```bash
npm run start
# or just a simple
npm start
```

Then you can check the frontend is running going through:

- [http://localhost:3000/](http://localhost:3000/)

> Over here the environment variables are more attached to the file `env-local.json` located in `src/config/settings/`

So keep in mind that if you change the API port you have to change it as well in these files to connect to it correctly.

Also, there is a mock archictecture in the frontend that you can enable by setting to `true` the `isEnabled` property in `serviceMocker` object in `src/config/settings/globals.json` file.
