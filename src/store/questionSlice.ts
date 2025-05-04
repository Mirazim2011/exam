import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    numberOfQuestions: 10,
    categoryId: 9,
  },
  reducers: {
    changeQuestionData: (state, action) => {
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.categoryId = action.payload.categoryId;
    },
  },
});
export const questionActions = questionSlice.actions;
export default questionSlice;
