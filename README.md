# Approaching
UCLA CS130 Project

## Usage

```
git clone https://github.com/VincentD97/Approaching.git
cd Approaching
npm run setup
npm run dev
```

## API

Goto these API endpoints in a browser and you should see expected response in plaintext.
At the same time, our mlab mongodb database should change accordingly.

`facebookId` and `accessToken` are required for all requests. Parameters that are not listed in "Required" column are optional.

### User

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/users/insert?facebookId={}&accessToken={}&name={}&email={}` |    All   |
| Update | `http://localhost:3000/users/update?facebookId={}&accessToken={}&email={}`         |          |
| Remove | `http://localhost:3000/users/remove?facebookId={}&accessToken={}`                  |          |

### Item

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/items/insert?facebookId={}&accessToken={}&name={}&picture={}&expireDate={}&location={}&quantity={}&description={}` |    All   |
| Update | `http://localhost:3000/items/update?facebookId={}&accessToken={}&_id={}&name={}&picture={}&expireDate={}&location={}&quantity={}&description={}` |   `_id`  |
| Remove | `http://localhost:3000/items/remove?facebookId={}&accessToken={}&_id={}`           |   `_id`  |

### Event

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/events/insert?facebookId={}&accessToken={}&name={}&picture={}&time={}&location={}&description={}` |    All   |
| Update | `http://localhost:3000/events/update?facebookId={}&accessToken={}&_id={}&name={}&picture={}&time={}&location={}&description={}` |   `_id`  |
| Remove | `http://localhost:3000/events/remove?facebookId={}&accessToken={}&_id={}`                  |   `_id`  |

### Get All Items and Events

|  Action   |                                        Url                                         | Required |
|:---------:|------------------------------------------------------------------------------------|:--------:|
| fetchData | `http://localhost:3000/fetchData?facebookId={}&accessToken={}`                     |          |