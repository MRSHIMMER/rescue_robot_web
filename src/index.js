import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import G6 from "@antv/g6";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const data = {
  id: "Modeling Methods",
  isWorking: 1,
  children: [
    {
      id: "Classification",
      children: [
        {
          id: "Logistic regression",
        },
        {
          id: "Linear discriminant analysis",
        },
        {
          id: "Rules",
        },
        {
          id: "Decision trees",
        },
        {
          id: "Naive Bayes",
        },
        {
          id: "K nearest neighbor",
        },
        {
          id: "Probabilistic neural network",
        },
        {
          id: "Support vector machine",
        },
      ],
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            {
              id: "Different initializations",
            },
            {
              id: "Different parameter choices",
            },
            {
              id: "Different architectures",
            },
            {
              id: "Different modeling methods",
            },
            {
              id: "Different training sets",
            },
            {
              id: "Different feature sets",
            },
          ],
        },
        {
          id: "Methods",
          children: [
            {
              id: "Classifier selection",
            },
            {
              id: "Classifier fusion",
            },
          ],
        },
        {
          id: "Common",
          children: [
            {
              id: "Bagging",
            },
            {
              id: "Boosting",
            },
            {
              id: "AdaBoost",
            },
          ],
        },
      ],
    },
    {
      id: "Regression",
      children: [
        {
          id: "Multiple linear regression",
        },
        {
          id: "Partial least squares",
        },
        {
          id: "Multi-layer feedforward neural network",
        },
        {
          id: "General regression neural network",
        },
        {
          id: "Support vector regression",
        },
      ],
    },
  ],
};

const container = document.getElementById("behavior_tree_display");
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

console.log(width, height);
const graph = new G6.TreeGraph({
  container: "behavior_tree_display",
  width,
  height,
  linkCenter: true,
  modes: {
    default: [
      {
        type: "collapse-expand",
        onChange: function onChange(item, collapsed) {
          const data = item.getModel();
          data.collapsed = collapsed;
          return true;
        },
      },
      "drag-canvas",
      "zoom-canvas",
    ],
  },
  defaultNode: {
    size: 26,
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
  },
  defaultEdge: {
    type: "cubic-vertical",
  },
  layout: {
    type: "compactBox",
    direction: "LR",
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 80;
    },
    getHGap: function getHGap() {
      return 20;
    },
  },
});

graph.node(function (node) {
  let position = "bottom";
  let rotate = 0;
  if (!node.children) {
    position = "bottom";
    rotate = Math.PI / 2;
  }
  return {
    label: node.name,
    style: {
      fill: node.status ? "#FFFF00" : "#87CEEB",
    },
    labelCfg: {
      position,
      offset: 5,
      style: {
        rotate,
        textAlign: "center",
        fill: node.status ? "#FF0000" : "#000000",
      },
    },
  };
});

if (typeof window !== "undefined")
  window.onresize = () => {
    if (!graph || graph.get("destroyed")) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };

let textTemp = "";
function renderTree() {
  const behaviorTreeDiv = document.getElementById("behavior_tree_info");
  let behaviorTreeDivText = behaviorTreeDiv.innerText;
  if (textTemp === behaviorTreeDivText) return;
  else textTemp = behaviorTreeDivText;
  console.log(behaviorTreeDivText);

  let treeTextObj = JSON.parse(behaviorTreeDivText);
  // console.log(treeTextObj);
  graph.data(treeTextObj);
  graph.render();
  graph.fitView();
  console.log("渲染行为树");
}

renderTree();
setInterval(renderTree, 1000);
