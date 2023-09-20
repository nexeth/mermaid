/**
 * The base interface for all mermaid diagram generators
 */
export interface Mermaid {
  /**
   * Render the mermaid diagram.
   */
  render(): string;

  /**
   * Reset the diagram to its initial state.
   */
  reset(): void;

  /**
   * The title of the diagram
   */
  title?: string;
}
