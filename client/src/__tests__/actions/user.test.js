import {FETCH_USER} from '../../actions/types.js';
import {fetchUser, updateEmail, updateNotifyTime} from '../../actions';

import {getAction} from '../../__testutils__/getAction';
import mockStore from '../../__testutils__/mockStore';

describe("test fetch user function",() => {
    it("handles fetch user", async () => {
        const store = mockStore();
        store.dispatch(fetchUser({id:'123',email:'wangchengyu2015@gmail.com'}));
        expect(await getAction(store, FETCH_USER)).toEqual({type: FETCH_USER,payload:{id:'123',email:'wangchengyu2015@gmail.com'}});
    });
});

describe("test update email function",() => {
    it("handles update email", async () => {
        const store = mockStore();
        updateEmail({email:'newEmail@email.com', facebookId:"123", accessToken:"test"});
        store.dispatch(fetchUser({id:'123',email:'newEmail@email.com'}));
        expect(await getAction(store, FETCH_USER)).toEqual({type: FETCH_USER,payload:{id:'123', email:'newEmail@email.com'}});
    });
});

describe("test update reminder time function",() => {
    it("handles update reminder", async () => {
        const store = mockStore();
        updateNotifyTime({time:'12', facebookId:"123", accessToken:"test"});
        store.dispatch(fetchUser({id:'123',notifyTime:'12'}));
        expect(await getAction(store, FETCH_USER)).toEqual({type: FETCH_USER,payload:{id:'123', notifyTime:"12"}});
    });
});


