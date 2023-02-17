/* React */
import React from "react";
import ReactDOM from "react-dom/client";

/* Redux */
import { Provider } from "react-redux";

/* Redux toolkit */
import { configureStore } from "@reduxjs/toolkit";

/* Style */
import "./index.css";

/* Application component */
import App from "./App";

/* Redux reducers */
import spinningWheelComponentReducer from "./redux/spinningWheelComponent/spinningWheelComponentSlice";

/* Redux store */
const store = configureStore({
  reducer: {
    spinningWheelComponent: spinningWheelComponentReducer,
  },
});

/* Type - infer the `RootState` and `AppDispatch` types from the store itself */
export type RootState = ReturnType<typeof store.getState>;

/* Type - inferred type: {posts: PostsState, comments: CommentsState, users: UsersState} */
export type AppDispatch = typeof store.dispatch;

/* Creation in DOM of a root HTML element */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/* Render in root HTML element */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
