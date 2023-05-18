import { ApiQueryFields, QueryData } from "store/features/searchQuerySlice";

export type Nullable<T> = null | undefined | T;

type ShortScreenshot = {
	id: number
	image: string
}

type Platform = {
	name: string
	slug: string
}

export type ApiQuery = {
	page: number
	apiKey: Nullable<string>
	searchQuery: Nullable<string>
}

export type SetQueryFieldsPayload = {
	page?: QueryData<number>
	apiKey?: ApiQueryFields["apiKey"]
	searchQuery?: ApiQueryFields["searchQuery"]
}

type Platforms = { platform: Platform };

export type SingleGameType = {
	id: number
	slug: string
	name: string
	released: string
	background_image: string
	rating: number
	ratings_count: number
	added: number
	short_sreenshots: ShortScreenshot[]
	platforms: Nullable<Platforms[]>
}

export type GamesData = {
	count: number
	next: string
	previous: string
	results: SingleGameType[]
}
