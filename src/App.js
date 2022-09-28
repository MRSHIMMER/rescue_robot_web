import "./App.css";

import { sendCommandToSpark } from "./services/rescue_robot_admin";
import { getBanners, getTest, postTest } from "./utils/test";
import {
  startSlam,
  stopSlam,
  saveMap,
  loadMap,
  getMap,
  startNav,
  interval_btn,
  clear_interval,
  move_btn_click,
  initial_pose_func,
  stopNav,
  addPatrolPoint,
  startPatrolAdmin,
  change_keyboard_control,
  addTestItem,
} from "./utils/func";
import {
  test_command,
  start_move_command,
  stop_move_command,
  start_recognition_command,
  stop_recognition_command,
} from "./constants/data";

// 定型以后有时间抽成组件
function App() {
  return (
    <div>
      <div className="Grid">
        <div className="wrapper">
          <button onClick={getTest}>get请求跨域</button>
          <button onClick={postTest}>post请求跨域</button>
          <button onClick={getBanners}>axios测试连接</button>
          <button onClick={(e) => sendCommandToSpark(test_command)}>发送命令测试</button>
          <button onClick={getMap}>获取地图</button>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
          <div className="blank"></div>
        </div>
        <h2>连接测试</h2>
      </div>
      <div className="Grid" id="recognition_grid">
        <div className="wrapper" id="recognition_wrapper">
          <button onClick={(e) => sendCommandToSpark(start_recognition_command)}>
            开始识别
          </button>
          <div className="blank"></div>
          <button onClick={(e) => sendCommandToSpark(stop_recognition_command)}>
            结束识别
          </button>
        </div>
        <div id="detect_items"></div>
        <h2 id="items_h2">物体识别</h2>
      </div>

      <div className="Grid" id="slam_grid">
        <div className="wrapper" id="slam_wrapper">
          <select name="slam_method" id="slam_method">
            <option value="gmapping">gmapping</option>
            <option value="hector">hector</option>
            <option value="frontier_exploration">frontier_ex</option>
            <option value="karto">karto</option>
            <option value="rtab_map">rtab</option>
          </select>
          <input type="text" id="save_map_path" placeholder="保存map文件名" />
          <button onClick={saveMap}>保存地图 </button>
          <input type="text" id="nav_x_y" placeholder="x/y/r" />
          <button onClick={startSlam}>开始SLAM</button>
          <select name="load_map_name" id="load_map_name">
            <option value="blank">无</option>
          </select>
          <button onClick={loadMap}>加载地图 </button>
          <button onClick={startNav}>开始导航</button>
          <button onClick={stopSlam}>结束SLAM</button>
          <input type="text" id="initial_pose" placeholder="初始化pose" />

          <button onClick={initial_pose_func}>初始化位置</button>
          <button onClick={stopNav}>结束导航</button>

          {/* <input type="text" id="load_map_path" placeholder="加载map文件名" /> */}
        </div>
        <h2>建图与导航</h2>
      </div>
      <div className="Grid">
        <div className="wrapper">
          <button
            id="keyboard_control"
            className="open_keyboard_control"
            onClick={() => change_keyboard_control()}
          >
            打开键盘控制
          </button>
          <button
            onClick={() => move_btn_click("forward")}
            onMouseDown={() => interval_btn("forward")}
            onMouseUp={() => clear_interval()}
          >
            前
          </button>
          <div className="blank"></div>
          <button
            onClick={() => move_btn_click("left")}
            onMouseDown={() => interval_btn("left")}
            onMouseUp={() => clear_interval()}
          >
            左
          </button>
          <button
            onClick={() => move_btn_click("stop")}
            onMouseDown={() => interval_btn("stop")}
            onMouseUp={() => clear_interval()}
          >
            停
          </button>
          <button
            onClick={() => move_btn_click("right")}
            onMouseDown={() => interval_btn("right")}
            onMouseUp={() => clear_interval()}
          >
            右
          </button>
          <button onClick={(e) => sendCommandToSpark(start_move_command)}>
            连接控制
          </button>
          <button
            onClick={() => move_btn_click("back")}
            onMouseDown={() => interval_btn("back")}
            onMouseUp={() => clear_interval()}
          >
            后
          </button>
          <button onClick={(e) => sendCommandToSpark(stop_move_command)}>断开控制</button>
        </div>
        <h2>移动控制</h2>
      </div>
      <div className="Grid">
        <div className="wrapper">
          <input type="text" id="add_test_item" placeholder="x/y/r/temp/name" />
          <button onClick={addTestItem}>添加测试物品</button>
          <button onClick={() => console.log("todo")}>停止巡逻</button>
          <input type="text" id="patrol_x_y_r" placeholder="x/y/r" />
          <button onClick={addPatrolPoint}>添加巡逻点</button>
          <button onClick={startPatrolAdmin}>开始巡逻</button>
        </div>
        <div id="points"></div>
        <h2>救援任务</h2>
      </div>
      <div className="Grid" style={{ visibility: "hidden" }}></div>
      <div className="Grid" id="info_display">
        <div id="info_items"></div>
        <h2>反馈信息</h2>
      </div>
    </div>
  );
}

export default App;
