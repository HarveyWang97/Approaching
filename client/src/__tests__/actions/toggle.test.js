import {togglePopup,togglePictureEditor,toggleItemSelector,toggleEventSelector} from '../../actions';
import {
    FETCH_USER,
    TOGGLE_POPUP,
    TOGGLE_PICTURE_EDITOR,
    FETCH_EVENTS,
    FETCH_ITEMS,
    TOGGLE_ITEM_SELECTOR,
    TOGGLE_EVENT_SELECTOR
} from '../../types.js';

/*test('should picture editor toggle',() => {
    const action = togglePopup({id:'123',contentType: 'event',isAdd: false, id: id});
    expect(action).toEqual({
        type:TOGGLE_POPUP,
        payload:{id:'123'}
    });
});*/