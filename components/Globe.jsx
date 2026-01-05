"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useAppState } from "@/context/AppStateContext";
import { useData } from "@/context/DataContext";
import { useCamera } from "@/context/CameraContext";
// import { EffectComposer, Bloom } from '@react-three/postprocessing'

function Earth() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Ocean layer - Use MeshBasicMaterial so it doesn't need light */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial
          color="#1E3A32" // Deep sea green - will show regardless of light
        />
      </Sphere>

      {/* Land layer - Slightly larger, brighter */}
      <Sphere args={[2.02, 64, 64]}>
        <meshBasicMaterial
          color="#2D5246" // Teal-green continents
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#5EEAD4" // Mint glow
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function CountryMarker({ country, coordinates, emissions }) {
  const { setSelectedCountry, setSidebarOpen } = useAppState();
  const { zoomToCountry } = useCamera();
  const meshRef = useRef();

  const [lon, lat] = coordinates;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const radius = 2.05;

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  // Determine color and scale based on emissions
  const getColorAndScale = () => {
    if (emissions < 1000000) {
      return { color: "#10B981", scale: 0.05 };
    } else if (emissions < 3000000) {
      return { color: "#F59E0B", scale: 0.08 };
    } else {
      return { color: "#EF4444", scale: 0.12 };
    }
  };

  const { color, scale } = getColorAndScale();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  const handleClick = () => {
    console.log("Selected country:", country);
    setSelectedCountry(country);
    setSidebarOpen(true);
    zoomToCountry(country, coordinates);
  };

  return (
    <mesh ref={meshRef} position={[x, y, z]} onClick={handleClick}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function SupplyChainArc({ route }) {
  const { countries } = useData();
  const { setSelectedRoute } = useAppState();
  const particleRef = useRef();

  if (!countries[route.from] || !countries[route.to]) return null;

  const fromCoords = countries[route.from].coordinates;
  const toCoords = countries[route.to].coordinates;

  const getPosition = (lon, lat, radius = 2.05) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const start = getPosition(fromCoords[0], fromCoords[1]);
  const end = getPosition(toCoords[0], toCoords[1]);

  const mid = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2 + 0.5,
    (start.z + end.z) / 2
  );

  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, []);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.elapsedTime % 3) / 3;
      const pos = curve.getPoint(t);
      particleRef.current.position.copy(pos);
    }
  });

  return (
    <group onClick={() => setSelectedRoute(route.id)}>
      <line geometry={geometry}>
        <lineBasicMaterial
          color="#2DD4BF"
          transparent
          opacity={0.6}
          linewidth={2}
        />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#5EEAD4" />
      </mesh>
    </group>
  );
}

function FactoryDot({ factory }) {
  const meshRef = useRef();

  const { lat, lon } = factory;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const radius = 2.05;

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#5EEAD4" />
    </mesh>
  );
}

function Scene() {
  const { viewMode } = useAppState();
  const { countries, routes, factories } = useData();
  const { cameraRef, controlsRef } = useCamera();

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -5, -5]} intensity={0.5} />

      <Earth />

      {/* Supply chain view */}
      {viewMode === "supply-chain" && (
        <>
          {Object.entries(countries).map(([code, country]) => (
            <CountryMarker
              key={code}
              country={code}
              coordinates={country.coordinates}
              emissions={country.emissions}
            />
          ))}
          {routes.map((route) => (
            <SupplyChainArc key={route.id} route={route} />
          ))}
        </>
      )}

      {/* Factory view */}
      {viewMode === "factory" && (
        <>
          {Object.entries(factories).map(([country, factoryList]) =>
            factoryList
              .slice(0, 20)
              .map((factory, idx) => (
                <FactoryDot key={`${country}-${idx}`} factory={factory} />
              ))
          )}
        </>
      )}

      {/* Heatmap view */}
      {viewMode === "heatmap" && (
        <>
          {Object.entries(countries).map(([code, country]) => (
            <CountryMarker
              key={code}
              country={code}
              coordinates={country.coordinates}
              emissions={country.emissions}
            />
          ))}
        </>
      )}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={10}
        minDistance={3}
      />

      {/* TODO: Add bloom effect back when postprocessing is properly configured */}
      {/* <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
        />
      </EffectComposer> */}
    </>
  );
}

export default function Globe() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
