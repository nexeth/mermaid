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

export interface SequenceRect {
  type: "rect";
  color: string;
}

export interface SequenceComment {
  type: "comment";
  text: string;
}

export interface SequenceCustom {
  type: "custom";
  text: string;
}

export type SequenceItemKey =
  | SequenceParticipant["type"]
  | SequenceMessage["type"]
  | SequenceBox["type"]
  | SequenceEnd["type"]
  | SequenceActivation["type"]
  | SequenceNote["type"]
  | SequenceRegionItem["type"]
  | SequenceRect["type"]
  | SequenceComment["type"]
  | SequenceCustom["type"]
  | SequenceRegion;
export type SequenceItem =
  | SequenceParticipant
  | SequenceMessage
  | SequenceBox
  | SequenceEnd
  | SequenceActivation
  | SequenceNote
  | SequenceRegionItem
  | SequenceRect
  | SequenceComment
  | SequenceCustom;

export interface SequenceDiagramConstructor {
  /**
   * The title of the diagram
   */
  title?: string;
  /**
   * Use autonumbering for the diagram
   */
  autonumber?: boolean;
  /**
   * Custom styles
   */
  styles?: string;
}

export interface SequenceDiagramInterface extends Mermaid {
  /**
   * The current sequence diagram sequence
   */
  sequence: SequenceItem[];

  /**
   * Whether to use autonumbering for the diagram
   */
  autonumber?: boolean;

  /**
   * Custom styles to apply to elements in the diagram
   */
  styles?: string;

  /**
   * Add a participant to the diagram (shorthand)
   * @param name The name of the participant
   * @param options (optional) The options of the participant
   */
  participant(name: string, options?: ParticipantOptions): this;

  /**
   * Add an actor to the diagram (shorthand)
   * @param name The name of the actor
   * @param options (optional) The options of the actor
   */
  actor(name: string, options?: ParticipantOptions): this;

  /**
   * Destroy a participant
   * @param name The name of the participant
   */
  destroyParticipant(name: string): this;

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
  message(from: string, arrow: SequenceMessageArrow, to: string, text: string, options?: SequenceMessageOptions): this;

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
  box(text: string, options?: SequenceBoxOptions): this;

  /**
   * Render a box
   * @param box The box to render
   */
  renderBox(box: SequenceBox): string;

  /**
   * End the currently open box
   */
  end(): this;

  /**
   * Add an activation to the diagram
   * @param participant The participant to activate
   */
  activate(participant: string): this;

  /**
   * Add a deactivation to the diagram
   * @param participant The participant to deactivate
   */
  deactivate(participant: string): this;

  /**
   * Add a note to the diagram
   * @param location The location of the note
   * @param participants The participants of the note
   * @param text The text of the note
   */
  note(location: SequenceNoteLocation, participants: string[], text: string): this;

  /**
   * Add a note over to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteOver(participants: string[], text: string): this;

  /**
   * Add a note left of to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteLeftOf(participants: string[], text: string): this;

  /**
   * Add a note right of to the diagram
   * @param participants The participants of the note
   * @param text The text of the note
   */
  noteRightOf(participants: string[], text: string): this;

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
  region(variant: SequenceRegion, text: string): this;

  /**
   * Render a region statement
   * @param region The region to render
   */
  renderRegion(region: SequenceRegionItem): string;

  /**
   * Begin a loop region
   * @param text The text of the loop
   */
  loop(text: string): this;

  /**
   * Begin an alt region
   * @param text The text of the alt
   */
  alt(text: string): this;

  /**
   * Begin an else region
   * @param text The text of the else
   */
  else(text: string): this;

  /**
   * Begin an opt region
   * @param text The text of the opt
   */
  opt(text: string): this;

  /**
   * Begin a par region
   * @param text The text of the par
   */
  par(text: string): this;

  /**
   * Begin a critical region
   * @param text The text of the critical
   */
  critical(text: string): this;

  /**
   * Begin an and region
   * @param text The text of the and
   */
  and(text: string): this;

  /**
   * Begin a break region
   * @param text The text of the break
   */
  break(text: string): this;

  /**
   * Begin a rect region
   * @param color The color of the rect
   */
  rect(color: string): this;

  /**
   * Render a rect region
   * @param rect The rect to render
   */
  renderRect(rect: SequenceRect): string;

  /**
   * Add a comment to the diagram
   * @param text The text of the comment
   */
  comment(text: string): this;

  /**
   * Render a comment
   * @param comment The comment to render
   */
  renderComment(comment: SequenceComment): string;

  /**
   * Add a custom statement to the diagram
   * @param text The text of the custom statement
   */
  custom(text: string): this;

  /**
   * Render a custom statement
   * @param custom The custom statement to render
   */
  renderCustom(custom: SequenceCustom): string;

  /**
   * Defines the render methods that are used for each item in the sequence diagram
   */
  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string>;
}
