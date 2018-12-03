import React from 'react';
import mockStore from '../../__testutils__/mockStore';
import {shallow} from 'enzyme';


import Eventboard from '../../components/eventboard/Eventboard';
import Event from '../../components/eventboard/Event';
import Popup from '../../components/popup/Popup';
import ItemSelector from '../../components/popup/ItemSelector';
import EventSelector from '../../components/popup/EventSelector';
import PictureEditor from '../../components/popup/PictureEditor';
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
    const store = mockStore(initialState);
    const wrapper = shallow(<Dashboard history={[]} />,
        {
            context:{store:store}   
        });

    
    it("render as expected",() => {
        expect(wrapper).toMatchSnapshot();
    })

    it("not have the popup initially",() => {
        expect(wrapper.dive().find(Popup)).toHaveLength(0);
    });

    it("not have the item selector initially",() => {
        expect(wrapper.dive().find(ItemSelector)).toHaveLength(0);
    });

    it("not have the event selector initially",() => {
        expect(wrapper.dive().find(EventSelector)).toHaveLength(0);
    });

    it("not have the picture editor initially",() => {
        expect(wrapper.dive().find(PictureEditor)).toHaveLength(0);
    });

    it("popup rendered correctly",() => {
        initialState.popup.show = true;
        expect(wrapper.dive().find(Popup)).toHaveLength(1);
    });

    it("picture editor rendered correctly",() => {
        initialState.pictureEditor.show = true;
        expect(wrapper.dive().find(PictureEditor)).toHaveLength(1);
    });

    it("item selector rendered correctly",() => {
        initialState.itemSelector.show = true;
        expect(wrapper.dive().find(ItemSelector)).toHaveLength(1);
    });

    it("picture editor rendered correctly",() => {
        initialState.eventSelector.show = true;
        expect(wrapper.dive().find(EventSelector)).toHaveLength(1);
    });


     
    

    
});