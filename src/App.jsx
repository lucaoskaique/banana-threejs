import { Suspense, useRef, useState} from 'react'
import { Canvas, useFrame, useThree} from '@react-three/fiber'
import * as THREE from 'three'
import { Environment, useGLTF } from '@react-three/drei'

function Box({z}) {
  const ref = useRef()  
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0,0,z])
  
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height)
  })
  
  useFrame((state) => {
    ref.current.position.set(data.x * width, (data.y += 0.5), z)
    if(data.y > height / 1.5 ) {
      data.y = -height / 1.5 
    }
  })

  return (
    <mesh ref={ref}>
      <boxGeometry/>
      <meshBasicMaterial color="red"/>
    </mesh>
  )
}

function Horseshoe(props){
  // const { scene } = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
  const { scene } = useGLTF('/ferradura-v1-v2.glb')

  scene.traverse( obj => {
    if(obj.isMesh) {
      obj.material.color.set("pink")      
    }
  })
  return (<primitive object={scene} {...props} />)
}

function App({count = 100}) {
  return (
  <Canvas>
    <ambientLight intensity={1.2} />
    <spotLight position={[10, 10, 10]} intensity={2} />
    <Suspense fallback={null}>
      <Horseshoe scale={0.05}/>
      <Environment preset='sunset'/>
    </Suspense>
    {/* {Array.from({length: count}, (_, i) => (<Box key={i} z={-i} />))} */}
  </Canvas>
  )
}

export default App
