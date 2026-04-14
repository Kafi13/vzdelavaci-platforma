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
    data: { label: 'VZDĚLÁVACÍ SEKCE' },
    type: 'default',
    className: 'bg-slate-900 text-white font-bold border-none shadow-lg'
  },
  {
    id: 'quantum-practice',
    position: { x: 550, y: 250 },
    data: { label: '🧠 PROCVIČOVÁNÍ' },
    type: 'default',
    className: 'bg-emerald-50 text-emerald-700 font-bold border-emerald-200'
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
    data: { label: 'ZÁVĚREČNÁ ZKOUŠKA' },
    type: 'default',
    className: 'bg-indigo-600 text-white font-bold border-none shadow-lg'
  },
];

export const initialEdges: Edge[] = [
  { id: 'e-uvod-gen-ai', source: 'uvod', target: 'gen-ai', type: 'smoothstep', animated: true },
  { id: 'e-uvod-ml', source: 'uvod', target: 'ml', type: 'smoothstep', animated: true },
  { id: 'e-ml-quantum', source: 'ml', target: 'quantum', type: 'smoothstep', animated: true },
  { id: 'e-q-practice', source: 'quantum', target: 'quantum-practice', type: 'smoothstep', animated: true },
  { id: 'e-q-q1', source: 'quantum', target: 'quantum-1', type: 'smoothstep' },
  { id: 'e-q1-q2', source: 'quantum-1', target: 'quantum-2', type: 'smoothstep' },
  { id: 'e-q2-q3', source: 'quantum-2', target: 'quantum-3', type: 'smoothstep' },
  { id: 'e-q3-q4', source: 'quantum-3', target: 'quantum-4', type: 'smoothstep' },
  { id: 'e-q4-q5', source: 'quantum-4', target: 'quantum-5', type: 'smoothstep' },
  { id: 'e-q5-q6', source: 'quantum-5', target: 'quantum-6', type: 'smoothstep' },
  { id: 'e-practice-test', source: 'quantum-practice', target: 'test', type: 'smoothstep', animated: true },
];
