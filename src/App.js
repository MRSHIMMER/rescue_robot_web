import "./App.css";
import { getTopBanners } from "./services/recommend";
import { getTest, postTest, sendNavigationCommand } from "./services/rescue_robot_admin";

async function getMusic() {
	const res = await getTopBanners();
	console.log(res);
}

function App() {
	return (
		<div className="App">
			<p>rescue_robot_web</p>
			<button onClick={getTest}>get请求跨域</button>
			<button onClick={postTest}>post请求跨域</button>
			<button onClick={sendNavigationCommand}>发送导航命令</button>
			<button onClick={getMusic}>axios测试</button>
		</div>
	);
}

export default App;
