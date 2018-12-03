import React from 'react';
import mockStore from '../../../__testutils__/mockStore';
import {shallow} from 'enzyme';

import ProfilePopup from '../../../components/profile/ProfilePopup';
import ProfileRow from '../../../components/profile/ProfileRow';
import Icon from '../../../components/common/Icon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const initialState = {
    userProfile:{
        email:"wang@qq.com",
        notifyTime:"36000000"
    }
};

describe("test the profile popup", () => {
    const wrapper = shallow(<ProfilePopup />,
        {
            context:{store:mockStore(initialState)}   
        });

    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("has the email rendered correctly", () => {
        expect(wrapper.dive().find(ProfileRow).at(0).props().details).toEqual("wang@qq.com");
    });

    it("test logout correctly",() => {
        wrapper.dive().find(Icon).at(1).simulate('click');
        
    });
});