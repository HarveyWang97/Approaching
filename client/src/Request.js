import axios from 'axios';

/*
 * When user is logged in, pass user information from facebook to server.
 * Check if server correctly handle this user, then fetch all user data from server.
 */
export function insertUser(response) {
    const url = 
    `http://localhost:3000/users/insert?facebookId=${response.id}&name=${response.name}&email=${response.email}`;
    axios.get(url)
    .then((res) => {
        console.log("res", res);
        if (res.data.success === true){
            fetchData(response.id, response.accessToken);
        } else {
            console.log("Fail to insert user in server.")
        }
    });
}

/*
 * Fetch user data from server, user is specified by facebookId and accessToken.
 * Store user data to reducer (TO BE DONE).
 * This should be called everytime user made changes to the front-end.
 */
export function fetchData(facebookId, accessToken) {
    const url = 
    `http://localhost:3000/fetchData?facebookId=${facebookId}&accessToken=${accessToken}`;
    axios.get(url)
    .then((res) => {
        console.log(res);
        // store user data
    });
}