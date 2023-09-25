import { Mermaid } from "./mermaid";

export type FlowchartShape =
  | "round"
  | "stadium"
  | "subroutine"
  | "cylindrical"
  | "circle"
  | "asymmetric"
  | "rhombus"
  | "hexagon"
  | "parallelogram"
  | "parallelogram-alt"
  | "trapezoid"
  | "trapezoid-alt"
  | "double-circle";

export interface FlowchartNode {
  type: "node";
  id: string;
  shape?: FlowchartShape;
  text?: string;
}

export type FlowchartLinkType =
  | "---"
  | "----"
  | "-----"
  | "------"
  | "-------"
  | "-.->"
  | "-..->"
  | "-...->"
  | "-....->"
  | "-.....->"
  | "==>"
  | "===>"
  | "====>"
  | "=====>"
  | "======>"
  | "~~~"
  | "~~~~"
  | "~~~~~"
  | "~~~~~~"
  | "~~~~~~~"
  | "--o"
  | "---o"
  | "----o"
  | "-----o"
  | "------o"
  | "--x"
  | "---x"
  | "----x"
  | "-----x"
  | "------x"
  | "o--o"
  | "o---o"
  | "o----o"
  | "o-----o"
  | "o------o"
  | "<-->"
  | "<--->"
  | "<---->"
  | "<----->"
  | "<------>"
  | "x--x"
  | "x---x"
  | "x----x"
  | "x-----x"
  | "x------x"
  | "-->"
  | "--->"
  | "---->"
  | "----->"
  | "------>";

export interface FlowchartLink {
  type: "link";
  from: string;
  to: string;
  linkType: FlowchartLinkType;
  text?: string;
}

export interface FlowchartSubgraph {
  type: "subgraph";
  id: string;
  title?: string;
}

export interface FlowchartEnd {
  type: "end";
}

export interface FlowchartDirection {
  type: "direction";
  direction: FlowchartType;
}

export interface FlowchartComment {
  type: "comment";
  text: string;
}

export type FlowchartItemKey =
  | FlowchartNode["type"]
  | FlowchartLink["type"]
  | FlowchartSubgraph["type"]
  | FlowchartEnd["type"]
  | FlowchartDirection["type"]
  | FlowchartComment["type"];
export type FlowchartItem =
  | FlowchartNode
  | FlowchartLink
  | FlowchartSubgraph
  | FlowchartEnd
  | FlowchartDirection
  | FlowchartComment;

/**
 * Possible FlowChart orientations are:
 * TB - Top to bottom
 * TD - Top-down/ same as top to bottom
 * BT - Bottom to top
 * RL - Right to left
 * LR - Left to right
 */
export type FlowchartType = "TB" | "TD" | "BT" | "RL" | "LR";

export interface FlowchartConstructor {
  title?: string;
  styles?: string;
  flowchartType: FlowchartType;
}

/**
 * Flowcharts are composed of nodes (geometric shapes) and edges (arrows or lines). The Mermaid code defines how nodes and edges are made and accommodates different arrow types, multi-directional arrows, and any linking to and from subgraphs.
 */
export interface FlowchartInterface extends Mermaid {
  /**
   * The current flowchart
   */
  flowchart: FlowchartItem[];

  /**
   * The type of flowchart which determines the direction of flow
   */
  flowchartType: FlowchartType;

  /**
   * Add a new node to the flowchart
   * @param id The id of the node
   * @param text The text to display on the node
   * @param shape The shape of the node
   */
  node(id: string, text?: string, shape?: FlowchartShape): this;

  /**
   * Add a new link to the flowchart
   * @param from The id of the node to link from
   * @param linkType The type of link to use
   * @param to The id of the node to link to
   * @param text The text to display on the link
   */
  link(from: string, linkType: string, to: string, text?: string): this;

  /**
   * Start a new subgraph
   * @param id The id of the subgraph
   * @param title The title of the subgraph
   */
  subgraph(id: string, title?: string): this;

  /**
   * End the currently open section
   */
  end(): this;

  /**
   * Set the direction of the flowchart or subgraph. This will inline the direction statement in the flowchart code.
   */
  direction(direction: FlowchartType): this;

  /**
   * Mapping of the node styling key to the node styling value
   */
  nodeMap: Record<FlowchartShape, { pre: string; post: string }>;

  /**
   * The map of flowchart item types to render functions
   */
  renderMap: Record<FlowchartItemKey, (props: FlowchartItem) => string>;
}
