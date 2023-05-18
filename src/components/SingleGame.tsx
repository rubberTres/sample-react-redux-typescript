import { SingleGameType } from "types/types";
import { isNotNull } from "types/typeguards";

type Props = {
	gameData: SingleGameType
}

const SingleGame = (props: Props) => {

	const {
		gameData: {
			name,
			background_image,
			platforms,
		}
	} = props;

	return (
		<div className="single-game">
			<img
				className="single-game__image"
				src={ background_image }
				alt="single-game-image"
			/>
			<div className="single-game__bottom">
				<span className="single-game__name">{ name }</span>
				{
					(platforms?.length !== 0 && isNotNull(platforms))
						&&
						<span className="single-game__platform">
							{ platforms[ 0 ]?.platform?.name ?? "" }
						</span>
				}
			</div>
		</div>
	)
}

export default SingleGame;