import React from 'react';
import mockStore from '../../__testutils__//mockStore';
import {shallow} from 'enzyme';


import Eventboard from '../../components/eventboard/Eventboard';
import Event from '../../components/eventboard/Event';
import Popup from '../../components/popup/Popup';
import Dashboard from '../../components/Dashboard';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const initialState = {
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
    },
    popup:{
        show:false
    },
    pictureEditor:{
        show:false
    },
    itemSelector:{
        show:false
    },
    eventSelector:{
        show:false
    }
        
};

describe("test the dashboard", () => {
    const wrapper = shallow(<Dashboard history={[]} />,
        {
            context:{store:mockStore(initialState)}   
        });
    
    const wrapper_eventboard = shallow(<Eventboard />,
    {
        context:{store:mockStore(initialState)}   
    });

    
    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    });

    
});