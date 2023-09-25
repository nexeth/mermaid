import { Mermaid } from "../../types";
export abstract class AbstractMermaid implements Mermaid {
  abstract title?: string;
  abstract render(): string;
  abstract reset(): void;
}
