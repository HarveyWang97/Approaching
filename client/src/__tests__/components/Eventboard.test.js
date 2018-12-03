import React from 'react';
import mockStore from '../../__testutils__/mockStore';
import {shallow} from 'enzyme';


import Eventboard from '../../components/eventboard/Eventboard';
import Event from '../../components/eventboard/Event';
import Popup from '../../components/popup/Popup';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const eventStore = {
    events:{
        structuredEvents:{
            1970:{
                6:{
                    29:[
                        {_id:'testest',name:'hhhh',time:'1555000000',location:'SB',picture:"",owner:"test"}
                    ],
                    30:[
                        {_id:'tt',name:'hulu onsite',time:'1655000000',location:'Santa monica',picture:"",owner:"test"}
                    ]
                }
            }
        }
    }
        
};


describe("should render the eventboard correctly",() => {
    
   // const store = mockStore(eventStore);
    const wrapper = shallow(<Eventboard  />,
    {
        context:{store:mockStore(eventStore)}   
    });
    //const render = wrapper.dive();

    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    it("render the connected events correctly",() => {
       // console.log(wrapper.dive().find(Event).debug());
        expect(wrapper.dive().find(Event)).toHaveLength(2);
    });

    it("eventboard rendered correctly",() => {
        expect(wrapper.dive().find(Event).at(0).props().name).toEqual("hhhh");
        expect(wrapper.dive().find(Event).at(1).props().name).toEqual("hulu onsite");
    });

    
});
