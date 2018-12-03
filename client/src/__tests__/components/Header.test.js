import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import mockStore from '../../__testutils__/mockStore';
import {shallow} from 'enzyme';

import Header from '../../components/Header';
import ProfilePopup from '../../components/profile/ProfilePopup';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const init_state = {
    auth:{
        name:"wang"
    }
};

describe("test header",() => {
    const wrapper = shallow(<Header />,
        {
            context:{store:mockStore(init_state)}   
        });

    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("no popup at first",() => {
        expect(wrapper.dive().find(ProfilePopup)).toHaveLength(0);
    });

    it("popup after click",() => {
        wrapper.dive().find(".header-user").simulate('click');
        expect(wrapper.dive().state('showPopup')).toEqual(false);
        expect(wrapper.dive().state('name')).toEqual("wang");
    });
});
