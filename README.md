# Approaching
UCLA CS130 Project

## Usage

```
git clone https://github.com/VincentD97/Approaching.git
cd Approaching
npm install
npm start
```

## API

Goto these api endpoints in a browser and you should see expected response in plaintext.
At the same time, our mlab mongodb database should change accordingly. In all three cases for the User, on success, client side will receive an object containing the id of the document we just modified.

### Insert User

Syntax: `http://localhost:3000/users/insert?facebookId=****&name=****&email=****`

Sample: `http://localhost:3000/users/insert?facebookId=99887&name=Peter&email=sample@email.com`

Note: A new user will be added only if he doesn't exist before. The request will result in a success if the user is finally added to the database.

### Update User

Syntax: `http://localhost:3000/users/update?facebookId=****&email=****`

Sample: `http://localhost:3000/users/update?facebookId=1754&email=newemail@email.com`

Note: Update accepts the unique id and the fields we want to update. For a user, the only field we can update is email. The request will result in a success if the user already exists in the database and is successfully updated.

### Remove User

Syntax: `http://localhost:3000/users/remove?facebookId=****`

Sample: `http://localhost:3000/users/insert?facebookId=8888`

Note: The request will result in a success if the user previouly exists in the database and is successfully removed.
