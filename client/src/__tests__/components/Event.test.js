import React from 'react';
import mockStore from '../../__testutils__//mockStore';
import {shallow} from 'enzyme';
import Event from '../../components/eventboard/Event';
import Popup from '../../components/popup/Popup';
import Dashboard from '../../components/Dashboard';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("should render test correctly",() => {

    const wrapper = shallow(<Event name="birthday" id="abc" time="15550000000"/>,
    {
        context:{store:mockStore()}   
    });


    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("render the name correctly", () => {
        expect(wrapper.dive().find('div span')).toHaveLength(2);
        expect(wrapper.dive().find('div span').at(0).text()).toEqual("birthday");
    });

    it("render the time correctly",() => {
        expect(wrapper.dive().find('div span').at(1).text()).toEqual("16:26");
    });
    
});
