import { AbstractMermaid } from "../abstract-mermaid";

import {
  ParticipantOptions,
  SequenceDiagramInterface,
  SequenceItem,
  SequenceItemKey,
  SequenceParticipant,
} from "@/types";

export class SequenceDiagram extends AbstractMermaid implements SequenceDiagramInterface {
  constructor(title?: string) {
    super();
    this.title = title;
  }

  title?: string;

  sequence: SequenceParticipant[] = [];

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

  renderTitle(): string {
    return this.title ? `title ${this.title}` : "";
  }

  renderMap: Record<SequenceItemKey, (props: SequenceItem) => string> = {
    participant: (item: SequenceParticipant) => this.renderParticipant(item),
    actor: (item: SequenceParticipant) => this.renderParticipant(item),
    message: (item: SequenceParticipant) => this.renderParticipant(item),
  };

  render() {
    const renderedSequence = this.sequence.map((item) => this.renderMap[item.type](item));

    return `
sequenceDiagram
${this.renderTitle()}
${renderedSequence.join("\n")}`;
  }

  reset(): void {
    this.sequence = [];
  }
}
