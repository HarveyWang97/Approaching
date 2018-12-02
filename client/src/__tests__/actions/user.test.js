import {FETCH_USER} from '../../actions/types.js';
import {fetchUser} from '../../actions';

import {getAction} from '../../__testutils__//getAction';
import mockStore from '../../__testutils__//mockStore';

describe("test fetch user function",() => {
    it("handles fetch user", async () => {
        const store = mockStore();
        store.dispatch(fetchUser({id:'123',email:'wangchengyu2015@gmail.com'}));
        expect(await getAction(store, FETCH_USER)).toEqual({type: FETCH_USER,payload:{id:'123',email:'wangchengyu2015@gmail.com'}});
    });
});


