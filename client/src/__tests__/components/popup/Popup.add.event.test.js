import React from 'react';
import mockStore from '../../../__testutils__/mockStore';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Popup from '../../../components/popup/Popup';
import Row from '../../../components/popup/Row';
import config from '../../../config';


const addEventPopupStore = {
    popup: {
        show: true,
        payload: {
            contentType: 'event',
            isAdd: true,
            id: 'test id'
        }
    },
    items: {
        rawItems: []
    },
    events: {
        rawEvents: []
    }
};


describe('(connected) Popup -- Add Event', () => {
    const store = mockStore(addEventPopupStore);
    const wrapper = shallow(<Popup store={store} />);
    const component = wrapper.dive();

    it('should render Popup without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should have correct payload as in the store', () => {
        expect(wrapper.prop('payload')).toEqual(addEventPopupStore.popup.payload);
    });

    it('should have correct initial state', () => {
        expect(component.state('editing')).toBe(true);
        expect(component.state('payload')).toEqual({
            location: addEventPopupStore.popup.payload.currentLocation
        });
    });

    it('should initially have <input.popup-name /> but no <div.popup-name /> for the name', () => {
        expect(component.find('.popup-name-bar input.popup-name')).toHaveLength(1);
        expect(component.find('.popup-name-bar div.popup-name')).toHaveLength(0);
    });

    it('should initially have exact number of Rows with correct props', () => {
        const fields = config.fields.event;
        const rows = component.find(Row);
        // should have correct number of Rows
        expect(rows).toHaveLength(fields.length);
        // should all have contentType === 'event'
        expect(rows.find({ contentType: 'event' })).toHaveLength(fields.length);
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
    });

    it('should initially have upload-picture-guide', () => {
        expect(component.find('.upload-picture-guide')).toHaveLength(1);
    });

    it('should initially have editModeIcon', () => {
        expect(component.find('.editModeIcon')).toHaveLength(1);
    });

    /**
     * no need to test the changeEditingState method because it's initially
     * in edit mode, and by clicking on the submit button, the popup will be
     * toggled of. There won't be any situation where the popup exist and 
     * changeEditingState is called. 
     */

    /**
     * this test case tests the 'Popup.handleChange(event)' method by simulating
     * a change in the <input />.
     */
    it('should update state properly when the name input\'s value is changed', () => {
        component.instance().setState = jest.fn();
        component.find('.popup-name').simulate('change', { target: { value: 'test name' } });
        expect(component.instance().setState).toHaveBeenCalledWith({
            payload: {
                name: 'test name',
                location: addEventPopupStore.popup.payload.currentLocation
            }
        });
    });

    /**
     * this test case tests the 'Popup.handleSubmit()' method by simulating
     * a click on the save icon <Icon iconName='save' />.
     */
    it('should handle submission properly when the user click the submit icon', () => {
        // should not submit or call Popup.changeEditingState() if required fields are not filled.
        component.instance().changeEditingState = jest.fn();
        component.setState({ payload: { name: '', time: 'valid time' } });
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).not.toHaveBeenCalled();
    
        component.setState({ payload: { name: 'test name', time: '' } });
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).not.toHaveBeenCalled();
    
        // should call Popup.changeEditingState() if required fields are filled.
        component.setState({ payload: { name: 'test name', time: 'valid time' } });
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).toHaveBeenCalled();
    });

    /**
     * no need to test the handleDelete method because there's not delete
     * button in add event popup.
     */

    /**
     * test handleEditResult(key, value)
     */
    it('should set state properly when Popup.handleEditResult(key, value) is called', () => {
        component.instance().setState = jest.fn();
        component.instance().handleEditResult('test key', 'test value');
        expect(component.instance().setState).toHaveBeenCalledWith({
            payload: {
                name: 'test name',
                time: 'valid time',
                'test key': 'test value'
            }
        });
    });
});