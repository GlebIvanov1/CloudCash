import { configureStore } from "@reduxjs/toolkit";
import BalanceReducer from "./slices/BalanceSlice";
import CardReducer from "./slices/CardSlice";
import configurationReducer from "./slices/ConfigurationSlice";
import UserReducer from "./slices/UserSlice";
import VerifyReducer from './slices/VerifySlice';

export const store = configureStore({
  reducer: {
    configuration: configurationReducer,
    Balance: BalanceReducer,
    Card: CardReducer,
    User: UserReducer,
    Verify: VerifyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
