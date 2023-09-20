import { AbstractMermaid } from "../abstract-mermaid";

import {
  ParticipantOptions,
  SequenceActivation,
  SequenceBox,
  SequenceBoxOptions,
  SequenceDiagramInterface,
  SequenceItem,
  SequenceItemKey,
  SequenceMessage,
  SequenceMessageArrow,
  SequenceMessageOptions,
  SequenceNote,
  SequenceNoteLocation,
  SequenceParticipant,
  SequenceRegion,
  SequenceRegionItem,
} from "@/types";

export class SequenceDiagram extends AbstractMermaid implements SequenceDiagramInterface {
  constructor(title?: string) {
    super();
    this.title = title;
  }

  title?: string;

  sequence: SequenceItem[] = [];

  renderTitle(): string {
    return this.title ? `title ${this.title}` : "";
  }

  addParticipant(name: string, { type, alias, create }: ParticipantOptions = { type: "participant" }): void {
    this.sequence.push({ name, type: type ?? "participant", alias, create });
  }

  participant(name: string, options: ParticipantOptions = { type: "participant" }): void {
    this.addParticipant(name, options);
  }

  destroyParticipant(name: string): void {
    this.sequence.push({ name, type: "participant", destroy: true });
  }

  renderParticipant(participant: SequenceParticipant): string {
    const { name, type, alias, create, destroy } = participant;
    if (destroy) {
      return `destroy ${name}`;
    }
    const aliasString = alias ? ` as ${alias}` : "";
    const createString = create ? "create " : "";
    return `${createString}${type} ${name}${aliasString}`;
  }

  message(from: string, arrow: SequenceMessageArrow, to: string, text: string, options?: SequenceMessageOptions): void {
    if (options?.activate && options?.deactivate) {
      throw new Error("Cannot activate and deactivate a message");
    }
    this.sequence.push({ type: "message", from, arrow, to, text, ...options });
  }

  renderMessage(message: SequenceMessage): string {
    const { from, arrow, to, text, activate, deactivate } = message;
    const activateString = activate ? "+" : "";
    const deactivateString = deactivate ? "-" : "";
    return `${activateString}${from}${arrow}${activateString}${deactivateString}${to}: ${text}`;
  }

  box(text: string, options?: SequenceBoxOptions): void {
    this.sequence.push({ type: "box", text, ...options });
  }

  renderBox(box: SequenceBox): string {
    const { text, color } = box;
    return `Box ${color ?? ""}${text}`;
  }

  end() {
    this.sequence.push({ type: "end" });
  }

  activate(participant: string): void {
    this.sequence.push({ type: "activate", participant });
  }

  deactivate(participant: string): void {
    this.sequence.push({ type: "deactivate", participant });
  }

  renderActivation(activation: SequenceActivation): string {
    const { type, participant } = activation;
    return `${type} ${participant}`;
  }

  note(location: SequenceNoteLocation, participants: string[], text: string): void {
    this.sequence.push({ type: "note", location, participants, text });
  }

  noteOver(participants: string[], text: string): void {
    this.note("over", participants, text);
  }

  noteLeftOf(participants: string[], text: string): void {
    this.note("left of", participants, text);
  }

  noteRightOf(participants: string[], text: string): void {
    this.note("right of", participants, text);
  }

  renderNote(note: SequenceNote): string {
    const { location, participants, text } = note;
    return `Note ${location} ${participants.join(",")}: ${text}`;
  }

  region(variant: SequenceRegion, text: string): void {
    this.sequence.push({ type: variant, text });
  }

  renderRegion(region: SequenceRegionItem): string {
    const { type, text } = region;
    return `${type} ${text}`;
  }

  loop(text: string): void {
    this.region("loop", text);
  }

  alt(text: string): void {
    this.region("alt", text);
  }

  else(text: string): void {
    this.region("else", text);
  }

  opt(text: string): void {
    this.region("opt", text);
  }

  par(text: string): void {
    this.region("par", text);
  }

  critical(text: string): void {
    this.region("critical", text);
  }

  and(text: string): void {
    this.region("and", text);
  }

  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string> = {
    participant: (item) => this.renderParticipant(item as SequenceParticipant),
    actor: (item) => this.renderParticipant(item as SequenceParticipant),
    message: (item) => this.renderMessage(item as SequenceMessage),
    box: (item) => this.renderBox(item as SequenceBox),
    end: () => "end",
    activate: (item) => this.renderActivation(item as SequenceActivation),
    deactivate: (item) => this.renderActivation(item as SequenceActivation),
    note: (item) => this.renderNote(item as SequenceNote),
    loop: (item) => this.renderRegion(item as SequenceRegionItem),
    alt: (item) => this.renderRegion(item as SequenceRegionItem),
    else: (item) => this.renderRegion(item as SequenceRegionItem),
    opt: (item) => this.renderRegion(item as SequenceRegionItem),
    par: (item) => this.renderRegion(item as SequenceRegionItem),
    critical: (item) => this.renderRegion(item as SequenceRegionItem),
    and: (item) => this.renderRegion(item as SequenceRegionItem),
  };

  render() {
    const renderedSequence = this.sequence.map((item) => this.renderMap[item.type](item));

    return `
sequenceDiagram
\t${this.renderTitle()}
\t${renderedSequence.join("\n\t")}`;
  }

  reset(): void {
    this.sequence = [];
  }
}
