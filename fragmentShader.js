// Fragment shader
const fragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0) * intensity;
    }
`;

export default fragmentShader