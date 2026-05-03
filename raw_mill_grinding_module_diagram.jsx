import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function RawMillGrindingModule() {
  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Cement Plant – Raw Mill (Grinding)</h1>

      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {/* Input */}
            <div className="p-4 border rounded-xl">
              <h2 className="font-semibold">Input</h2>
              <p>Blended Raw Material</p>
              <ul className="text-sm mt-2 list-disc pl-4">
                <li>Limestone mix</li>
                <li>Clay</li>
                <li>Sand & additives</li>
              </ul>
            </div>

            {/* Process */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 border rounded-xl w-full text-center">
                <h2 className="font-semibold">Raw Mill (Grinding)</h2>
                <p className="text-sm mt-2">
                  Mechanical grinding to reduce particle size for kiln reactivity
                </p>
                <div className="mt-3 text-xs text-gray-600">
                  Key Variables:
                  <ul className="list-disc pl-4 text-left mt-1">
                    <li>Energy use (kWh/ton)</li>
                    <li>Fineness (Blaine or residue %)</li>
                    <li>Throughput (tons/hour)</li>
                  </ul>
                </div>
              </div>
              <ArrowRight className="mt-4" />
            </div>

            {/* Output */}
            <div className="p-4 border rounded-xl">
              <h2 className="font-semibold">Output</h2>
              <p>Raw Meal</p>
              <ul className="text-sm mt-2 list-disc pl-4">
                <li>Fine powder</li>
                <li>Homogenized composition</li>
                <li>Ready for preheating/kiln feed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
