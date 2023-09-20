import { describe, expect, test } from "bun:test";

import { SequenceDiagram } from "@/modules";

describe("Sequence Diagram", () => {
  describe("participant", () => {
    test("should add a participant", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      expect(diagram.participants[0]).toMatchObject({ name: "Alice" });
    });

    test("should add multiple participants", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      diagram.addParticipant("Bob");
      expect(diagram.participants[0]).toMatchObject({ name: "Alice" });
      expect(diagram.participants[1]).toMatchObject({ name: "Bob" });
    });

    test("should support participant shorthand", () => {
      const diagram = new SequenceDiagram();
      diagram.participant("Alice");
      diagram.participant("Bob");
      expect(diagram.participants[0]).toMatchObject({ name: "Alice" });
      expect(diagram.participants[1]).toMatchObject({ name: "Bob" });
    });

    test("should not add duplicate participants", () => {
      const diagram = new SequenceDiagram();
      expect(diagram.participants).toHaveLength(0);
      diagram.addParticipant("Alice");
      expect(diagram.participants).toHaveLength(1);
      diagram.addParticipant("Alice");
      expect(diagram.participants).toHaveLength(1);
    });

    test("should remove a participant", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice");
      expect(diagram.participants[0]).toMatchObject({ name: "Alice" });
      expect(diagram.participants).toHaveLength(1);
      diagram.removeParticipant("Alice");
      expect(diagram.participants).toHaveLength(0);
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
      diagram.addParticipant("Alice", { alias: "A" });
      diagram.addParticipant("Bob", { alias: "B" });
      const render = diagram.render();
      expect(render).toContain("participant Alice as A");
      expect(render).toContain("participant Bob as B");
    });

    test("should render all participants with actor", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { actor: true });
      diagram.addParticipant("Bob", { actor: true });
      const render = diagram.render();
      expect(render).toContain("actor Alice");
      expect(render).toContain("actor Bob");
    });

    test("should render all participants with alias and actor", () => {
      const diagram = new SequenceDiagram();
      diagram.addParticipant("Alice", { alias: "A", actor: true });
      diagram.addParticipant("Bob", { alias: "B", actor: true });
      const render = diagram.render();
      expect(render).toContain("actor Alice as A");
      expect(render).toContain("actor Bob as B");
    });
  });
});
