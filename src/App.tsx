import GamesDisplayer from "components/GamesDisplayer";
import Header from "components/Header";
import PageInput from "components/PageInput";

function App() {

	return (
		<div>
			<Header/>
			<div className="content">
				<GamesDisplayer/>
				<PageInput/>
			</div>
		</div>
	);
}

export default App;