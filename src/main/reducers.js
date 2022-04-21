import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import billingCycleReducer from '../billingCycle/billingCycleReducer'
import tabReducer from '../commom/tab/tabReducer'
import dashboardReducer from '../dashboard/dashboardReducer'
import authReducer from '../auth/authReducer'

const rootReducer = combineReducers({
    toastr: toastrReducer,
    dashboard: dashboardReducer,
    tab: tabReducer,
    billingCycle: billingCycleReducer,
    form: formReducer,
    auth: authReducer
})

export default rootReducer