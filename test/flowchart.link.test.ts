/* eslint-disable quotes */
import { describe, expect, test } from "bun:test";

import { Flowchart } from "../modules";

describe("flowchart", () => {
  describe("link", () => {
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
      flowchart
        .link("a", "---", "b")
        .link("c", "----", "d")
        .link("e", "-----", "f")
        .link("g", "------", "h")
        .link("i", "-------", "j")
        .link("k", "-.->", "l")
        .link("m", "-..->", "n")
        .link("o", "-...->", "p")
        .link("q", "-....->", "r")
        .link("s", "-.....->", "t")
        .link("u", "==>", "v")
        .link("w", "===>", "x")
        .link("y", "====>", "z")
        .link("aa", "=====>", "bb")
        .link("cc", "======>", "dd")
        .link("ee", "~~~", "ff")
        .link("gg", "~~~~", "hh")
        .link("ii", "~~~~~", "jj")
        .link("kk", "~~~~~~", "ll")
        .link("mm", "~~~~~~~", "nn")
        .link("oo", "--o", "pp")
        .link("qq", "---o", "rr")
        .link("ss", "----o", "tt")
        .link("uu", "-----o", "vv")
        .link("ww", "------o", "xx")
        .link("yy", "--x", "zz")
        .link("aaa", "---x", "bbb")
        .link("ccc", "----x", "ddd")
        .link("eee", "-----x", "fff")
        .link("ggg", "------x", "hhh")
        .link("iii", "o--o", "jjj")
        .link("kkk", "o---o", "lll")
        .link("mmm", "o----o", "nnn")
        .link("ooo", "o-----o", "ppp")
        .link("qqq", "o------o", "rrr");

      const rendered = flowchart.render();

      expect(rendered).toEqual(`flowchart TD
a --- b
c ---- d
e ----- f
g ------ h
i ------- j
k -.-> l
m -..-> n
o -...-> p
q -....-> r
s -.....-> t
u ==> v
w ===> x
y ====> z
aa =====> bb
cc ======> dd
ee ~~~ ff
gg ~~~~ hh
ii ~~~~~ jj
kk ~~~~~~ ll
mm ~~~~~~~ nn
oo --o pp
qq ---o rr
ss ----o tt
uu -----o vv
ww ------o xx
yy --x zz
aaa ---x bbb
ccc ----x ddd
eee -----x fff
ggg ------x hhh
iii o--o jjj
kkk o---o lll
mmm o----o nnn
ooo o-----o ppp
qqq o------o rrr`);
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
});
