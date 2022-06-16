import { useScript } from "../hooks/useScript";
function PointCloud2() {
	useScript("https://static.robotwebtools.org/threejs/current/three.js");
	useScript(
		"https://static.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js"
	);
	useScript("https://static.robotwebtools.org/roslibjs/current/roslib.js");
	useScript("./ros3d.js");

	return <div>pointcloud2</div>;
}

export default PointCloud2;
