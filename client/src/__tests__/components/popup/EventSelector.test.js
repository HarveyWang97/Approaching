import React from 'react';
import mockStore from '../../../__testutils__//mockStore';
import {shallow} from 'enzyme';
import EventSelector from '../../../components/popup/EventSelector';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const init_state = {
    events:{
        rawEvents:[
            {_id:'abc',name:'hulu onsite'},
            {_id:'df',name:'facebook onsite'},
            {_id:'cd',name:'apple interview'}
        ]
    },
    items:{
        rawItems:[]
    }
};

const payload = {formatted_details:[]};

describe("test ItemSelector",() => {
    const wrapper = shallow(<EventSelector payload={payload}/>,
        {
            context:{store:mockStore(init_state)}   
        });
    
    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("has the items set correctly",() => {
        expect(wrapper.dive().state('items')).toEqual([
            {id:'abc',label:'hulu onsite'},
            {id:'df',label:'facebook onsite'},
            {id:'cd',label:'apple interview'}
        ]);
    });
    
})