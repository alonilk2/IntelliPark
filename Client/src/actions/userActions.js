import Axios from "axios";
import {FILE_UPLOAD_ATTEMPT,FILE_UPLOAD_SUCCESS,FILE_UPLOAD_FAILED} from '../Constants/userConst';


/*
const sendmail = (email, fullname, phonenum, fulltext) => async (dispatch) => {
  
}*/

const uploadFile = (file) => (dispatch) => {
    

    //dispatch({type: FILE_UPLOAD_ATTEMPT, payload: file});
    try {
      //  dispatch({type: FILE_UPLOAD_SUCCESS, payload: file});
    }
    catch (err) {
        //dispatch({type: FILE_UPLOAD_FAILED, payload: err});
    }
}


export {uploadFile};