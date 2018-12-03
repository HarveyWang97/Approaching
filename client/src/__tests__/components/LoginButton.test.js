import React from 'react';
import mockStore from '../../__testutils__//mockStore';
import {shallow} from 'enzyme';

import LoginButton from '../../components/LoginButton';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const init_state = {
    auth:{
        name:'wangchengyu'
    }
};

describe("test the Login button",() => {
    const wrapper = shallow(<LoginButton />,
    {
        context:{store:mockStore(init_state)}   
    });
    
    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });
}); 