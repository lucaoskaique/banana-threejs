import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Box() {
  const ref = useRef()

  useFrame((state) => {
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 2)
    // ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial color="orange"/>
    </mesh>
  )
}

function App() {

  return (
  <Canvas>
    <Box />
  </Canvas>
  )
}

export default App
