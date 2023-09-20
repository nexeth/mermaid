import { Mermaid } from "./mermaid";

export interface ParticipantOptions {
  type: "participant" | "actor";
  alias?: string;
  create?: boolean;
  destroy?: boolean;
}
export interface SequenceParticipant extends ParticipantOptions {
  name: string;
}

export type SequenceMessageArrow = "->" | "-->" | "-->>" | "->>" | "-x" | "--x" | "-)" | "--)";
export interface SequenceMessage {
  type: "message";
  from: string;
  to: string;
  arrow: SequenceMessageArrow;
  text: string;
}

export type SequenceItemKey = "participant" | "actor" | "message";
export type SequenceItem = SequenceParticipant | SequenceMessage;

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
  addParticipant(name: string, options?: ParticipantOptions): void;

  /**
   * Add a participant to the diagram (shorthand)
   * @param name The name of the participant
   * @param options (optional) The options of the participant
   */
  participant(name: string, options?: ParticipantOptions): void;

  /**
   * Destroy a participant
   * @param name The name of the participant
   */
  destroyParticipant(name: string): void;

  /**
   * Render a participant
   * @param participant The participant to render
   */
  renderParticipant(participant: SequenceParticipant): string;

  /**
   * Add a message to the diagram
   * @param from The name of the sender
   * @param arrow The arrow type
   * @param to The name of the receiver
   * @param text The message
   */
  message(from: string, arrow: SequenceMessageArrow, to: string, text: string): void;

  /**
   * Render a message
   * @param message The message to render
   * @returns The rendered message
   */
  renderMessage(message: SequenceMessage): string;

  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string>;
}
