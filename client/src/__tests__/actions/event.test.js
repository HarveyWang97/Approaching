import {FETCH_EVENTS,INSERT_EVENT} from '../../actions/types.js';
import {fetchEvents,insertEvent} from '../../actions';

import {getAction} from '../../__testutils__/getAction';
import mockStore from '../../__testutils__/mockStore';

describe("test fetch events",() => {
    it("handle fetch and insert events",async() => {
        const store = mockStore();
       /* const data = {
            name:"Appfolio phone call",
            location:"Santa babara",
            description:"xxx",
            time:"15550000000"
        };*/
        store.dispatch(fetchEvents('test','test'));
        const returnValue = await getAction(store,FETCH_EVENTS);
        expect(returnValue.payload.rawEvents.length).toEqual(15);
        expect(returnValue.payload.rawEvents.filter(item => (item.name === "Appfolio phone call")).length).toEqual(1);
       // expect(returnValue.payload.rawEvents[0].name).toEqual( "Appfolio phone call");
      /*  expect(await getAction(store, FETCH_EVENTS).toEqual({
            type:FETCH_EVENTS,

        }));*/
        
    });
});