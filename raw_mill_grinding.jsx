import React from "react";

export default function RawMillGrinding() {
  return (
    <div className="p-6 rounded-2xl shadow-lg border bg-white max-w-xl">
      <h2 className="text-xl font-bold mb-4">Raw Mill Grinding</h2>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">Input</h3>
          <p className="text-sm">Blended raw material from handling system</p>
        </div>

        <div>
          <h3 className="font-semibold">Output</h3>
          <p className="text-sm">Finely ground raw meal</p>
        </div>

        <div>
          <h3 className="font-semibold">Key Variables</h3>
          <ul className="list-disc ml-5 text-sm">
            <li>Mill speed (RPM)</li>
            <li>Grinding time (minutes)</li>
            <li>Energy consumption (kWh/ton)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}