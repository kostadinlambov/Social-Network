import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer } from './authReducer';
import ajaxStatusReducer from './ajaxStatusReducer';
import stats from './statsReducer';
import furniture from './furnitureReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    registerError: registerErrorReducer,
    loginError: loginErrorReducer,
    ajaxStatus: ajaxStatusReducer
    // stats,
    // furniture
};