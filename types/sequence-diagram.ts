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
export interface SequenceMessageOptions {
  activate?: boolean;
  deactivate?: boolean;
}
export interface SequenceMessage extends SequenceMessageOptions {
  type: "message";
  from: string;
  to: string;
  arrow: SequenceMessageArrow;
  text: string;
}

export interface SequenceBoxOptions {
  color?: string;
}
export interface SequenceBox extends SequenceBoxOptions {
  type: "box";
  text: string;
}

export interface SequenceEnd {
  type: "end";
}

export interface SequenceActivation {
  type: "activate" | "deactivate";
  participant: string;
}

export type SequenceItemKey = "participant" | "actor" | "message" | "box" | "end" | "activate" | "deactivate";
export type SequenceItem = SequenceParticipant | SequenceMessage | SequenceBox | SequenceEnd | SequenceActivation;

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
   * @param options (optional) The options of the message
   */
  message(from: string, arrow: SequenceMessageArrow, to: string, text: string, options?: SequenceMessageOptions): void;

  /**
   * Render a message
   * @param message The message to render
   * @returns The rendered message
   */
  renderMessage(message: SequenceMessage): string;

  /**
   * Add a box to the diagram
   * @param text The text of the box
   * @param options (optional) The options of the box
   */
  box(text: string, options?: SequenceBoxOptions): void;

  /**
   * Render a box
   * @param box The box to render
   */
  renderBox(box: SequenceBox): string;

  /**
   * End the currently open box
   */
  end(): void;

  /**
   * Add an activation to the diagram
   */
  activate(participant: string): void;

  /**
   * Add a deactivation to the diagram
   */
  deactivate(participant: string): void;

  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string>;
}
