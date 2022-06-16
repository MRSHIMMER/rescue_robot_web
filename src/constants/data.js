export const coordinate = {
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
      y: 2.0,
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

export const coordinate2 = {
  x: 2.0,
  y: 2.0,
};

export const test_command = {
  code: 1,
  type: "test",
  params: {
    params1: 10,
    params2: "参数2",
  },
};

export const forward_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "forward",
  },
};

export const back_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "back",
  },
};

export const left_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "left",
  },
};

export const right_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "right",
  },
};

export const stop_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "stop",
  },
};

export const start_move_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "startControl",
  },
};

export const stop_move_command = {
  code: 1,
  type: "move",
  params: {
    movetype: "stopControl",
  },
};

export const start_recognition_command = {
  code: 1,
  type: "recognition",
  params: {
    action: "startRecognition",
  },
};

export const get_items_command = {
  code: 1,
  type: "recognition",
  params: {
    action: "getItems",
  },
};

export const get_map_items_command = {
  code: 1,
  type: "getmap",
  params: {},
};

export const save_map_command = {
  code: 1,
  type: "savemap",
  params: {
    method: "temp",
    filename: "temp",
  },
};

export const load_map_command = {
  code: 1,
  type: "loadmap",
  params: {
    mapname: "temp",
  },
};

export const start_slam_command = {
  code: 1,
  type: "slam",
  params: {
    slammethod: "temp",
  },
};

export const stop_slam_command = {
  code: 1,
  type: "stopslam",
  params: {
    slammethod: "temp",
    mapname: "",
  },
};

export const start_nav_command = {
  code: 1,
  type: "navigation",
  params: {
    x: 0,
    y: 0,
    r: 0,
    // z: 0,
    // w: 0,
  },
};

export const start_nav_admin_command = {
  commandCode: 1,
  isSpecify: 1,
  robot: "spark",
  prior: 10,
  x: 0,
  y: 0,
  r: 0,
};

export const start_patrol_admin_command = {
  commandCode: 2,
  isSpecify: 1,
  robot: "spark",
  prior: 10,
  patrol_point: [],
};

export const stop_nav_command = {
  code: 1,
  type: "stopnavigation",
  params: {},
};

export const initial_pose_command = {
  code: 1,
  type: "initialpose",
  params: {
    pose: {},
  },
};

export let PatrolPoints = [];
