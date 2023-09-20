import { type } from "os";

import { Mermaid } from "./mermaid";

export interface SequenceParticipant {
  type: "participant" | "actor";
  name: string;
  alias?: string;
}

export type SequenceMessage = "->" | "-->" | "-->>" | "->>" | "-x" | "--x" | "-)" | "--)";

export type SequenceItemKey = "participant" | "actor" | "message";
export type SequenceItem = SequenceParticipant;

export interface SequenceDiagramInterface extends Mermaid {
  /**
   * The current sequence diagram sequence
   */
  sequence: SequenceItem[];

  /**
   * Add a participant to the diagram
   * @param name The name of the participant
   * @param options (optional) The options of the participant
   */
  addParticipant(name: string, options?: { type?: "participant" | "actor"; alias?: string }): void;

  /**
   * Add a participant to the diagram (shorthand)
   * @param name The name of the participant
   * @param options (optional) The options of the participant
   */
  participant(name: string, options?: { type?: "participant" | "actor"; alias?: string }): void;
}
