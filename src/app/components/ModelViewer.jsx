// app/components/ModelViewer.jsx
'use client';

import Script from 'next/script';

export default function ModelViewer({rotate1,rotate2,rotate3}) {
  return (
    <>
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
      />

      <model-viewer
        src="/360_sphere_robot_no_glass.glb"
        auto-rotate
        camera-controls
        interaction-prompt="none"
        orientation={`${rotate1}deg ${rotate2}deg ${rotate3}deg`}
      />
    </>
  );
}