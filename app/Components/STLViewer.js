import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const STLViewer = ({ url }) => {
    const containerRef = useRef();

    useEffect(() => {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xf0f0f0, 1); // Set white background color
        containerRef.current.appendChild(renderer.domElement);

        // Controls
        new OrbitControls(camera, renderer.domElement);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);

        // Grid background
        const gridHelper = new THREE.GridHelper(100, 100, 0x0000ee, 0x000000);
        scene.add(gridHelper);

        // // Background mesh
        // const geometry = new THREE.PlaneGeometry(100, 100);
        // const material = new THREE.MeshBasicMaterial({ color: 0xeeee });
        // const backgroundMesh = new THREE.Mesh(geometry, material);
        // scene.add(backgroundMesh);

        // Load STL
        const loader = new STLLoader();
        loader.load(url, function (geometry) {
            const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 200 });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();

        // Clean up on unmount
        return () => {
            while (containerRef.current.firstChild) {
                containerRef.current.firstChild.remove();
            }
        };
    }, [url]);

    return <div ref={containerRef} style={{ width: '600px', height: '600px' }} />;
};

export default STLViewer;
