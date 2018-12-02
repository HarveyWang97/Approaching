import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import mockStore from '../../__testutils__//mockStore';

import Header from '../../components/Header';


test('should render Header correctly',() => {
    const renderer = new ReactShallowRenderer();
    const store = mockStore({});
    renderer.render(<Header store={store}/>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});