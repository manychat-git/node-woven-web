export type NodeType = 'article' | 'author' | 'topic' | 'meme';

export interface Node {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface Link {
  source: string;
  target: string;
  strength?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}