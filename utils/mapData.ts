import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'uvod',
    position: { x: 250, y: 50 },
    data: { label: 'Úvod' },
    type: 'default',
  },
  {
    id: 'gen-ai',
    position: { x: 100, y: 150 },
    data: { label: 'Generativní AI' },
    type: 'default',
  },
  {
    id: 'ml',
    position: { x: 400, y: 150 },
    data: { label: 'Strojové učení' },
    type: 'default',
  },
  {
    id: 'quantum',
    position: { x: 400, y: 250 },
    data: { label: 'Kvantové technologie' },
    type: 'default',
  },
];

export const initialEdges: Edge[] = [
  { id: 'e-uvod-gen-ai', source: 'uvod', target: 'gen-ai', type: 'smoothstep', animated: true },
  { id: 'e-uvod-ml', source: 'uvod', target: 'ml', type: 'smoothstep', animated: true },
  { id: 'e-ml-quantum', source: 'ml', target: 'quantum', type: 'smoothstep', animated: true },
];
