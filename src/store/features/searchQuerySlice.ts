import { ApiQuery, Nullable } from "types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type QueryData<T> = {
	value: T
	error: Nullable<string>
}

export type ApiQueryFields = {
	page: QueryData<ApiQuery["page"]>
	apiKey: QueryData<ApiQuery["apiKey"]>
	searchQuery: QueryData<ApiQuery["searchQuery"]>
}

const initialState: ApiQueryFields = {
	searchQuery: { value: null, error: null },
	apiKey: { value: null, error: null },
	page: { value: 1, error: null },
}

export const {
	reducer: queryFieldsReducer,
	actions: queryFieldsActions,
} = createSlice({
	name: "Query fields",
	initialState,
	reducers: {
		setSearchQueryField: (state, action: PayloadAction<QueryData<Nullable<string>>>) => {
			state.searchQuery = action.payload;
			state.page = { value: 1, error: null }
		},
		setApiKeyField: (state, action: PayloadAction<QueryData<Nullable<string>>>) => {
			state.apiKey = action.payload;
		},
		setPageField: (state, action: PayloadAction<QueryData<number>>) => {
			state.page = action.payload;
		}
	},
})

export const { setSearchQueryField, setPageField, setApiKeyField } = queryFieldsActions;

export default queryFieldsReducer;
