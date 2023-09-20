import { AbstractMermaid } from "../abstract-mermaid";

import { SequenceDiagramInterface, SequenceParticipant } from "@/types";

export class SequenceDiagram extends AbstractMermaid implements SequenceDiagramInterface {
  participants: SequenceParticipant[] = [];

  addParticipant(name: string, participant?: Omit<SequenceParticipant, "name">): void {
    if (!this.participants.find((p) => p.name === name)) {
      this.participants.push({ name, ...participant });
    }
  }

  removeParticipant(participant: string): void {
    this.participants = this.participants.filter((p) => p.name !== participant);
  }

  editParticipant(oldParticipantName: string, newParticipant: SequenceParticipant): void {
    const participant = this.participants.find((p) => p.name === oldParticipantName);
    if (participant) {
      participant.name = newParticipant.name;
      participant.alias = newParticipant.alias;
      participant.actor = newParticipant.actor;
    }
  }

  renderParticipant(participant: SequenceParticipant): string {
    const keyword = participant.actor ? "actor" : "participant";

    return `${keyword} ${participant.name}${participant.alias ? ` as ${participant.alias}` : ""}`;
  }

  render() {
    const _participants = this.participants.map((p) => this.renderParticipant(p)).join("\n");
    return `
sequenceDiagram
      
${_participants}
 `;
  }
}
