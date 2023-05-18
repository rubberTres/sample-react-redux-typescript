import Input, { InputType } from "components/Input";
import searchIcon from "assets/search.svg";
import keyIcon from "assets/key.svg";
import logo from "assets/logo.png";
import { debounce } from "lodash";
import { isNotNull, isNull } from "types/typeguards";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchGames } from "store/features/gamesSlice";
import { setApiKeyField, setSearchQueryField } from "store/features/searchQuerySlice";

const Header = () => {

	const dispatch = useAppDispatch();

	const { searchQuery, apiKey, page } = useAppSelector(state => state.queryFields);

	const onApiKeyChange = (value: string) => {
		if (value !== "" && searchQuery.value !== "" && isNotNull(searchQuery.value)) {
			dispatch(setApiKeyField({ value, error: null }));
			dispatch(fetchGames({
				searchQuery: searchQuery.value,
				apiKey: value,
				page: page.value,
			}));
		}
		if (value !== "") {
			dispatch(setApiKeyField({ value, error: null }));
			return;
		}
		dispatch(setApiKeyField({ value, error: "Please enter Api key" }));
	};

	const debouncedSearch = debounce((value: string) => {
		dispatch(setSearchQueryField({ ...searchQuery, value }));
		if (apiKey.value === "" || isNull(apiKey.value)) {
			dispatch(setApiKeyField({ ...apiKey, error: "Please enter Ap key" }));
			return;
		}
		dispatch(fetchGames({
			searchQuery: value,
			apiKey: apiKey.value,
			page: 1,
		}));
	}, 300);

	const searchQueryDebounceChange = (value: string) => {
		debouncedSearch(value);
	};

	return (
		<div className="header">
			<img src={ logo } alt="Logo" className="header__logo"/>
			<Input
				icon={ searchIcon }
				type={ InputType.TEXT }
				value={ searchQuery.value ?? "" }
				onChange={ searchQueryDebounceChange }
				error={ searchQuery.error }
				errorMessageBackgroundColor="#272727"
				placeholder="Game name"
			/>
			<Input
				icon={ keyIcon }
				type={ InputType.PASSWORD }
				value={ apiKey.value ?? "" }
				onChange={ onApiKeyChange }
				error={ apiKey.error }
				errorMessageBackgroundColor="#272727"
				placeholder="Api key"
			/>
		</div>
	);
};

export default Header;