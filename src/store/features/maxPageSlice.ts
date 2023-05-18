import { Nullable } from "types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGames } from "store/features/gamesSlice";

type MaxPageSize = {
	maxPageSize: Nullable<number>
}

const initialState: MaxPageSize = {
	maxPageSize: null
}

export const {
	reducer: maxPageSizeReducer,
	actions: maxPageSizeActions,
} = createSlice({
	name: "Max page size",
	initialState,
	reducers: {
		setMaxPageSize: (state, action: PayloadAction<number>) => {
			state.maxPageSize = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGames.fulfilled, (state, action) => {
			state.maxPageSize = Math.ceil(action.payload.count / 10);
		});
		builder.addCase(fetchGames.rejected, (state) => {
			state.maxPageSize = null;
		});
	},
});

export const { setMaxPageSize } = maxPageSizeActions;

export default maxPageSizeReducer;