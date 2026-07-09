import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    Float,
    RoundedBox,
} from "@react-three/drei";

/* ---------------- EXTENDED DATA (12 ITEMS) ---------------- */
const FURNITURE_DATA = [
    { id: "sofa", name: "Relvet Soft", price: "$999.00", tag: "Series_v1", detail: "Premium modular seating with high-density architectural foam and stain-resistant velvet." },
    { id: "bed", name: "Lunar Rest", price: "$1,450.00", tag: "Series_v2", detail: "Low-profile floating frame designed for ergonomic support and minimalist bedroom aesthetics." },
    { id: "desk", name: "Apex Work", price: "$720.00", tag: "Series_v3", detail: "Carbon-treated steel base with a walnut finish top, featuring integrated cable management." },
    { id: "storage", name: "Monolith Cab", price: "$550.00", tag: "Series_v4", detail: "Seamless push-to-open storage unit with a matte obsidian finish and adjustable shelving." },
    { id: "light", name: "Orbital Ray", price: "$320.00", tag: "Series_v5", detail: "Dimmable spherical lighting fixture with a brushed chrome stem and frosted glass." },
    { id: "table", name: "Zenith Dine", price: "$1,100.00", tag: "Series_v6", detail: "Solid oak circular dining surface with a tapered pedestal base and hand-oiled finish." },
    { id: "shelf", name: "Grid Stack", price: "$480.00", tag: "Series_v7", detail: "Architectural open-shelf system featuring powder-coated aluminum and glass dividers." },
    { id: "chair", name: "Curve Lounge", price: "$640.00", tag: "Series_v8", detail: "Ergonomic sculptural armchair upholstered in boucle fabric with a swivel walnut base." },
    { id: "mirror", name: "Portal Floor", price: "$210.00", tag: "Series_v9", detail: "Full-length arched mirror with a sandblasted aluminum frame and lean-to safety backing." },
    { id: "console", name: "Linear Media", price: "$850.00", tag: "Series_v10", detail: "Floating-effect entertainment unit with perforated metal doors and internal cable routing." },
    { id: "floorlamp", name: "Stance Tall", price: "$190.00", tag: "Series_v11", detail: "Tripod-base floor lamp with a linen shade and tactile brass pull-chain switch." },
    { id: "sidetable", name: "Dot Accent", price: "$145.00", tag: "Series_v12", detail: "Compact powder-coated steel side table with a removable tray top for versatile hosting." }
];

/* ---------------- TRANSITION WRAPPER ---------------- */
const SceneItem = ({ children, visible }) => {
    const ref = useRef();
    useFrame((state, delta) => {
        const targetScale = visible ? 1 : 0;
        const targetY = visible ? 0 : -1.5;
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
        ref.current.visible = ref.current.scale.x > 0.01;
    });
    return <group ref={ref}>{children}</group>;
};

