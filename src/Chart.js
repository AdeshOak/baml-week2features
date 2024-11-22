import React, { useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  getOutgoers,
  Background,
  getConnectedEdges,
  Handle,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import "./chartstyles.css";  // Import the CSS file

const CustomNode = ({ id, data }) => {
  const labelWidth = data.label.length * 10 + 20; // Adjust multiplier and base width as needed
  const nodeStyle = {
    width: `${labelWidth}px`,
  };

  return (
    <div className="custom-node" style={nodeStyle}>
      <Handle type="target" position="top" />
      <div style={{ marginRight: "10px" }}>{data.label}</div>
      <button onClick={() => data.onButtonClick(id)}>➡</button>
      <Handle type="source" position="bottom" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const CareerPathTreeChart = () => {
  const position = { x: 0, y: 0 };
  const initialNodes = [
    { id: "1", data: { label: "Reverse Engineering" }, position, type: "custom" },
    { id: "2", data: { label: "Brain" }, position, type: "custom" },
    { id: "3", data: { label: "Body" }, position, type: "custom" },
    { id: "4", data: { label: "Frontal Lobe" }, position, type: "custom" },
    { id: "5", data: { label: "Parietal Lobe" }, position, type: "custom" },
    { id: "6", data: { label: "Temporal Lobe" }, position, type: "custom" },
    { id: "7", data: { label: "Nervous System" }, position, type: "custom" },
    { id: "8", data: { label: "Sensory Organs" }, position, type: "custom" },
    { id: "9", data: { label: "Vision" }, position, type: "custom" },
  ];

  const initialEdges = [
    { id: "1->2", source: "1", target: "2" },
    { id: "1->3", source: "1", target: "3" },
    { id: "2->4", source: "2", target: "4" },
    { id: "2->5", source: "2", target: "5" },
    { id: "2->6", source: "2", target: "6" },
    { id: "3->7", source: "3", target: "7" },
    { id: "3->8", source: "3", target: "8" },
    { id: "8->9", source: "8", target: "9" },
  ];

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      // Calculate node width dynamically based on label length
      const labelWidth = node.data.label.length * 10 + 20; // Adjust multiplier and base width as needed
      node.width = labelWidth;
      node.height = 36; // Set node height (adjust as needed)
      dagreGraph.setNode(node.id, { width: labelWidth, height: node.height });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      node.position = {
        x: nodeWithPosition.x - node.width / 2,
        y: nodeWithPosition.y - node.height / 2,
      };
    });

    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
    "TB"
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [hidden, setHidden] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const infoSectionRef = useRef(null);
  const flowSectionRef = useRef(null);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const hide = (hidden, childEdgeID, childNodeID) => (nodeOrEdge) => {
    if (
      childEdgeID.includes(nodeOrEdge.id) ||
      childNodeID.includes(nodeOrEdge.id)
    )
      nodeOrEdge.hidden = hidden;
    return nodeOrEdge;
  };

  const checkTarget = (edge, id) => {
    let edges = edge.filter((ed) => {
      return ed.target !== id;
    });
    return edges;
  };

  let outgoers = [];
  let connectedEdges = [];
  let stack = [];

  const nodeClick = (some, node) => {
    let currentNodeID = node.id;
    stack.push(node);
    while (stack.length > 0) {
      let lastNode = stack.pop();
      let childnode = getOutgoers(lastNode, nodes, edges);
      let childedge = checkTarget(
        getConnectedEdges([lastNode], edges),
        currentNodeID
      );
      childnode.map((goer) => {
        stack.push(goer);
        outgoers.push(goer);
      });
      childedge.map((edge) => {
        connectedEdges.push(edge);
      });
    }

    let childNodeID = outgoers.map((node) => {
      return node.id;
    });
    let childEdgeID = connectedEdges.map((edge) => {
      return edge.id;
    });

    setNodes((node) => node.map(hide(hidden, childEdgeID, childNodeID)));
    setEdges((edge) => edge.map(hide(hidden, childEdgeID, childNodeID)));
    setHidden(!hidden);
  };

  const handleButtonClick = (id) => {
    const node = nodes.find((n) => n.id === id);
    setSelectedNode(node);
    infoSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const goBack = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const enhancedNodes = nodes.map((node) => ({
    ...node,
    data: { ...node.data, onButtonClick: handleButtonClick },
  }));

  return (
    <div>
      <div>
        <h4>Dynamic Expand & Collapse Flowchart</h4>
      </div>
      <div ref={flowSectionRef} className="layoutflow">
        <ReactFlow
          nodes={enhancedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          connectable={false}
          nodesDraggable={true}
          zoomOnScroll={false}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          panOnDrag={false}
          panOnScroll={false}
          onNodeClick={nodeClick}
          nodeTypes={nodeTypes}
          attributionPosition="bottom-right"
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div ref={infoSectionRef} className="information-section">
        <button onClick={goBack}>Go Back to Top</button>
        {selectedNode && (
          <div>
            <h3>Information about {selectedNode.data.label}</h3>
            <p>{selectedNode.data.label} - Detailed information here.</p>
          </div>
        )}
      </div>

      <div style={{ width: '100%', height: '100vh', border: 'none' }}>
      <iframe
  src="https://adeshoak.github.io/thebe-impl/lab/index.html"
  width="100%"
  height="100%"
  style={{ border: 'none' }}
  title="JupyterLite"
  sandbox="allow-scripts allow-same-origin"
/>

    </div>
    </div>
  );

  
};
