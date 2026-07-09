import React, { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    RoundedBox,
} from "@react-three/drei";

const InteriorModel = ({ dayTime, toggleTime }) => {
    const colors = {
        wall: "#e4dfd3",
        floor: "#4d392b",
        sofa: "#dbd3c9",
        wood: "#966f4e",
        tv: "#141414",
        rug: "#f3f0e9",
        accent: "#222222",
        leaf: "#5b6d54"
    };

    return (
        <group position={[0, -1, 0]}>
            {/* 1. FLOOR & RUG */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color={colors.floor} roughness={0.7} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 0.5]}>
                <circleGeometry args={[9, 64]} />
                <meshStandardMaterial color={colors.rug} roughness={1} />
            </mesh>

            {/* 2. WALLS */}
            <mesh position={[0, 4, -12]} receiveShadow>
                <boxGeometry args={[24, 10, 0.1]} />
                <meshStandardMaterial color={colors.wall} />
            </mesh>
            <mesh position={[-12, 4, 0]} receiveShadow>
                <boxGeometry args={[0.1, 10, 24]} />
                <meshStandardMaterial color={colors.wall} />
            </mesh>

            {/* 3. WINDOW & CURTAINS */}
            <group position={[-11.9, 5, -2]}>
                <mesh>
                    <boxGeometry args={[0.05, 5, 8]} />
                    <meshStandardMaterial
                        color="#fff"
                        emissive="#ffffff"
                        emissiveIntensity={dayTime ? 1.5 : 0}
                        transparent
                        opacity={dayTime ? 0.9 : 0.2}
                    />
                </mesh>
                {[...Array(4)].map((_, i) => (
                    <mesh key={i} position={[0.02, 0, -3 + i * 2]}>
                        <boxGeometry args={[0.01, 5, 0.05]} />
                        <meshStandardMaterial color="#444" />
                    </mesh>
                ))}
                <mesh position={[0.5, 0, -4]}><boxGeometry args={[0.1, 6.5, 1.2]} /><meshStandardMaterial color="#fff" transparent opacity={0.7} /></mesh>
                <mesh position={[0.5, 0, 4]}><boxGeometry args={[0.1, 6.5, 1.2]} /><meshStandardMaterial color="#fff" transparent opacity={0.7} /></mesh>
            </group>

            {/* 4. REFINED TRIPOD LAMP */}
            <group position={[-8, 0, 6]}>
                <mesh position={[0, 3.5, 0]} onClick={toggleTime} style={{ cursor: 'pointer' }}>
                    <cylinderGeometry args={[0.6, 0.9, 1.2, 32]} />
                    <meshStandardMaterial
                        color={!dayTime ? "#fff" : "#eee"}
                        emissive={!dayTime ? "#ffaa44" : "#000"}
                        emissiveIntensity={!dayTime ? 2 : 0}
                    />
                </mesh>

                <pointLight
                    position={[0, 3.5, 0]}
                    intensity={!dayTime ? 25 : 0}
                    color="#ffccaa"
                    castShadow
                    shadow-mapSize={1024}
                />

                <group>
                    <mesh position={[0, 1.75, 0]}><cylinderGeometry args={[0.02, 0.02, 3.5]} /><meshStandardMaterial color={colors.accent} /></mesh>
                    {[0, 120, 240].map((angle, i) => (
                        <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]} position={[0, 1.75, 0]}>
                            <mesh rotation={[0.2, 0, 0]} position={[0, 0, 0.1]}>
                                <cylinderGeometry args={[0.015, 0.015, 3.5]} />
                                <meshStandardMaterial color={colors.accent} />
                            </mesh>
                        </group>
                    ))}
                </group>
            </group>

            {/* 5. L-SOFA & PROPS */}
            <group position={[-2, 0, -3]}>
                <RoundedBox args={[7, 1.2, 2.5]} radius={0.15} position={[0, 0.6, 0]} castShadow>
                    <meshStandardMaterial color={colors.sofa} />
                </RoundedBox>
                <RoundedBox args={[2.5, 1.2, 3.5]} radius={0.15} position={[-2.25, 0.6, 3]} castShadow>
                    <meshStandardMaterial color={colors.sofa} />
                </RoundedBox>
                <mesh position={[1, 1.22, 0]} rotation={[0, 0.1, 0]}>
                    <boxGeometry args={[2, 0.05, 2.2]} />
                    <meshStandardMaterial color="#bcaaa4" />
                </mesh>
            </group>

            {/* 6. CENTER TABLE */}
            <group position={[2.5, 0, 1.5]}>
                <RoundedBox args={[4, 0.15, 2]} radius={0.05} position={[0, 0.8, 0]} castShadow>
                    <meshStandardMaterial color={colors.wood} />
                </RoundedBox>
                {[-1.8, 1.8].map((x) => [-0.8, 0.8].map((z) => (
                    <mesh key={`${x}-${z}`} position={[x, 0.4, z]}><cylinderGeometry args={[0.04, 0.04, 0.8]} /><meshStandardMaterial color="#111" /></mesh>
                )))}
            </group>

            {/* 7. TV & UNIT */}
            <group position={[8, 0, -6]}>
                <RoundedBox args={[6.5, 1.1, 1.5]} radius={0.05} position={[0, 0.55, 0]} castShadow>
                    <meshStandardMaterial color={colors.wood} />
                </RoundedBox>
                <mesh position={[0, 3.5, 0]} castShadow>
                    <boxGeometry args={[5.5, 3.2, 0.1]} />
                    <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, 7.5, -5.5]}><boxGeometry args={[5, 0.2, 0.8]} /><meshStandardMaterial color={colors.wood} /></mesh>
            </group>

            {/* 8. DECOR CHAIR */}
            <group position={[5, 0, 5]} rotation={[0, -Math.PI / 4, 0]}>
                <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[2.2, 0.3, 2.2]} /><meshStandardMaterial color="#222" /></mesh>
                <mesh position={[0, 1.5, -1]} rotation={[0.2, 0, 0]}><boxGeometry args={[2.2, 1.6, 0.1]} /><meshStandardMaterial color="#222" /></mesh>
            </group>

            {/* 9. PLANT */}
            <group position={[9.5, 0, 7.5]}>
                <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.9, 0.7, 1.6]} /><meshStandardMaterial color="#fff" /></mesh>
                <mesh position={[0, 3.5, 0]}><sphereGeometry args={[1.5, 8, 8]} /><meshStandardMaterial color={colors.leaf} wireframe /></mesh>
            </group>

            <ContactShadows opacity={dayTime ? 0.3 : 0.1} scale={40} blur={2.5} far={10} />
        </group>
    );
};

