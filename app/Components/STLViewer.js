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
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xf0f0f0, 1); // Set white background color
        containerRef.current.appendChild(renderer.domElement);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);

        // Grid background
        const gridHelper = new THREE.GridHelper(1000, 100, 0x0000ee, 0x000000);
        scene.add(gridHelper);

// Load STL
const loader = new STLLoader();
loader.load(url, function (geometry) {
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 200 });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(mesh);

    // Get center of the bounding box
    const center = box.getCenter(new THREE.Vector3());

    // Move the mesh to the center of the scene
    mesh.position.x += (mesh.position.x - center.x);
    mesh.position.y += (mesh.position.y - center.y);
    mesh.position.z += (mesh.position.z - center.z);

    // Update bounding box
    box.setFromObject(mesh);

    // Get size of the bounding box
    const size = box.getSize(new THREE.Vector3());

    // Get the max dimension
    const maxDim = Math.max(size.x, size.y, size.z);
    
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

    camera.position.z = cameraZ * 1.5;  // Increase this value to move the camera further out
    camera.updateProjectionMatrix();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(center);
    controls.update();
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
