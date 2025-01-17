import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Overlay() {
  return (
    <Container>
      <TopLeft>
        <h1>
          LANDING
          <br />
          PAGES —
        </h1>
        <p>In React & Threejs —</p>
      </TopLeft>
      <BottomLeft>
        A runtime deconstruction of{" "}
        <a href="https://playful.software">playful.software</a>
      </BottomLeft>
      <BottomRight>
        Inspiration and ideas
        <br />
        Fundamentals
        <br />
        Finding models
        <br />
        Preparing them for the web
        <br />
        Displaying and changing models
        <br />
        Animation fundamentals
        <br />
        Effects and making things look good
        <br />
        Performance and time to load
        <br />
      </BottomRight>
      <Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>
      <VelvetBanana />
    </Container>
  );
}
function Horseshoe({ z }) {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const { viewport, camera } = useThree();

  const { nodes, materials } = useGLTF("/ferradura-v1-v2-transformed.glb");
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    z: z,
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.set(
      (data.rX += clicked ? 0.1 : 0.001),
      (data.rY += clicked ? 0.1 : 0.001),
      (data.rZ += clicked ? 0.1 : 0.001)
    );
    if (clicked) data.z -= 1;
    if (data.z < -200) {
      data.z = z;
      data.y = -height;
      setClicked(false);
    }
    ref.current.position.set(data.x * width, (data.y += 0.025), data.z);
    if (data.y > height) {
      data.y = -height;
    }
  });

  return (
    <mesh
      ref={ref}
      scale={0.1}
      geometry={nodes.Horse_Shoe_lambert2_0.geometry}
      material={materials.lambert2}
      material-emissive="#F103E5"
      // material-color="#F103E5"
      onPointerDown={() => setClicked(!clicked)}
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

function App({ count = 50, depth = 80 }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleWindowSizeChange() {
      const isMobile = width <= 768;
      count = isMobile ? 50 : 100;
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
        <color attach="background" args={["#F103E5"]} />
        {/* <ambientLight intensity={1.2} /> */}
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="park" />
          {Array.from({ length: count }, (_, i) => (
            <Horseshoe key={i} id={i} z={-(i / count) * depth - 20} />
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.5}
              bokehScale={3}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
