import axios from 'axios';

/**
 * When user is logged in, pass user information from facebook to server.
 * Check if server correctly handle this user, then fetch all user data from server.
 * @function
 * @param {Object} response The response from facebook that includes the account settings of that user. 
 * @returns {void}
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

/** 
 * Fetch user data from server, user is specified by facebookId and accessToken.
 * Store user data to reducer(TO BE DONE).
 * This should be called everytime user made changes to the front-end.
 * @function
 * @param {int} facebookId An ID that is received from facebook, unique for each user.
 * @param {int} accessToken The access token that is required to fetch user data, also recieved from facbook.
 * @returns {void}
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