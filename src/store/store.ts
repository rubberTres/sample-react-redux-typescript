import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "store/features/gamesSlice";
import queryFieldsReducer from "store/features/searchQuerySlice";
import maxPageSizeReducer from "store/features/maxPageSlice";

export const store = configureStore({
	reducer: {
		games: gamesReducer,
		queryFields: queryFieldsReducer,
		maxPageSize: maxPageSizeReducer,
	}
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>