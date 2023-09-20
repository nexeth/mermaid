import { Mermaid } from "./mermaid";

export interface SequenceParticipant {
  name: string;
  alias?: string;
  actor?: boolean;
}

export type SequenceMessage = "->" | "-->" | "-->>" | "->>" | "-x" | "--x" | "-)" | "--)";

export interface SequenceDiagramInterface extends Mermaid {
  /**
   * The name of all participants in the diagram
   */
  participants: SequenceParticipant[];

  /**
   * Add a participant to the diagram
   * @param name The name of the participant
   * @param options (optional) The options of the participant
   */
  addParticipant(name: string, options?: Omit<SequenceParticipant, "name">): void;

  /**
   * Edit the name of a participant
   * @param oldName The old name of the participant
   * @param newName The new name of the participant
   */
  editParticipant(oldParticipantName: string, newParticipant: SequenceParticipant): void;

  /**
   * Remove a participant from the diagram
   * @param participant The name of the participant
   */
  removeParticipant(participant: string): void;
}
