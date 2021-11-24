// import { Curtains, Plane } from "curtainsjs";
// wait for everything to be ready
window.addEventListener("load", () => {
	// set up our WebGL context and append the canvas to our wrapper
	const curtains = new Curtains({
		container: "canvas",
	});
	// const plane = new Plane(curtains, planeElement, params);
	// plane.onRender(() => {
	// 	// use the onRender method of our plane fired at each requestAnimationFrame call
	// 	plane.uniforms.time.value++; // update our time uniform value
	// });
	// vertices coordinates helper
	const verticesHelperVs = `      
	precision mediump float;
	
	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;
	
	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	
	varying vec3 vVertexPosition;
	varying vec2 vTextureCoord;
	
	uniform float uTime;
	
	void main() {
			vec3 vertexPosition = aVertexPosition;
			
			vertexPosition.z = sin(vertexPosition.x * 3.141592 + uTime * 0.08) * 0.03;
			
			gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
			
			// set the varyings
			vTextureCoord = aTextureCoord;
			vVertexPosition = vertexPosition;
	}
`;

	const verticesHelperFs = `        
	precision mediump float;
	
	varying vec3 vVertexPosition;
	varying vec2 vTextureCoord;
	
	uniform sampler2D uSampler0;
	void main() {
			gl_FragColor = texture2D(uSampler0, vTextureCoord);
	}
`;

	// get our plane element
	const verticesHelperEl = document.getElementById(
		"vertices-position-helper-plane"
	);

	if (verticesHelperEl) {
		// set our initial parameters (basic uniforms)
		const verticesHelperPlaneParams = {
			vertexShader: verticesHelperVs, // our vertex shader
			fragmentShader: verticesHelperFs, // our framgent shader
			widthSegments: 5,
			heightSegments: 5,
			uniforms: {
				time: {
					name: "uTime",
					type: "1f",
					value: 0,
				},
			},
		};

		// create our plane using our curtains object, the HTML element and the parameters
		const verticesHelperPlane = new Plane(
			curtains,
			verticesHelperEl,
			verticesHelperPlaneParams
		);

		verticesHelperPlane.onRender(() => {
			verticesHelperPlane.uniforms.time.value++;
		});
	}
});
