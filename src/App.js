import "./App.css";
import { getTopBanners } from "./services/recommend";
import {
	getTest,
	postTest,
	sendNavigationCommand,
	sendNavigationCommand2,
	sendPatrolCommand,
} from "./services/rescue_robot_admin";

async function getMusic() {
	const res = await getTopBanners();
	alert(res);
	console.log(res);
}

let coordinate = {
	header: {
		seq: 1,
		stamp: {
			secs: 1,
			nsecs: 1000,
		},
		frame_id: "map",
	},
	pose: {
		position: {
			x: 2.0,
			y: 0.0,
			z: 0.0,
		},
		orientation: {
			x: 0.0,
			y: 0.0,
			z: 0.722315999254,
			w: 0.0,
		},
	},
};

function App() {
	return (
		<div className="App">
			<p>rescue_robot_web</p>
			<button onClick={getTest}>get请求跨域</button>
			<button
				onClick={async (e) => {
					const rep = await postTest();
					alert(rep);
					console.log(rep);
				}}
			>
				post请求跨域
			</button>
			<button onClick={sendNavigationCommand}>发送导航命令</button>
			<button onClick={(e) => sendNavigationCommand2(coordinate)}>发送导航命令2</button>
			<button onClick={sendPatrolCommand}>发送巡逻命令</button>
			<button onClick={getMusic}>axios测试</button>
		</div>
	);
}

export default App;
