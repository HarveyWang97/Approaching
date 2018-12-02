import {FETCH_EVENTS,INSERT_EVENT} from '../../actions/types.js';
import {fetchEvents,insertEvent} from '../../actions';

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {getAction} from '../../utils/getAction';

export const mockStore = configureMockStore([thunk]);

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
        //expect(returnValue.payload.rawEvents.length).toEqual(15);
        expect(returnValue.payload.rawEvents.filter(item => (item.name === "Appfolio phone call")).length).toEqual(1);
        expect(returnValue.payload.rawEvents.filter(item => (item.name === "Facebook interview")).length).toEqual(1);
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
        console.log(payload[0]);
        expect(payload[0].location).toEqual("John wooden center");
       // expect(returnValue.payload.rawEvents.filter(item => (item.name === "JWC basketball"))[0].location)
       // .toEqual("John wooden center");     
    });
});

describe("describe delete events",() => {
    it("handle delete events",async() => {
        const store = mockStore();
    });
});


