import React from 'react';
import mockStore from '../../../__testutils__/mockStore';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Popup from '../../../components/popup/Popup';
import Row from '../../../components/popup/Row';
import config from '../../../config';
import clonedeep from 'lodash/cloneDeep';


const displayEventPopupStore = {
    popup: {
        show: true,
        payload: {
            contentType: 'event',
            isAdd: false,
            id: 'test id'
        }
    },
    items: {
        rawEvents: []
    },
    events: {
        rawEvents: [
            {
                _id: 'test id',
                description: 'test description',
                time: 'test expireDate',
                location: JSON.stringify(['home', 'kitchen']),
                itemList: ['test event 1', 'test event 2']
            },
            {
                _id: 'test id 2',
                description: 'test description 2',
                time: 'test expireDate 2',
                location: JSON.stringify(['home']),
                itemList: []
            }
        ]
    }
};


describe('(connected) Popup -- Display Event', () => {
    const store = mockStore(displayEventPopupStore);
    const wrapper = shallow(<Popup store={store} />, { disableLifecycleMethods: true });
    const component = wrapper.dive();
    const originalSetState = component.instance().setState;

    it('should render Popup without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should have correct payload as in the store', () => {
        expect(wrapper.prop('payload')).toEqual(displayEventPopupStore.popup.payload);
    });

    it('should have correct initial state', () => {
        expect(component.state('editing')).toBe(false);
        expect(component.state('payload')).toEqual(displayEventPopupStore.events.rawEvents[0]);
    });

    it('should initially have <div.popup-name /> but no <input.popup-name /> for the name', () => {
        expect(component.find('.popup-name-bar input.popup-name')).toHaveLength(0);
        expect(component.find('.popup-name-bar div.popup-name')).toHaveLength(1);
    });

    it('should initially have exact number of Rows with correct props', () => {
        const fields = config.fields.event;
        const rows = component.find(Row);
        // should have correct number of Rows
        expect(rows).toHaveLength(fields.length);
        // should all have contentType === 'event'
        expect(rows.find({ contentType: 'event' })).toHaveLength(fields.length);
        // should have correct field with corresponding iconNames and details
        for (let field of fields) {
            expect(rows.find({
                field: field,
                iconName: config.icons[field],
                details: displayEventPopupStore.events.rawEvents[0][field]
            })).toHaveLength(1);
        }
        // should all have editing === true
        expect(rows.find({ editing: false })).toHaveLength(fields.length);
        // should all have a handleEditResult of type Function
        for (let field of fields) {
            expect(typeof rows.find({ field: field }).prop('handleEditResult'))
                .toBe('function');
        }
    });

    it('should initially have no upload-picture-guide', () => {
        expect(component.find('.upload-picture-guide')).toHaveLength(0);
    });

    it('should initially have \'.left\' and \'.right\'', () => {
        expect(component.find('.left')).toHaveLength(1);
        expect(component.find('.right')).toHaveLength(1);
    });

    /**
     * this test case tests the 'Popup.changeEditingState()' method by simulating
     * a click on the <Icon iconName='pen'>.
     */
    it('should switch from viewing to editing mode properly on click of the pen icon', () => {
        component.instance().setState = jest.fn();
        component.find({ iconName: 'pen' }).simulate('click');
        expect(component.instance().setState).toHaveBeenCalledWith({ editing: true });
    });

    /**
     * this test case tests the 'Popup.handleChange(event)' method by simulating
     * a change in the <input />.
     */
    it('should update state properly when the name input\'s value is changed', () => {
        component.instance().setState = originalSetState;
        component.setState({ editing: true });
        component.instance().setState = jest.fn();
        component.find('.popup-name').simulate('change', { target: { value: 'test name' } });
        const expected = clonedeep(displayEventPopupStore.events.rawEvents[0]);
        expected.name = 'test name';
        expect(component.instance().setState).toHaveBeenCalledWith({ payload: expected });
        component.instance().setState = originalSetState;
    });

    /**
     * this test case tests the 'Popup.handleSubmit()' method by simulating
     * a click on the save icon <Icon iconName='save' />.
     */
    it('should handle submission properly when the user click the submit icon', () => {
        // should not submit or call Popup.changeEditingState() if required fields are not filled.
        component.instance().changeEditingState = jest.fn();
        component.setState({ payload: {
            time: displayEventPopupStore.events.rawEvents[0].time
        }});
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).not.toHaveBeenCalled();

        component.setState({ payload: {
            name: '',
            time: displayEventPopupStore.events.rawEvents[0].time
        }});
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).not.toHaveBeenCalled();

        // should call Popup.changeEditingState() if required fields are filled.
        component.setState({ payload: {
            name: 'test name',
            time: displayEventPopupStore.events.rawEvents[0].time
        }});
        component.find({ iconName: 'save' }).simulate('click');
        expect(component.instance().changeEditingState).toHaveBeenCalled();
    });

    /**
     * this test case tests that clicking on the delete icon <Icon iconName='trash-alt' />
     * correctly invokes the 'Popup.handleDelete()' method.
     */
    it('should handle delete properly when the user click the delete icon', () => {
        component.instance().setState = jest.fn();
        component.find({ iconName: 'trash-alt' }).simulate('click');
        expect(component.instance().setState).toHaveBeenCalledWith();
    });
    
    /**
     * test handleEditResult(key, value)
     */
    it('should set state properly when Popup.handleEditResult(key, value) is called', () => {
        component.instance().setState = jest.fn();
        component.instance().handleEditResult('test key', 'test value');
        expect(component.instance().setState).toHaveBeenCalledWith({
            payload: {
                name: 'test name',
                time: displayEventPopupStore.events.rawEvents[0].time,
                'test key': 'test value'
            }
        });
    });
});