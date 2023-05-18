import Input, { InputType } from "components/Input";
import { useAppDispatch, useAppSelector } from "store/hooks";
import classNames from "classnames";
import { isNotNull, isNull } from "types/typeguards";
import { setPageField } from "store/features/searchQuerySlice";
import { fetchGames } from "store/features/gamesSlice";

const PageInput = () => {

	const dispatch = useAppDispatch();

	const {
		queryFields: {
			apiKey,
			page,
			searchQuery,
		},
		maxPageSize: { maxPageSize },
	} = useAppSelector(state => state);

	const isInputDisabled = apiKey.value === "" || isNull(apiKey.value);

	const onPageInputChange = (value: string) => {
		const newValue = Math.floor(Number(value));
		if (isNotNull(maxPageSize) && newValue > maxPageSize) {
			dispatch(setPageField({ ...page, error: `Maximum value is ${ maxPageSize }` }))
			return;
		}
		if (newValue < 1) {
			dispatch(setPageField({ ...page, error: "Minimal value is 1" }))
			return;
		}
		dispatch(setPageField({ value: newValue, error: null }))
		dispatch(fetchGames({
			searchQuery: searchQuery.value,
			apiKey: apiKey.value,
			page: newValue,
		}));
	}

	return (
		<Input
			disabled={ isNull(maxPageSize) }
			label="Go on page"
			className={ classNames("page-input", { "input--error": isNotNull(page.error), "input--disabled": isInputDisabled }) }
			value={ page.value.toString() ?? "" }
			error={ page.error }
			type={ InputType.NUMBER }
			onChange={ onPageInputChange }
			errorMessageBackgroundColor="#121212"
		/>
	)
}

export default PageInput