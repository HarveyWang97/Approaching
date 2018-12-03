import {FETCH_EVENTS,INSERT_EVENT} from '../../actions/types.js';
import {fetchEvents,insertEvent} from '../../actions';

import {getAction} from '../../__testutils__/getAction';
import mockStore from '../../__testutils__/mockStore';

describe("test fetch events",() => {
    it("handle fetch events",async() => {
        const store = mockStore();
       /* const data = {
            name:"Appfolio phone call",
            location:"Santa babara",
            description:"xxx",
            time:"15550000000"
        };*/
        store.dispatch(fetchEvents('test','test'));
        const returnValue = await getAction(store,FETCH_EVENTS);
        expect(returnValue.payload.rawEvents.length).toBeGreaterThan(0);
    });
});

describe("test insert events",() => {
    it("handle  insert events",async() => {
        const store = mockStore();
        const data = {
            name:"JWC basketball",
            location:"John wooden center",
            description:"xxx",
            time:"15950000000"
        };
        await store.dispatch(insertEvent(data,'test','test'));
        store.dispatch(fetchEvents('test','test'));
        const returnValue = await getAction(store,FETCH_EVENTS);
        const payload = returnValue.payload.rawEvents.filter(item => (item.name === "JWC basketball"));
        // console.log(payload[0]);
        expect(payload[0].location).toEqual("John wooden center");
       // expect(returnValue.payload.rawEvents.filter(item => (item.name === "JWC basketball"))[0].location)
       // .toEqual("John wooden center");     
    });
});




