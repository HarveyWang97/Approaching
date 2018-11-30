import {togglePopup,togglePictureEditor,toggleItemSelector,toggleEventSelector} from '../../actions';
import {
    TOGGLE_POPUP,
    TOGGLE_PICTURE_EDITOR,
    TOGGLE_ITEM_SELECTOR,
    TOGGLE_EVENT_SELECTOR
} from '../../actions/types.js';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {getAction} from '../../utils/getAction';

export const mockStore = configureMockStore([thunk]);

describe("test toggle functions",() => {
    it("handles changing toggles", async () => {
        const store = mockStore();
        store.dispatch(togglePopup({id:'123',contentType:'event'}));
        store.dispatch(togglePictureEditor({id:'123'}));
        store.dispatch(toggleItemSelector({id:'dfs',formatted_details:[12,34]}));
        store.dispatch(toggleEventSelector({id:'dfksdf',formatted_details:["a","b"]}));
        expect(await getAction(store, TOGGLE_POPUP)).toEqual({type: TOGGLE_POPUP,payload:{id:'123',contentType:'event'}});
        expect(await getAction(store, TOGGLE_PICTURE_EDITOR)).toEqual({type: TOGGLE_PICTURE_EDITOR,payload:{id:'123'}});
        expect(await getAction(store, TOGGLE_ITEM_SELECTOR)).toEqual({type: TOGGLE_ITEM_SELECTOR,payload:{id:'dfs',formatted_details:[12,34]}});
        expect(await getAction(store, TOGGLE_EVENT_SELECTOR)).toEqual({type: TOGGLE_EVENT_SELECTOR,payload:{id:'dfksdf',formatted_details:["a","b"]}});

    });
});




