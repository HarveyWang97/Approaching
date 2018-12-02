import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import mockStore from '../../../__testutils__//mockStore';

import Popup from '../../../components/popup/Popup';

const addItemPopupStore = {
    popup: {
        show: true,
        payload: {
            contentType: 'item',
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

describe('should render Popup correctly', () => {
    const renderer = new ReactShallowRenderer();    

    it('+++ render the (connected) Popup component', () => {
        const store = mockStore(addItemPopupStore);
        renderer.render(<Popup store={store}/>);
        const result = renderer.getRenderOutput();

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
    });
});