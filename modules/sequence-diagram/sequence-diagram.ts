import { AbstractMermaid } from "../abstract-mermaid";

import {
  ParticipantOptions,
  SequenceActivation,
  SequenceBox,
  SequenceBoxOptions,
  SequenceComment,
  SequenceCustom,
  SequenceDiagramConstructor,
  SequenceDiagramInterface,
  SequenceItem,
  SequenceItemKey,
  SequenceMessage,
  SequenceMessageArrow,
  SequenceMessageOptions,
  SequenceNote,
  SequenceNoteLocation,
  SequenceParticipant,
  SequenceRect,
  SequenceRegion,
  SequenceRegionItem,
} from "@/types";

export class SequenceDiagram extends AbstractMermaid implements SequenceDiagramInterface {
  constructor(opt?: SequenceDiagramConstructor) {
    super();
    this.title = opt?.title;
    this.autonumber = opt?.autonumber ?? false;
    this.styles = opt?.styles;
  }

  title?: string;

  autonumber: boolean = false;

  styles?: string;

  sequence: SequenceItem[] = [];

  renderTitle(): string {
    return this.title ? `title ${this.title}` : "";
  }

  participant(name: string, { type, alias, create }: ParticipantOptions = { type: "participant" }): this {
    this.sequence.push({ name, type: type ?? "participant", alias, create });
    return this;
  }

  actor(name: string, options?: ParticipantOptions): this {
    this.participant(name, { ...options, type: "actor" });
    return this;
  }

  destroyParticipant(name: string): this {
    this.sequence.push({ name, type: "participant", destroy: true });
    return this;
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

  message(from: string, arrow: SequenceMessageArrow, to: string, text: string, options?: SequenceMessageOptions): this {
    if (options?.activate && options?.deactivate) {
      throw new Error("Cannot activate and deactivate a message");
    }
    this.sequence.push({ type: "message", from, arrow, to, text, ...options });
    return this;
  }

  renderMessage(message: SequenceMessage): string {
    const { from, arrow, to, text, activate, deactivate } = message;
    const activateString = activate ? "+" : "";
    const deactivateString = deactivate ? "-" : "";
    return `${activateString}${from}${arrow}${activateString}${deactivateString}${to}: ${text}`;
  }

  box(text: string, options?: SequenceBoxOptions): this {
    this.sequence.push({ type: "box", text, ...options });
    return this;
  }

  renderBox(box: SequenceBox): string {
    const { text, color } = box;
    return `Box ${color ?? ""}${text}`;
  }

  end(): this {
    this.sequence.push({ type: "end" });
    return this;
  }

  activate(participant: string): this {
    this.sequence.push({ type: "activate", participant });
    return this;
  }

  deactivate(participant: string): this {
    this.sequence.push({ type: "deactivate", participant });
    return this;
  }

  renderActivation(activation: SequenceActivation): string {
    const { type, participant } = activation;
    return `${type} ${participant}`;
  }

  note(location: SequenceNoteLocation, participants: string[], text: string): this {
    this.sequence.push({ type: "note", location, participants, text });
    return this;
  }

  noteOver(participants: string[], text: string): this {
    this.note("over", participants, text);
    return this;
  }

  noteLeftOf(participants: string[], text: string): this {
    this.note("left of", participants, text);
    return this;
  }

  noteRightOf(participants: string[], text: string): this {
    this.note("right of", participants, text);
    return this;
  }

  renderNote(note: SequenceNote): string {
    const { location, participants, text } = note;
    return `Note ${location} ${participants.join(",")}: ${text}`;
  }

  region(variant: SequenceRegion, text: string): this {
    this.sequence.push({ type: variant, text });
    return this;
  }

  renderRegion(region: SequenceRegionItem): string {
    const { type, text } = region;
    return `${type} ${text}`;
  }

  loop(text: string): this {
    this.region("loop", text);
    return this;
  }

  alt(text: string): this {
    this.region("alt", text);
    return this;
  }

  else(text: string): this {
    this.region("else", text);
    return this;
  }

  opt(text: string): this {
    this.region("opt", text);
    return this;
  }

  par(text: string): this {
    this.region("par", text);
    return this;
  }

  critical(text: string): this {
    this.region("critical", text);
    return this;
  }

  and(text: string): this {
    this.region("and", text);
    return this;
  }

  break(text: string): this {
    this.region("break", text);
    return this;
  }

  rect(color: string): this {
    this.sequence.push({ type: "rect", color });
    return this;
  }

  renderRect(rect: SequenceRect): string {
    const { color } = rect;
    return `rect ${color}`;
  }

  comment(text: string): this {
    this.sequence.push({ type: "comment", text });
    return this;
  }

  renderComment(comment: SequenceComment): string {
    const { text } = comment;
    return `%% ${text}`;
  }

  custom(text: string): this {
    this.sequence.push({ type: "custom", text });
    return this;
  }

  renderCustom({ text }: SequenceCustom): string {
    return text;
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
    break: (item) => this.renderRegion(item as SequenceRegionItem),
    rect: (item) => this.renderRect(item as SequenceRect),
    comment: (item) => this.renderComment(item as SequenceComment),
    custom: (item) => this.renderCustom(item as SequenceCustom),
  };

  render() {
    const renderedSequence = this.sequence.map((item) => this.renderMap[item.type](item));

    return `
sequenceDiagram
\t${this.renderTitle()}
\t${this.autonumber ? "autonumber" : ""}
\t${renderedSequence.join("\n\t")}`;
  }

  reset(): void {
    this.sequence = [];
  }
}
