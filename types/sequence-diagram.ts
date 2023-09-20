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

export type SequenceNoteLocation = "right of" | "left of" | "over";
export interface SequenceNote {
  type: "note";
  location: SequenceNoteLocation;
  text: string;
  participants: string[];
}

export type SequenceRegion = "loop" | "alt" | "else" | "opt" | "par" | "critical" | "and" | "break";
export interface SequenceRegionItem {
  type: SequenceRegion;
  text: string;
}

export type SequenceItemKey =
  | "participant"
  | "actor"
  | "message"
  | "box"
  | "end"
  | "activate"
  | "deactivate"
  | "note"
  | SequenceRegion;
export type SequenceItem =
  | SequenceParticipant
  | SequenceMessage
  | SequenceBox
  | SequenceEnd
  | SequenceActivation
  | SequenceNote
  | SequenceRegionItem;

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
   * @param participant The participant to activate
   */
  activate(participant: string): void;

  /**
   * Add a deactivation to the diagram
   * @param participant The participant to deactivate
   */
  deactivate(participant: string): void;

  /**
   * Add a note to the diagram
   * @param location The location of the note
   * @param participants The participants of the note
   * @param text The text of the note
   */
  note(location: SequenceNoteLocation, participants: string[], text: string): void;

  /**
   * Add a note over to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteOver(participants: string[], text: string): void;

  /**
   * Add a note left of to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteLeftOf(participants: string[], text: string): void;

  /**
   * Add a note right of to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteRightOf(participants: string[], text: string): void;

  /**
   * Render a note
   * @param note The note to render
   */
  renderNote(note: SequenceNote): string;

  /**
   * Add a region statement.
   * @param variant The variant of the region. This is used as the basis for loop, alt, else, opt, par and critical.
   * @param text The text of the region
   */
  region(variant: SequenceRegion, text: string): void;

  /**
   * Render a region statement
   * @param region The region to render
   */
  renderRegion(region: SequenceRegionItem): string;

  /**
   * Begin a loop region
   * @param text The text of the loop
   */
  loop(text: string): void;

  /**
   * Begin an alt region
   * @param text The text of the alt
   */
  alt(text: string): void;

  /**
   * Begin an else region
   * @param text The text of the else
   */
  else(text: string): void;

  /**
   * Begin an opt region
   * @param text The text of the opt
   */
  opt(text: string): void;

  /**
   * Begin a par region
   * @param text The text of the par
   */
  par(text: string): void;

  /**
   * Begin a critical region
   * @param text The text of the critical
   */
  critical(text: string): void;

  /**
   * Begin an and region
   * @param text The text of the and
   */
  and(text: string): void;

  /**
   * Begin a break region
   * @param text The text of the break
   */
  break(text: string): void;

  /**
   * Defines the render methods that are used for each item in the sequence diagram
   */
  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string>;
}
