import { AbstractMermaid } from "../abstract-mermaid";

import { SequenceDiagramInterface, SequenceItem, SequenceItemKey, SequenceParticipant } from "@/types";

export class SequenceDiagram extends AbstractMermaid implements SequenceDiagramInterface {
  constructor(title?: string) {
    super();
    this.title = title;
  }

  title?: string;

  sequence: SequenceParticipant[] = [];

  addParticipant(name: string, { type, alias }: { type?: "participant" | "actor"; alias?: string } = {}): void {
    this.sequence.push({ name, type: type ?? "participant", alias });
  }

  participant(name: string, options: { type?: "participant" | "actor"; alias?: string } = {}): void {
    this.addParticipant(name, options);
  }

  renderParticipant(participant: SequenceParticipant): string {
    return `${participant.type} ${participant.name}${participant.alias ? ` as ${participant.alias}` : ""}`;
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