const InteriorApp = () => {
    const [dayTime, setDayTime] = useState(false);

    // Pre-load the sound
    const clickSound = useMemo(() => new Audio("/sounds/switch.mp3"), []);

    const handleToggle = () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Interaction required for audio"));
        setDayTime(!dayTime);
    };

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: dayTime ? "#e5e1da" : "#08080a",
            transition: 'background 1.2s ease',
            display: "flex",
            overflow: "hidden"
        }}>
            <div className="flex-1 relative">
                <Canvas shadows gl={{ antialias: true }}>
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[-50, 40, 50]} fov={18} />
                        <OrbitControls
                            makeDefault
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2.2}
                            target={[0, 2, 0]}
                        />

                        <Environment preset={dayTime ? "apartment" : "night"} intensity={dayTime ? 1 : 0.02} />
                        <directionalLight
                            position={[-25, 45, 15]}
                            intensity={dayTime ? 4 : 0}
                            castShadow
                        />
                        <ambientLight intensity={dayTime ? 0.7 : 0.05} color={dayTime ? "#fff" : "#222244"} />

                        <InteriorModel dayTime={dayTime} toggleTime={handleToggle} />
                    </Suspense>
                </Canvas>

                <div className="absolute top-12 left-12 z-10 pointer-events-none">
                    <p className={`text-[10px] tracking-[0.4em] mb-4 opacity-70 ${dayTime ? 'text-stone-900' : 'text-stone-500'}`}>
                        CLICK LAMP TO TOGGLE
                    </p>
                    <h1 className={`text-6xl font-serif tracking-tighter transition-colors duration-1000 ${dayTime ? "text-stone-900" : "text-white"}`}>
                        Studio <br />
                        <span className={`italic font-light ml-16 ${dayTime ? "text-stone-400" : "text-stone-700"}`}>Archive</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default InteriorApp;