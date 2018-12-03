import React from 'react';
import mockStore from '../../../__testutils__//mockStore';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import PictureEditor from '../../../components/popup/PictureEditor';


describe("test PictureEditor",() => {
    const store = mockStore();
    const payload = {
        handleSubmit: jest.fn()
    }
    const wrapper = shallow(<PictureEditor store={store} payload={payload}/>);
    const component = wrapper.dive();

    it('should render PictureEditor without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('render as expected',() => {
        expect(wrapper).toMatchSnapshot();
    });

    it('handle submit properly', () => {
        component.setState({ croppedImageUrl: 'imageURL' });
        component.find('.submit').simulate('click');
        expect(component.instance().props.payload.handleSubmit).toHaveBeenCalledWith(
            'picture', 'imageURL'
        );
    });
})