/* eslint-disable quotes */
import { describe, expect, test } from "bun:test";

import { Flowchart } from "@/modules";

describe("Flowchart", () => {
  describe("constructor", () => {
    test("should be able to create a flowchart", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart).toBeInstanceOf(Flowchart);
    });

    test("should be able to create a flowchart with title", () => {
      const flowchart = new Flowchart({ flowchartType: "TD", title: "title" });
      expect(flowchart.title).toEqual("title");
    });

    test("should be able to create a flowchart with styles", () => {
      const flowchart = new Flowchart({ flowchartType: "TD", styles: "styles" });
      expect(flowchart.styles).toEqual("styles");
    });

    test("should be able to create a flowchart with flowchartType TD", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.flowchartType).toEqual("TD");
    });

    test("should be able to create a flowchart with flowchartType TB", () => {
      const flowchart = new Flowchart({ flowchartType: "TB" });
      expect(flowchart.flowchartType).toEqual("TB");
    });

    test("should be able to create a flowchart with flowchartType BT", () => {
      const flowchart = new Flowchart({ flowchartType: "BT" });
      expect(flowchart.flowchartType).toEqual("BT");
    });

    test("should be able to create a flowchart with flowchartType RL", () => {
      const flowchart = new Flowchart({ flowchartType: "RL" });
      expect(flowchart.flowchartType).toEqual("RL");
    });

    test("should be able to create a flowchart with flowchartType LR", () => {
      const flowchart = new Flowchart({ flowchartType: "LR" });
      expect(flowchart.flowchartType).toEqual("LR");
    });

    test("should be able to create a flowchart with flowchartType TD", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.flowchartType).toEqual("TD");
    });
  });

  describe("node", () => {
    test("should be able to add a node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a" }]);
    });

    test("should be able to add a node with text", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "round" }]);
    });

    test("should be able to add a node with shape", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "stadium");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "stadium" }]);
    });

    test("should not be able to add a node with shape and no text", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(() => {
        flowchart.node("a", undefined, "stadium");
      }).toThrow(new Error("Cannot have a node with a shape but no text"));
    });

    test("should be able to add a round node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "round");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "round" }]);
    });

    test("should be able to add a stadium node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "stadium");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "stadium" }]);
    });

    test("should be able to add a subroutine node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "subroutine");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "subroutine" }]);
    });

    test("should be able to add a cylindrical node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "cylindrical");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "cylindrical" }]);
    });

    test("should be able to add a circle node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "circle");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "circle" }]);
    });

    test("should be able to add a asymmetric node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "asymmetric");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "asymmetric" }]);
    });

    test("should be able to add a rhombus node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "rhombus");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "rhombus" }]);
    });

    test("should be able to add a hexagon node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "hexagon");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "hexagon" }]);
    });

    test("should be able to add a parallelogram node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "parallelogram");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "parallelogram" }]);
    });

    test("should be able to add a parallelogram-alt node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "parallelogram-alt");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "parallelogram-alt" }]);
    });

    test("should be able to add a trapezoid node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "trapezoid");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "trapezoid" }]);
    });

    test("should be able to add a trapezoid-alt node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "trapezoid-alt");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "trapezoid-alt" }]);
    });

    test("should be able to add a double-circle node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "text", "double-circle");
      expect(flowchart.flowchart).toEqual([{ type: "node", id: "a", text: "text", shape: "double-circle" }]);
    });

    test("should be able to render a round node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "round" })).toEqual(`a("text")`);
    });

    test("should be able to render a stadium node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "stadium" })).toEqual(`a(["text"])`);
    });

    test("should be able to render a subroutine node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "subroutine" })).toEqual(`a[["text"]]`);
    });

    test("should be able to render a cylindrical node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "cylindrical" })).toEqual(
        `a[("text")]`
      );
    });

    test("should be able to render a circle node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "circle" })).toEqual(`a(("text"))`);
    });

    test("should be able to render a asymmetric node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "asymmetric" })).toEqual(`a>"text"]`);
    });

    test("should be able to render a rhombus node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "rhombus" })).toEqual(`a{"text"}`);
    });

    test("should be able to render a hexagon node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "hexagon" })).toEqual(`a{{"text"}}`);
    });

    test("should be able to render a parallelogram node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "parallelogram" })).toEqual(
        `a[/"text"/]`
      );
    });

    test("should be able to render a parallelogram-alt node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "parallelogram-alt" })).toEqual(
        `a[\\"text"\\]`
      );
    });

    test("should be able to render a trapezoid node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "trapezoid" })).toEqual(`a[/"text"\\]`);
    });

    test("should be able to render a trapezoid-alt node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "trapezoid-alt" })).toEqual(
        `a[\\"text"/]`
      );
    });

    test("should be able to render a double-circle node", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderNode({ type: "node", id: "a", text: "text", shape: "double-circle" })).toEqual(
        `a((("text")))`
      );
    });

    test("should render all node shapes", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "round", "round");
      flowchart.node("b", "stadium", "stadium");
      flowchart.node("c", "subroutine", "subroutine");
      flowchart.node("d", "cylindrical", "cylindrical");
      flowchart.node("e", "circle", "circle");
      flowchart.node("f", "asymmetric", "asymmetric");
      flowchart.node("g", "rhombus", "rhombus");
      flowchart.node("h", "hexagon", "hexagon");
      flowchart.node("i", "parallelogram", "parallelogram");
      flowchart.node("j", "parallelogram-alt", "parallelogram-alt");
      flowchart.node("k", "trapezoid", "trapezoid");
      flowchart.node("l", "trapezoid-alt", "trapezoid-alt");
      flowchart.node("m", "double-circle", "double-circle");

      const rendered = flowchart.render();

      expect(rendered).toEqual(`flowchart TD
a("round")
b(["stadium"])
c[["subroutine"]]
d[("cylindrical")]
e(("circle"))
f>"asymmetric"]
g{"rhombus"}
h{{"hexagon"}}
i[/"parallelogram"/]
j[\\"parallelogram-alt"\\]
k[/"trapezoid"\\]
l[\\"trapezoid-alt"/]
m((("double-circle")))`);
    });
  });

  describe.only("link", () => {
    test("should be able to add a link", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-->", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "-->", to: "b" }]);
    });

    test("should be able to add a link with text", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-->", "b", "text");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "-->", to: "b", text: "text" }]);
    });

    test("should be able to add a link with linkType -->", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-->", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "-->", to: "b" }]);
    });

    test("should be able to add a link with linkType ---", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "---", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "---", to: "b" }]);
    });

    test("should be able to add a link with linkType -.->", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-.->", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "-.->", to: "b" }]);
    });

    test("should be able to add a link with linkType ==>", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "==>", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "==>", to: "b" }]);
    });

    test("should be able to add a link with linkType ~~~", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "~~~", "b");
      expect(flowchart.flowchart).toEqual([{ type: "link", from: "a", linkType: "~~~", to: "b" }]);
    });

    test("should be able to render a link", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderLink({ type: "link", from: "a", linkType: "-->", to: "b" })).toEqual(`a --> b`);
    });

    test("should be able to render a link with text", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      expect(flowchart.renderLink({ type: "link", from: "a", linkType: "-->", to: "b", text: "text" })).toEqual(
        `a -->|"text"| b`
      );
    });

    test("should render all link types", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-->", "b");
      flowchart.link("c", "---", "d");
      flowchart.link("e", "-.->", "f");
      flowchart.link("g", "==>", "h");
      flowchart.link("i", "~~~", "j");

      const rendered = flowchart.render();

      expect(rendered).toEqual(`flowchart TD
a --> b
c --- d
e -.-> f
g ==> h
i ~~~ j`);
    });

    test("should be able to render all link types with text", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.link("a", "-->", "b", "text");
      flowchart.link("c", "---", "d", "text");
      flowchart.link("e", "-.->", "f", "text");
      flowchart.link("g", "==>", "h", "text");
      flowchart.link("i", "~~~", "j", "text");

      const rendered = flowchart.render();

      expect(rendered).toEqual(`flowchart TD
a -->|"text"| b
c ---|"text"| d
e -.->|"text"| f
g ==>|"text"| h
i ~~~|"text"| j`);
    });
  });

  describe("render", () => {
    test("should be able to render a flowchart", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a");
      flowchart.node("b");
      flowchart.node("c");
      expect(flowchart.render()).toEqual(`flowchart TD
a
b
c`);
    });

    test("should support markdown", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a", "`text is _italic_`");
      expect(flowchart.render()).toEqual(`flowchart TD
a("\`text is _italic_\`")`);
    });
  });

  describe("reset", () => {
    test("should be able to reset a flowchart", () => {
      const flowchart = new Flowchart({ flowchartType: "TD" });
      flowchart.node("a");
      flowchart.node("b");
      flowchart.node("c");
      expect(flowchart.flowchart).toEqual([
        { type: "node", id: "a" },
        { type: "node", id: "b" },
        { type: "node", id: "c" },
      ]);
      flowchart.reset();
      expect(flowchart.flowchart).toEqual([]);
    });
  });
});
