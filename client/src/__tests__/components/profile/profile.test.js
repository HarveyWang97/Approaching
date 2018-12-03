import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import mockStore from '../../../__testutils__//mockStore';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import sinon from 'sinon';

import Profile from '../../../components/profile/ProfilePopup';
import ProfileRow from '../../../components/profile/ProfileRow';
import config from '../../../config';


const userStore = {
    userProfile:{
        email: "test@a.com",
        notifyTime: "23"
    },
    profile:{

    }
};

describe('should render Profile', () => {
    const renderer = new ReactShallowRenderer();   

    it('+++ render the (connected) Profile component', () => {
        const store = mockStore(userStore);
        renderer.render(<Profile store={store}/>);
        const result = renderer.getRenderOutput();

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
    });
});

describe('should render a ProfileRow', () => {
    const renderer = new ReactShallowRenderer();    

    it('+++ render the (connected) ProfileRow component', () => {
        const store = mockStore();
        renderer.render(<ProfileRow store={store}/>);
        const result = renderer.getRenderOutput();

        // expect(result);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
    });  
});

describe('should render each component in Profile', () => {
    const store = mockStore(userStore);
    const wrapper = shallow(<Profile store={store}/>)   

    it('+++ rendered each component correctly', () => {
        expect(wrapper.dive().find('.profile_inner div.profile_icon')).toHaveLength(1);
        expect(wrapper.dive().find('.profile_inner div.profile_title')).toHaveLength(1);
        expect(wrapper.dive().find(ProfileRow)).toHaveLength(2);
        expect(wrapper.dive().find('.profile_inner div.left')).toHaveLength(1);
        expect(wrapper.dive().find('.profile_inner div.right')).toHaveLength(1);

        const keys = ["email", "reminder"];
        for (let key of keys){
            expect(wrapper.dive().find(ProfileRow).find({
                iconName: config.icons[key]
            })).toHaveLength(1);
        }
    });
});

describe("should render details", () => {
    const renderer = new ReactShallowRenderer(); 
    const store = mockStore(userStore);
    renderer.render(<Profile store={store}/>);
    const result = renderer.getRenderOutput();

    it('+++ email and reminder rendered correctly', () => {
        expect(result.props.userProfile.email).toBe(userStore.userProfile.email);
        expect(result.props.userProfile.notifyTime).toBe(userStore.userProfile.notifyTime);
    });
    
});

describe("checking member functions in Profile class", () => {
    const store = mockStore(userStore);
    const wrapper = shallow(<Profile store={store}/>);

    it('+++ validateEmail should worlk', () => {
        const isNotValid1 = wrapper.dive().instance().validateEmail("a");
        const isNotValid2 = wrapper.dive().instance().validateEmail("a@b");
        const isNotValid3 = wrapper.dive().instance().validateEmail("");
        const isNotValid4 = wrapper.dive().instance().validateEmail("a@b.com.");
        const isValid1 = wrapper.dive().instance().validateEmail("a@b.com");
        const isValid2 = wrapper.dive().instance().validateEmail("JB@ucla.edu");
        expect(isNotValid1).toBe(false);
        expect(isNotValid2).toBe(false);
        expect(isNotValid3).toBe(false);
        expect(isNotValid4).toBe(false);
        expect(isValid1).toBe(true);
        expect(isValid2).toBe(true);

    });

    it('+++ validateReminder should worlk', () => {
        const isNotValid1 = wrapper.dive().instance().validateReminder("24h");
        const isNotValid2 = wrapper.dive().instance().validateReminder("");
        const isNotValid3 = wrapper.dive().instance().validateReminder("-1");
        const isNotValid4 = wrapper.dive().instance().validateReminder("a");
        const isValid1 = wrapper.dive().instance().validateReminder("24");
        const isValid2 = wrapper.dive().instance().validateReminder("0");
        expect(isNotValid1).toBe(false);
        expect(isNotValid2).toBe(false);
        expect(isNotValid3).toBe(false);
        expect(isNotValid4).toBe(false);
        expect(isValid1).toBe(true);
        expect(isValid2).toBe(true);
    });

});
