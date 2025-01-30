import { GraphData } from './types';

export const sampleData: GraphData = {
  nodes: [
    {
      id: '1',
      type: 'article',
      title: 'The Evolution of Memes',
      description: 'A deep dive into how internet memes have evolved over time',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
    },
    {
      id: '2',
      type: 'author',
      title: 'Jane Smith',
      description: 'Digital culture researcher and writer',
      imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      id: '3',
      type: 'topic',
      title: 'Digital Culture',
      description: 'The intersection of technology and cultural expression',
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'
    },
    {
      id: '4',
      type: 'meme',
      title: 'Doge',
      description: 'The iconic Shiba Inu meme that spawned a cryptocurrency',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    },
    {
      id: '5',
      type: 'article',
      title: 'Cryptocurrency Culture',
      description: 'How memes influence cryptocurrency markets',
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
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