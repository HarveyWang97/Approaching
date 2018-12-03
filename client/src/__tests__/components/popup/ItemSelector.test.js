import React from 'react';
import mockStore from '../../../__testutils__/mockStore';
import {shallow} from 'enzyme';
import ItemSelector from '../../../components/popup/ItemSelector';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const init_state = {
    items:{
        rawItems:[
            {_id:'abc',name:'table'},
            {_id:'df',name:'peach'},
            {_id:'cd',name:'apple'}
        ]
    },
    events:{
        rawEvents:[]
    }
};

const payload = {formatted_details:[]};

describe("test ItemSelector",() => {
    const wrapper = shallow(<ItemSelector payload={payload}/>,
        {
            context:{store:mockStore(init_state)}   
        });
    
    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("has the items set correctly",() => {
        expect(wrapper.dive().state('items')).toEqual([
            {id:'abc',label:'table'},
            {id:'df',label:'peach'},
            {id:'cd',label:'apple'}
        ]);
    });
    
})