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

export type FlowchartLinkType = "-->" | "---" | "-.->" | "==>" | "~~~";
export interface FlowchartLink {
  type: "link";
  from: string;
  to: string;
  linkType: FlowchartLinkType;
  text?: string;
}

export type FlowchartItemKey = FlowchartNode["type"] | FlowchartLink["type"];
export type FlowchartItem = FlowchartNode | FlowchartLink;

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
   */
  node(id: string, text?: string, shape?: FlowchartShape): this;

  /**
   * Add a new link to the flowchart
   */
  link(from: string, linkType: string, to: string, text?: string): this;

  /**
   * Mapping of the node styling key to the node styling value
   */
  nodeMap: Record<FlowchartShape, { pre: string; post: string }>;

  /**
   * The map of flowchart item types to render functions
   */
  renderMap: Record<FlowchartItemKey, (props: FlowchartItem) => string>;
}
