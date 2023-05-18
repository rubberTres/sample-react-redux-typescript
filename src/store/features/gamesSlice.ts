import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiQuery, GamesData, Nullable } from "types/types";
import { isNotNull } from "types/typeguards";

export interface DataState<T> {
	loading: boolean
	data: T
	error: boolean
}

const initialState: DataState<Nullable<GamesData>> = {
	loading: false,
	data: null,
	error: false,
}

const getGamesUrl = "https://api.rawg.io/api/games";

const getURL = ({ page, apiKey, searchQuery }: ApiQuery) => `
	${ getGamesUrl }
	?page_size=10
	&page=${ page }
	${ isNotNull(apiKey) ? `&key=${ apiKey }` : "" }
	${ isNotNull(searchQuery) ? `&search=${ searchQuery }` : "" }
`

export const fetchGames = createAsyncThunk(
	"fetchGames",
	async (apiQuery: ApiQuery) => {
		const response = await axios.get<GamesData>(getURL(apiQuery));
		return response.data;
	}
)

const { reducer: gamesReducer } = createSlice({
	name: "Games",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGames.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchGames.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchGames.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});
	},
});

export default gamesReducer;