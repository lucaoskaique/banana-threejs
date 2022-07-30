import { useRef} from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'

function Box() {
  const ref = useRef()
  const { viewport } = useThree()
  
  useFrame((state) => {
    ref.current.position.y += 0.01
    if(ref.current.position.y > viewport.height / 1.5 ) {
      ref.current.position.y = -viewport.height / 1.5 
    }
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
    <Box />
    <Box />
  </Canvas>
  )
}

export default App
