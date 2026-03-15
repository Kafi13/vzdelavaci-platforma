'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReactFlow, useNodesState, useEdgesState, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from '../utils/mapData';

export default function DomainMap() {
  const router = useRouter();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: any) => {
      router.push(`/${node.id}`);
    },
    [router]
  );

  if (!isMounted) {
    return (
      <div className="flex h-[70vh] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
        <p className="text-lg text-gray-500 font-medium animate-pulse">Načítám mapu...</p>
      </div>
    );
  }

  return (
    <div className="h-[70vh] w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
