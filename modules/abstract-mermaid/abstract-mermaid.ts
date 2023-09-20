import { Mermaid } from "@/types";

export abstract class AbstractMermaid implements Mermaid {
  abstract render(): void;
}
