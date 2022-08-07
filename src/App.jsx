import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, useGLTF } from "@react-three/drei";

function Horseshoe({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/ferradura-v1-v2-transformed.glb");

  const { viewport, camera } = useThree();

  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.004),
      (data.rZ += 0.0005)
    );
    ref.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    // <mesh ref={ref}>
    //   <boxGeometry />
    //   <meshBasicMaterial color="red" />
    // </mesh>
    <mesh
      ref={ref}
      scale={0.09}
      geometry={nodes.Horse_Shoe_lambert2_0.geometry}
      material={materials.lambert2}
      material-color="pink"
    />
  );
}

// function Horseshoe(props){
//   // const { scene } = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
//   const { scene } = useGLTF('/ferradura-v1-v2.glb')

//   scene.traverse( obj => {
//     if(obj.isMesh) {
//       obj.material.color.set("pink")
//     }
//   })
//   return (<primitive object={scene} {...props} />)
// }

// function Horseshoe(props) {
//   const { nodes, materials } = useGLTF("/ferradura-v1-v2-transformed.glb");
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         geometry={nodes.Horse_Shoe_lambert2_0.geometry}
//         material={materials.lambert2}
//         material-color="pink"
//       />
//     </group>
//   );
// }

function App({ count = 100 }) {
  return (
    <Canvas>
      <ambientLight intensity={1.2} />
      <spotLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        {/* <Horseshoe scale={0.05} /> */}
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Horseshoe key={i} z={-i} />
        ))}
      </Suspense>
    </Canvas>
  );
}

export default App;
