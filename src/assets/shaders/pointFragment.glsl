varying vec3 vCenter;

void main() {
    if (vCenter.x > 0.02 && vCenter.y > 0.02 && vCenter.z > 0.02) {
    discard;
    } else {
    if (vCenter.x < 0.02 && (vCenter.y < 0.25 || vCenter.z < 0.25)) {
        discard;
    }
    if (vCenter.y < 0.02 && (vCenter.x < 0.25 || vCenter.z < 0.25)) {
        discard;
    }
    if (vCenter.z < 0.02 && (vCenter.y < 0.25 || vCenter.x < 0.25)) {
        discard;
    }
    }
    gl_FragColor = vec4(2.55, 0.43, 2.30 , 0.2);
}
