import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App from './App';


it('renders without crashing', () => {
    const app = shallow(<App />);
    expect(app).toHaveLength(1);
});