/* ---------------- SCENE CONTENT ---------------- */
const SceneContent = ({ color, activeIndex }) => {
    return (
        <group position={[0, -0.5, 0]}>
            {/* 0-11 items remain exactly as you had them */}
            <SceneItem visible={activeIndex === 0}><Float speed={1.5} rotationIntensity={0.5}><RoundedBox args={[2, 0.8, 2]} radius={0.3}><meshStandardMaterial color={color} roughness={0.4} /></RoundedBox><RoundedBox args={[2, 1.2, 0.4]} radius={0.2} position={[0, 0.6, -0.8]}><meshStandardMaterial color={color} /></RoundedBox></Float></SceneItem>
            <SceneItem visible={activeIndex === 1}><Float speed={1}><RoundedBox args={[2.5, 0.4, 3.5]} radius={0.1}><meshStandardMaterial color={color} roughness={0.6} /></RoundedBox><RoundedBox args={[2.5, 1.2, 0.2]} radius={0.1} position={[0, 0.4, -1.6]}><meshStandardMaterial color={color} /></RoundedBox></Float></SceneItem>
            <SceneItem visible={activeIndex === 2}><group position={[0, 0.5, 0]}><RoundedBox args={[3, 0.1, 1.5]} radius={0.05}><meshStandardMaterial color="#111" /></RoundedBox><mesh position={[-1.3, -0.5, 0]}><boxGeometry args={[0.1, 1, 1.2]} /><meshStandardMaterial color={color} /></mesh><mesh position={[1.3, -0.5, 0]}><boxGeometry args={[0.1, 1, 1.2]} /><meshStandardMaterial color={color} /></mesh></group></SceneItem>
            <SceneItem visible={activeIndex === 3}><Float speed={2}><RoundedBox args={[1.5, 2, 1]} radius={0.1}><meshStandardMaterial color={color} metalness={0.2} /></RoundedBox><mesh position={[0.4, 0, 0.51]}><boxGeometry args={[0.02, 0.4, 0.02]} /><meshStandardMaterial color="white" /></mesh></Float></SceneItem>
            <SceneItem visible={activeIndex === 4}><Float speed={3} floatIntensity={1}><mesh position={[0, 1, 0]}><sphereGeometry args={[0.6, 32, 32]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} /></mesh><mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color={color} metalness={0.8} /></mesh></Float></SceneItem>
            <SceneItem visible={activeIndex === 5}><Float speed={1.2}><cylinderGeometry args={[1.2, 1.2, 0.1, 32]} /><meshStandardMaterial color="#222" roughness={0.2} /><mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.2, 0.4, 1.2, 32]} /><meshStandardMaterial color={color} metalness={0.5} /></mesh></Float></SceneItem>
            <SceneItem visible={activeIndex === 6}><group position={[0, 0.5, 0]}>{[0, 0.6, 1.2].map((y) => (<RoundedBox key={y} args={[2, 0.05, 0.8]} position={[0, y, 0]} radius={0.02}><meshStandardMaterial color={color} /></RoundedBox>))}<mesh position={[-0.9, 0.6, 0]}><boxGeometry args={[0.05, 1.4, 0.8]} /><meshStandardMaterial color="#111" /></mesh><mesh position={[0.9, 0.6, 0]}><boxGeometry args={[0.05, 1.4, 0.8]} /><meshStandardMaterial color="#111" /></mesh></group></SceneItem>
            <SceneItem visible={activeIndex === 7}><Float speed={2} rotationIntensity={0.5}><RoundedBox args={[1.2, 0.6, 1.2]} radius={0.4} position={[0, 0, 0]}><meshStandardMaterial color={color} roughness={0.8} /></RoundedBox><RoundedBox args={[1.2, 1, 0.4]} radius={0.3} position={[0, 0.5, -0.4]} rotation={[Math.PI / 12, 0, 0]}><meshStandardMaterial color={color} /></RoundedBox><mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.3, 0.3, 0.1, 32]} /><meshStandardMaterial color="#111" metalness={0.9} /></mesh></Float></SceneItem>
            <SceneItem visible={activeIndex === 8}><group rotation={[-0.1, 0, 0]}><RoundedBox args={[1.2, 2.5, 0.1]} radius={0.1}><meshStandardMaterial color={color} metalness={0.6} /></RoundedBox><mesh position={[0, 0, 0.06]}><planeGeometry args={[1, 2.3]} /><meshStandardMaterial color="#fff" metalness={1} roughness={0} /></mesh></group></SceneItem>
            <SceneItem visible={activeIndex === 9}><RoundedBox args={[3.5, 0.8, 1]} radius={0.05}><meshStandardMaterial color={color} /></RoundedBox><mesh position={[0, 0, 0.51]}><boxGeometry args={[3.3, 0.6, 0.02]} /><meshStandardMaterial color="#111" wireframe /></mesh></SceneItem>
            <SceneItem visible={activeIndex === 10}><group position={[0, 1, 0]}><cylinderGeometry args={[0.4, 0.5, 0.8, 32]} /><meshStandardMaterial color="white" side={THREE.DoubleSide} />{[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((r, i) => (<group key={i} rotation={[0, r, 0]}><mesh position={[0.4, -1, 0]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.04, 2, 0.04]} /><meshStandardMaterial color={color} /></mesh></group>))}</group></SceneItem>
            <SceneItem visible={activeIndex === 11}><mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.6, 0.6, 0.05, 32]} /><meshStandardMaterial color={color} /></mesh><mesh position={[0, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 1, 32]} /><meshStandardMaterial color={color} /></mesh><mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.4, 0.4, 0.05, 32]} /><meshStandardMaterial color="#111" /></mesh></SceneItem>

            <ContactShadows opacity={0.4} scale={15} blur={2.5} far={2} color="#000000" />
        </group>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */
const FurnitureScene = () => {
    const [activeColor, setActiveColor] = useState("#1a1a1a");
    const [activeIndex, setActiveIndex] = useState(0);
    const [deployedItems, setDeployedItems] = useState([]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % FURNITURE_DATA.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + FURNITURE_DATA.length) % FURNITURE_DATA.length);

    const currentItem = FURNITURE_DATA[activeIndex];

    const handleDeploy = () => {
        const itemToDeploy = { ...currentItem, selectedColor: activeColor, id: Date.now() };
        setDeployedItems([...deployedItems, itemToDeploy]);
        alert(`${currentItem.name} has been deployed to your project!`);
        console.log("Current Project Collection:", [...deployedItems, itemToDeploy]);
    };

    return (
        <div className="relative h-screen w-full bg-[#080808] overflow-hidden font-sans">
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={35} />
                        <Environment preset="city" />
                        <SceneContent color={activeColor} activeIndex={activeIndex} />
                        <OrbitControls makeDefault enableZoom={false} autoRotate autoRotateSpeed={0.4} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="relative z-10 h-full w-full pointer-events-none flex flex-col justify-between p-6 md:p-12">
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl">
                        <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">{currentItem.tag}</span>
                        <h2 className="text-white font-bold text-lg tracking-tight">Eclipse Interior</h2>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto active:scale-90">←</button>
                        <button onClick={nextSlide} className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto active:scale-90">→</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="w-full max-w-sm bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 pointer-events-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-4xl font-black text-white tracking-tighter italic">{currentItem.name}</h1>
                            <div className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-1 rounded-full border border-emerald-500/30 uppercase font-bold">In Stock</div>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed mb-8 h-12 overflow-hidden">{currentItem.detail}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {["#1a1a1a", "#7a6352", "#4a5d7c", "#c9c9c9"].map((c) => (
                                    <button key={c} onClick={() => setActiveColor(c)} className={`w-6 h-6 rounded-full border-2 transition-all ${activeColor === c ? "border-white scale-125 shadow-lg" : "border-transparent opacity-40"}`} style={{ backgroundColor: c }} />
                                ))}
                            </div>
                            <div className="text-right">
                                <span className="block text-[8px] uppercase tracking-widest text-white/30">Retail Price</span>
                                <span className="text-xl font-mono text-white">{currentItem.price}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleDeploy}
                        className="pointer-events-auto relative px-12 py-5 bg-white text-black font-black rounded-[30px] hover:scale-105 active:scale-95 shadow-xl uppercase tracking-widest text-[11px]"
                    >
                        Deploy Selection
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
    );
};

export default FurnitureScene;