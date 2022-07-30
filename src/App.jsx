import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState} from 'react'

function Box() {
  const ref = useRef()
  
  useFrame((state) => {
    // ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2
    // ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 2)
    // ref.current.rotation.y += 0.01
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, clicked ? 1 : 0, 0.1)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial color="red"/>
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
