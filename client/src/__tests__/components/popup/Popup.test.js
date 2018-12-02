import React from 'react';
import mockStore from '../../../__testutils__/mockStore';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Popup from '../../../components/popup/Popup';
import Row from '../../../components/popup/Row';
import config from '../../../config';


const addItemPopupStore = {
    popup: {
        show: true,
        payload: {
            contentType: 'item',
            isAdd: true,
            id: 'test id',
            currentLocation: JSON.stringify(['home'])
        }
    },
    items: {
        rawItems: []
    },
    events: {
        rawEvents: []
    }
};

describe('(connected) Popup', () => {
    const store = mockStore(addItemPopupStore);
    const component = shallow(<Popup store={store} />);

    it('should render Popup without crashing', () => {
        expect(component).toHaveLength(1);
    });

    it('should have correct payload as in the store', () => {
        expect(component.prop('payload')).toEqual(addItemPopupStore.popup.payload);
    });

    it('should have correct initial state', () => {
        expect(component.dive().state('editing')).toBe(true);
        expect(component.dive().state('payload')).toEqual({
            location: JSON.stringify(['home'])
        });
    });

    it('should initially have <input.popup-name /> but no <div.popup-name />for the name', () => {
        expect(component.dive().find('.popup-name-bar input.popup-name')).toHaveLength(1);
        expect(component.dive().find('.popup-name-bar div.popup-name')).toHaveLength(0);
    });

    it('should initially have exact number of Rows with correct props', () => {
        const fields = config.fields.item;
        const rows = component.dive().find(Row);
        // should have correct number of Rows
        expect(rows).toHaveLength(fields.length);
        // should all have contentType === 'item'
        expect(rows.find({ contentType: 'item' })).toHaveLength(fields.length);
        // should have correct field with corresponding iconNames
        for (let field of fields) {
            expect(rows.find({
                field: field,
                iconName: config.icons[field]
            })).toHaveLength(1);
        }
        // should all have editing === true
        expect(rows.find({ editing: true })).toHaveLength(fields.length);
        // should all have a handleEditResult of type Function
        for (let field of fields) {
            expect(typeof rows.find({ field: field }).prop('handleEditResult'))
                .toBe('function');
        }
        // the Row where field === 'location' should have correct details
        expect(rows.find({ field: 'location' }).prop('details'))
            .toBe(addItemPopupStore.popup.payload.currentLocation);
    });

    it('should initially have no upload-picture-guide', () => {
        
    });

    it('should initially have editModeIcon', () => {
        
    });

    // more

    console.log(component.debug());

    console.log(component.dive().find(Row).debug());

    
    // this.state = {
    //     editing: true,
    //     payload: contentType === 'event' ? {} : {
    //         location: currentLocation
    //     }
    // }

    //'should switch between viewing and editing properly on click the save or pen icon'
});