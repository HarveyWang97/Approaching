import React from 'react';
import mockStore from '../../../__testutils__//mockStore';
import {shallow} from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Row from '../../../components/popup/Row';

configure({ adapter: new Adapter() });


const init_state = {
    items:{
        rawItems:[{_id:'abc',name:'table'},
        {_id:'df',name:'peach'},
        {_id:'cd',name:'apple'}]
    }
}

describe("test the row",() => {
    const wrapper = shallow(<Row field="description" editing={false} details="eee" />,
    {
        context:{store:mockStore(init_state)}   
    });

    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("check description",() => {
       expect(wrapper.dive().find("span").text()).toEqual("eee"); 
    }); 


    
});