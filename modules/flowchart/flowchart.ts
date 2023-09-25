import { AbstractMermaid } from "..";

import {
  FlowchartConstructor,
  FlowchartDirection,
  FlowchartInterface,
  FlowchartItem,
  FlowchartItemKey,
  FlowchartLink,
  FlowchartLinkType,
  FlowchartNode,
  FlowchartShape,
  FlowchartSubgraph,
  FlowchartType,
} from "@/types";

export class Flowchart extends AbstractMermaid implements FlowchartInterface {
  constructor(opt: FlowchartConstructor) {
    super();
    this.title = opt?.title;
    this.styles = opt?.styles;
    this.flowchartType = opt.flowchartType;
  }

  title?: string;

  styles?: string;

  flowchartType: FlowchartType;

  flowchart: FlowchartItem[] = [];

  node(id: string, text?: string, shape?: FlowchartShape): this {
    if (shape && !text) {
      throw new Error("Cannot have a node with a shape but no text");
    }
    if (!text) {
      this.flowchart.push({ type: "node", id });
      return this;
    }

    this.flowchart.push({ type: "node", id, text, shape: shape ?? "round" });
    return this;
  }

  nodeMap: Record<FlowchartShape, { pre: string; post: string }> = {
    round: { pre: "(", post: ")" },
    stadium: { pre: "([", post: "])" },
    subroutine: { pre: "[[", post: "]]" },
    cylindrical: { pre: "[(", post: ")]" },
    circle: { pre: "((", post: "))" },
    asymmetric: { pre: ">", post: "]" },
    rhombus: { pre: "{", post: "}" },
    hexagon: { pre: "{{", post: "}}" },
    parallelogram: { pre: "[/", post: "/]" },
    "parallelogram-alt": { pre: "[\\", post: "\\]" },
    trapezoid: { pre: "[/", post: "\\]" },
    "trapezoid-alt": { pre: "[\\", post: "/]" },
    "double-circle": { pre: "(((", post: ")))" },
  };

  renderNode(node: FlowchartNode): string {
    if (!node.text) {
      return node.id;
    }
    const { id, text, shape } = node;
    const { pre, post } = this.nodeMap[shape ?? "round"];
    return `${id}${pre}"${text}"${post}`;
  }

  link(from: string, linkType: FlowchartLinkType, to: string, text?: string | undefined): this {
    this.flowchart.push({ type: "link", from, linkType, to, text });
    return this;
  }

  renderLink(link: FlowchartLink): string {
    const { from, linkType, to, text } = link;
    return `${from} ${linkType}${text ? `|"${text}"|` : ""} ${to}`;
  }

  subgraph(id: string, title?: string): this {
    this.flowchart.push({ type: "subgraph", id, title });
    return this;
  }

  renderSubgraph(_subgraph: FlowchartSubgraph): string {
    return `subgraph ${_subgraph.id}${_subgraph.title ? ` ["${_subgraph.title}"]` : ""}`;
  }

  end(): this {
    this.flowchart.push({ type: "end" });
    return this;
  }

  direction(direction: FlowchartType): this {
    this.flowchart.push({ type: "direction", direction });
    return this;
  }

  renderDirection(direction: FlowchartDirection): string {
    return `direction ${direction.direction}`;
  }

  renderMap: Record<FlowchartItemKey, (item: FlowchartItem) => string> = {
    node: (item) => this.renderNode(item as FlowchartNode),
    link: (item) => this.renderLink(item as FlowchartLink),
    subgraph: (item) => this.renderSubgraph(item as FlowchartSubgraph),
    end: () => "end",
    direction: (item) => this.renderDirection(item as FlowchartDirection),
  };

  render(): string {
    const renderedItems = this.flowchart.map((item) => this.renderMap[item.type](item));

    return `flowchart ${this.flowchartType}\n${renderedItems.join("\n")}`;
  }

  reset(): void {
    this.flowchart = [];
  }
}
