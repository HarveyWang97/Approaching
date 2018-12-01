import {FETCH_EVENTS,INSERT_EVENT} from '../../actions/types.js';
import {fetchEvents,insertEvent} from '../../actions';

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {getAction} from '../../utils/getAction';

export const mockStore = configureMockStore([thunk]);

describe("test insert and fetch events",() => {
    it("handle fetch and insert events",async() => {
        const store = mockStore();
        const data = {
            name:"Appfolio phone call",
            location:"Santa babara",
            description:"xxx",
            time:"15550000000"
        };
        await insertEvent(data,"test1","test1");
        await store.dispatch(fetchEvents('test1','test1'));
        const returnValue = await getAction(store,FETCH_EVENTS);
        expect(returnValue.payload.events.rawEvents.length === 1);
      /*  expect(await getAction(store, FETCH_EVENTS).toEqual({
            type:FETCH_EVENTS,

        }));*/
        
    });
});