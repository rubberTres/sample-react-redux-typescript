import { useAppSelector } from "store/hooks";
import { isNotNull, isNull } from "types/typeguards";
import SingleGame from "components/SingleGame";
import ReactLoading from "react-loading";
import classNames from "classnames";

const GamesDisplayer = () => {

	const {
		games: {
			loading,
			data: gamesData,
			error,
		},
		queryFields: {
			apiKey,
		}
	} = useAppSelector(state => state);

	const getContent = () => {
		if (apiKey.value === "" || isNull(apiKey.value)) {
			return <span>Please enter Api Key</span>
		}
		if (error) {
			return <span>Something went wrong</span>
		}
		if (loading) {
			return (
				<ReactLoading
					type="spin"
					color="#b7bbbf"
					height={ 100 }
					width={ 100 }
				/>
			)
		}
		if (isNotNull(gamesData)) {
			if (gamesData.results.length === 0) {
				return <span>No games found</span>;
			}
			return (
				<>
					{
						gamesData.results.map(singleGame => <SingleGame key={ singleGame.id } gameData={ singleGame }/>)
					}
				</>
			)
		}
		return <span>No games found</span>
	}

	return (
		<div
			className={
				classNames(
					"games-displayer",
					{ "games-displayer--grid": isNotNull(gamesData) && gamesData.results.length !== 0 && !loading && !error && !(apiKey.value === "" || isNull(apiKey.value)) }
				)
			}
		>
			{ getContent() }
		</div>
	)
}

export default GamesDisplayer;