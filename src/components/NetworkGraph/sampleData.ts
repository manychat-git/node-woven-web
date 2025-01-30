import { GraphData } from './types';

export const sampleData: GraphData = {
  nodes: [
    {
      id: '1',
      type: 'article',
      title: 'The Evolution of Memes',
      description: 'A deep dive into how internet memes have evolved over time'
    },
    {
      id: '2',
      type: 'author',
      title: 'Jane Smith',
      description: 'Digital culture researcher and writer'
    },
    {
      id: '3',
      type: 'topic',
      title: 'Digital Culture',
      description: 'The intersection of technology and cultural expression'
    },
    {
      id: '4',
      type: 'meme',
      title: 'Doge',
      description: 'The iconic Shiba Inu meme that spawned a cryptocurrency'
    },
    {
      id: '5',
      type: 'article',
      title: 'Cryptocurrency Culture',
      description: 'How memes influence cryptocurrency markets'
    }
  ],
  links: [
    { source: '1', target: '2', strength: 1 },
    { source: '1', target: '3', strength: 0.8 },
    { source: '1', target: '4', strength: 0.5 },
    { source: '2', target: '5', strength: 0.7 },
    { source: '4', target: '5', strength: 0.9 }
  ]
};