import {USER_CAR_EDITING_SUCCESS, USER_CAR_EDITING_FAILED, USER_CAR_EDITING} from '../Constants/userConst'

function carReducers(state = {}, action) {
    switch (action.type) {
        case USER_CAR_EDITING:{
            return {
                carObj: action.payload,
                Editing: true
            }
        }
        case USER_CAR_EDITING_SUCCESS:{
            return {
                Editing: false
            }
        }
        case USER_CAR_EDITING_FAILED:{
            return {
                Editing: false,
                error: action.payload
            }
        }
        default: return state;
    }
}
export {carReducers};