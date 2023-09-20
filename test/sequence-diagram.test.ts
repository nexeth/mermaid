import { describe, expect, test } from "bun:test";

import { SequenceDiagram } from "@/modules";

describe("Sequence Diagram", () => {
  describe("participant", () => {
    test("should add a participant", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      expect(diagram.sequence[0]).toMatchObject({ name: "Alice" });
    });

    test("should add multiple participants", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      diagram.addParticipant("Bob");
      expect(diagram.sequence[0]).toMatchObject({ name: "Alice" });
      expect(diagram.sequence[1]).toMatchObject({ name: "Bob" });
    });

    test("should support participant shorthand", () => {
      const diagram = new SequenceDiagram();
      diagram.participant("Alice");
      diagram.participant("Bob");
      expect(diagram.sequence[0]).toMatchObject({ name: "Alice" });
      expect(diagram.sequence[1]).toMatchObject({ name: "Bob" });
    });

    test("should render all participants", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      diagram.addParticipant("Bob");
      const render = diagram.render();
      expect(render).toContain("participant Alice");
      expect(render).toContain("participant Bob");
    });

    test("should render all participants with alias", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { type: "participant", alias: "A" });
      diagram.addParticipant("Bob", { type: "participant", alias: "B" });
      const render = diagram.render();
      expect(render).toContain("participant Alice as A");
      expect(render).toContain("participant Bob as B");
    });

    test("should render all participants with actor", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { type: "actor" });
      diagram.addParticipant("Bob", { type: "actor" });
      const render = diagram.render();
      expect(render).toContain("actor Alice");
      expect(render).toContain("actor Bob");
    });

    test("should render all participants with alias and actor", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { alias: "A", type: "actor" });
      diagram.addParticipant("Bob", { alias: "B", type: "actor" });
      const render = diagram.render();
      expect(render).toContain("actor Alice as A");
      expect(render).toContain("actor Bob as B");
    });

    test("should render all participants with create", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { type: "participant", create: true });
      diagram.addParticipant("Bob", { type: "participant", create: true });
      const render = diagram.render();
      expect(render).toContain("create participant Alice");
      expect(render).toContain("create participant Bob");
    });

    test("should render all participants with alias and create", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { alias: "A", type: "participant", create: true });
      diagram.addParticipant("Bob", { alias: "B", type: "participant", create: true });
      const render = diagram.render();
      expect(render).toContain("create participant Alice as A");
      expect(render).toContain("create participant Bob as B");
    });

    test("should render all participants with destroy", () => {
      const diagram = new SequenceDiagram();
      diagram.destroyParticipant("Alice");
      diagram.destroyParticipant("Bob");
      const render = diagram.render();
      expect(render).toContain("destroy Alice");
      expect(render).toContain("destroy Bob");
    });
  });

  describe("title", () => {
    test("should render title", () => {
      const diagram = new SequenceDiagram("Title");
      expect(diagram.render()).toContain("Title");
    });

    test("should not render title if not set", () => {
      const diagram = new SequenceDiagram();
      expect(diagram.render()).not.toContain("Title");
    });
  });

  describe("message", () => {
    test("should add a message", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->", "Bob", "Hello");
      expect(diagram.sequence[0]).toMatchObject({ from: "Alice", arrow: "->", to: "Bob", text: "Hello" });
    });

    test("should add multiple messages", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->", "Bob", "Hello");
      diagram.message("Bob", "->", "Alice", "Hi");
      expect(diagram.sequence[0]).toMatchObject({ from: "Alice", arrow: "->", to: "Bob", text: "Hello" });
      expect(diagram.sequence[1]).toMatchObject({ from: "Bob", arrow: "->", to: "Alice", text: "Hi" });
    });

    test("should render all messages", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->", "Bob", "Hello");
      diagram.message("Bob", "->", "Alice", "Hi");
      const render = diagram.render();
      expect(render).toContain("Alice->Bob: Hello");
      expect(render).toContain("Bob->Alice: Hi");
    });

    test("should render all messages with different arrows", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "-->", "Bob", "Hello");
      diagram.message("Bob", "-->>", "Alice", "Hi");
      diagram.message("Alice", "->>", "Bob", "Hello");
      diagram.message("Bob", "-x", "Alice", "Hi");
      diagram.message("Alice", "--x", "Bob", "Hello");
      diagram.message("Bob", "-)", "Alice", "Hi");
      diagram.message("Alice", "--)", "Bob", "Hello");
      const render = diagram.render();
      expect(render).toContain("Alice-->Bob: Hello");
      expect(render).toContain("Bob-->>Alice: Hi");
      expect(render).toContain("Alice->>Bob: Hello");
      expect(render).toContain("Bob-xAlice: Hi");
      expect(render).toContain("Alice--xBob: Hello");
      expect(render).toContain("Bob-)Alice: Hi");
      expect(render).toContain("Alice--)Bob: Hello");
    });

    test("should render all messages with activate", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->", "Bob", "Hello", { activate: true });
      diagram.message("Bob", "->", "Alice", "Hi", { activate: true });
      const render = diagram.render();
      expect(render).toContain("+A");
      expect(render).toContain("+B");
    });

    test("should render all messages with deactivate", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->", "Bob", "Hello", { deactivate: true });
      diagram.message("Bob", "->", "Alice", "Hi", { deactivate: true });
      const render = diagram.render();
      expect(render).toContain("-A");
      expect(render).toContain("-B");
    });

    test("should throw an error on messages with activate and deactivate", () => {
      const diagram = new SequenceDiagram();

      expect(() => {
        diagram.message("Alice", "->", "Bob", "Hello", { activate: true, deactivate: true });
      }).toThrow(new Error("Cannot activate and deactivate a message"));
    });
  });

  describe("box", () => {
    test("should add a box", () => {
      const diagram = new SequenceDiagram();
      diagram.box("Hello");
      expect(diagram.sequence[0]).toMatchObject({ text: "Hello" });
    });

    test("should add multiple boxes", () => {
      const diagram = new SequenceDiagram();
      diagram.box("Hello");
      diagram.box("Hi");
      expect(diagram.sequence[0]).toMatchObject({ text: "Hello" });
      expect(diagram.sequence[1]).toMatchObject({ text: "Hi" });
    });

    test("should render an end", () => {
      const diagram = new SequenceDiagram();
      diagram.box("Hello");
      diagram.end();
      const render = diagram.render();
      expect(render).toContain("end");
    });
  });

  describe("demo case", () => {
    test("should render demo case", () => {
      const diagram = new SequenceDiagram();
      diagram.message("Alice", "->>", "John", "Hello John, how are you?");
      diagram.message("John", "-->>", "Alice", "Great!");
      diagram.message("Alice", "-)", "John", "See you later!");

      // const render = diagram.render();
      // console.log(render);
    });
  });
});
