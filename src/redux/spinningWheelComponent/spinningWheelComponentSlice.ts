/* Redux toolkit */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/* Type */
export interface SpinningWheelComponentStateType {
  segmentsNamesArr: string[];
  segmentsColorsArr: string[];
}

/* Initial state */
const spinningWheelComponentInitialState: SpinningWheelComponentStateType = {
  segmentsNamesArr: [
    "Grüne",
    "Les italiens du coin",
    "Royal kebab",
    "Onolulu",
    "Yam Yam",
    "Road Side",
    "Big Fernand",
  ],
  segmentsColorsArr: [],
};

/* Slice */
export const spinningWheelComponentSlice = createSlice({
  name: "spinningWheelComponent",
  initialState: spinningWheelComponentInitialState,
  reducers: {
    segmentsNamesArr: (state, action: PayloadAction<any>) => {
      state.segmentsNamesArr = action.payload;
      return state;
    },
    segmentsColorsArr: (state, action: PayloadAction<any>) => {
      state.segmentsColorsArr = action.payload;
      return state;
    },
  },
});

/* Action creators are generated for each case reducer function */
export const { segmentsNamesArr, segmentsColorsArr } =
  spinningWheelComponentSlice.actions;

/* Export reducer */
export default spinningWheelComponentSlice.reducer;
