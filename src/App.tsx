import ReactFlow, { Background, Controls, ConnectionMode, addEdge, Connection, useEdgesState, useNodesState, Node } from 'reactflow';

import * as Toolbar from '@radix-ui/react-toolbar'
import { useCallback } from 'react';
import { DefaultEdge } from './components/edges/DefaultEdge';
import  { Square } from './components/nodes/Square';
import 'reactflow/dist/style.css';


const NODE_TYPES: any = {  
  square: Square,
}

const EDGE_TYPE = {
  default: DefaultEdge,
}

let uuid = self.crypto.randomUUID();

const INITIAL_NODES = [
  
  {
    id: uuid.toString(),
    type: 'square',
    position: {
      x: 120, 
      y: 400,
    },
    data: {},
  },

  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 120, 
      y: 100,
    },
    data: {},
  },  
] satisfies Node[]

function App() {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges: any) => addEdge(connection, edges))
  }, [])

  function addSquareMode() {
    setNodes((nodes: any) => [
      ...nodes,
        {
          id: crypto.randomUUID(),
          type: 'square',
          position: {
            x: 140, 
            y: 150,
          },
          data: {},
        },            
    ])
  };


  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPE}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}     
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default', 
        }}
      >        
        <Background
          gap={12}
          size={1}
          color="ccc"
        />        
        <Controls />

        <strong>Desenvolvido por Raul </strong>
      </ReactFlow>
        <Toolbar.Root className='fixed flex bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
          <Toolbar.Button className='w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2'onClick={addSquareMode}>            
          </Toolbar.Button>          
        </Toolbar.Root>        
    </div>
  )
}

export default App
