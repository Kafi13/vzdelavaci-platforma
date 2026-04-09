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
  {
    id: 'quantum-1',
    position: { x: 200, y: 350 },
    data: { label: '1. Základy' },
    type: 'default',
  },
  {
    id: 'quantum-2',
    position: { x: 300, y: 450 },
    data: { label: '2. Počítače' },
    type: 'default',
  },
  {
    id: 'quantum-3',
    position: { x: 400, y: 350 },
    data: { label: '3. Senzorika' },
    type: 'default',
  },
  {
    id: 'quantum-4',
    position: { x: 500, y: 450 },
    data: { label: '4. Komunikace' },
    type: 'default',
  },
  {
    id: 'quantum-5',
    position: { x: 600, y: 350 },
    data: { label: '5. Materiály' },
    type: 'default',
  },
  {
    id: 'quantum-6',
    position: { x: 700, y: 450 },
    data: { label: '6. QML' },
    type: 'default',
  },
  {
    id: 'test',
    position: { x: 450, y: 550 },
    data: { label: 'ZÁVĚREČNÝ TEST' },
    type: 'default',
    className: 'bg-indigo-600 text-white font-bold border-none shadow-lg'
  },
];

export const initialEdges: Edge[] = [
  { id: 'e-uvod-gen-ai', source: 'uvod', target: 'gen-ai', type: 'smoothstep', animated: true },
  { id: 'e-uvod-ml', source: 'uvod', target: 'ml', type: 'smoothstep', animated: true },
  { id: 'e-ml-quantum', source: 'ml', target: 'quantum', type: 'smoothstep', animated: true },
  { id: 'e-q-q1', source: 'quantum', target: 'quantum-1', type: 'smoothstep' },
  { id: 'e-q1-q2', source: 'quantum-1', target: 'quantum-2', type: 'smoothstep' },
  { id: 'e-q2-q3', source: 'quantum-2', target: 'quantum-3', type: 'smoothstep' },
  { id: 'e-q3-q4', source: 'quantum-3', target: 'quantum-4', type: 'smoothstep' },
  { id: 'e-q4-q5', source: 'quantum-4', target: 'quantum-5', type: 'smoothstep' },
  { id: 'e-q5-q6', source: 'quantum-5', target: 'quantum-6', type: 'smoothstep' },
  { id: 'e-q6-test', source: 'quantum-6', target: 'test', type: 'smoothstep', animated: true },
];
