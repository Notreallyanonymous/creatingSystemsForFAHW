// Vertex shader
const vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal; // Calculate the normal
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export default vertexShader