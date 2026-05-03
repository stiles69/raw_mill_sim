import React from "react";

export default function RawMaterialHandling() {
  return (
    <div className="p-6 rounded-2xl shadow-lg border bg-white max-w-xl">
      <h2 className="text-xl font-bold mb-4">Raw Material Handling</h2>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">Inputs</h3>
          <ul className="list-disc ml-5 text-sm">
            <li>Limestone</li>
            <li>Clay</li>
            <li>Sand</li>
            <li>Additives</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Output</h3>
          <p className="text-sm">Blended raw material</p>
        </div>

        <div>
          <h3 className="font-semibold">Key Variables</h3>
          <ul className="list-disc ml-5 text-sm">
            <li>Feed rate (tons/hour)</li>
            <li>Moisture (%)</li>
            <li>Particle size distribution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}