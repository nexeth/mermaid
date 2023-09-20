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
});
