import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { globalConstant } from "constant/constant";

//?  import these for redux
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/query";

// todo: slice reducers
import counterReducer from "redux/features/counter/counterSlice";
import loggedUserReducer from "redux/features/loggedUser/loggedUserSlice";
// todo: rtk queries
import { serviceRequestApi } from "redux/api/serviceRequest/serviceRequestApi";
import { categoryApi } from "redux/api/category/categoryApi";
import { authApi } from "redux/api/auth/authApi";
import { vehicleApi } from "redux/api/vehicle/vehicleApi";
import { userApi } from "redux/api/users/userApi";
import { organizationApi } from "redux/api/organization/organizationApi";
import { contractApi } from "redux/api/contract/contractApi";
import { dashboardApi } from "redux/api/dashboard/dashboardApi";
import { solutionApi } from "redux/api/solution/solutionApi";
import { employeeApi } from "redux/api/employee/employeeApi";
import { reportApi } from "./api/report/reportApi";

//?  persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loggedUser"],
};

//?  combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  loggedUser: loggedUserReducer,
  //?  rtk queries
  [serviceRequestApi.reducerPath]: serviceRequestApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [contractApi.reducerPath]: contractApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [solutionApi.reducerPath]: solutionApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
});

//?  persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//?  configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    //?  rtk queries
    getDefaultMiddleware().concat(
      serviceRequestApi.middleware,
      categoryApi.middleware,
      authApi.middleware,
      vehicleApi.middleware,
      userApi.middleware,
      organizationApi.middleware,
      contractApi.middleware,
      dashboardApi.middleware,
      solutionApi.middleware,
      employeeApi.middleware,
      reportApi.middleware,
      thunk
    ),

  devTools: process.env.NODE_ENV !== "production",
});

//?  rtk queries
setupListeners(store.dispatch);
