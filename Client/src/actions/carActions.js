import history from '../history';
import {
  USER_CAR_EDITING_FAILED,
  USER_CAR_EDITING_SUCCESS,
  USER_CAR_EDITING} from '../Constants/userConst';

const editCar = (car) => (dispatch) => {
    dispatch({type: USER_CAR_EDITING, payload: car});
    history.push('/CarEdit');
}


export {editCar};