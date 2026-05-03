import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CementPlantSCADA() {

  const [screen, setScreen] = useState("overview");

  const [crusherRate, setCrusherRate] = useState(120);
  const [feedRate, setFeedRate] = useState(100);
  const [hardness, setHardness] = useState(1.0);
  const [millPower, setMillPower] = useState(60);
  const [fuelInput, setFuelInput] = useState(50);

  const [Kp, setKp] = useState(0.8);
  const [Ki, setKi] = useState(0.05);
  const [Kd, setKd] = useState(0.2);

  const [autoMode, setAutoMode] = useState(true);

  const [fineness, setFineness] = useState(40);
  const targetFineness = 30;

  const [kilnTemp, setKilnTemp] = useState(1200);
  const targetKilnTemp = 1450;

  const [co2, setCO2] = useState(800);
  const [dust, setDust] = useState(20);

  const [history, setHistory] = useState([]);
  const [alarms, setAlarms] = useState([]);

  const integral = useRef(0);
  const lastError = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {

      const error = targetFineness - fineness;

      integral.current += error;
      const derivative = error - lastError.current;
      lastError.current = error;

      const pid = Kp * error + Ki * integral.current + Kd * derivative;

      const grinding = (millPower / 100) * (1 / hardness);
      const load = feedRate / 2000;

      let newFineness = fineness - pid * 0.1 + load + 0.1 - grinding;
      newFineness = Math.max(10, Math.min(80, newFineness));

      const kilnError = targetKilnTemp - kilnTemp;
      let newKiln = kilnTemp + (fuelInput * 0.1 - kilnError * 0.05);
      newKiln = Math.max(1000, Math.min(1600, newKiln));

      const newCO2 = co2 + fuelInput * 2;
      const newDust = dust + feedRate * 0.02;

      const newAlarms = [];
      if (newKiln > 1550) newAlarms.push("KILN OVERHEAT");
      if (newFineness > 70) newAlarms.push("LOW GRIND EFFICIENCY");
      if (newCO2 > 1200) newAlarms.push("HIGH EMISSIONS");

      setAlarms(newAlarms);

      setFineness(newFineness);
      setKilnTemp(newKiln);
      setCO2(newCO2);
      setDust(newDust);

      setHistory(h => [...h, { t: h.length, fineness: newFineness, kiln: newKiln, co2: newCO2 }].slice(-100));

    }, 1000);

    return () => clearInterval(interval);
  }, [fineness, kilnTemp, millPower, fuelInput, feedRate, hardness, Kp, Ki, Kd]);

  const Nav = () => (
    <div className="flex gap-2 mb-4">
      {["overview","process","control","trends","alarms"].map(s => (
        <button key={s} onClick={() => setScreen(s)} className={screen===s?"bg-blue-500 px-3 py-1":"bg-gray-700 px-3 py-1"}>{s.toUpperCase()}</button>
      ))}
    </div>
  );

  const Overview = () => (
    <div className="grid grid-cols-4 gap-4">
      <Card><CardContent>Fineness {fineness.toFixed(1)}</CardContent></Card>
      <Card><CardContent>Kiln {kilnTemp.toFixed(0)}</CardContent></Card>
      <Card><CardContent>CO2 {co2.toFixed(0)}</CardContent></Card>
      <Card><CardContent>Dust {dust.toFixed(0)}</CardContent></Card>
    </div>
  );

  const Trends = () => (
    <Card className="h-64"><CardContent>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Line dataKey="fineness" stroke="#60a5fa" dot={false} />
          <Line dataKey="kiln" stroke="#f97316" dot={false} />
          <Line dataKey="co2" stroke="#34d399" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent></Card>
  );

  const Control = () => (
    <Card><CardContent className="grid gap-4">
      <div className="flex justify-between">
        <span>Auto Mode</span>
        <Switch checked={autoMode} onCheckedChange={setAutoMode} />
      </div>

      <p>Crusher</p>
      <Slider value={[crusherRate]} min={50} max={200} onValueChange={v=>setCrusherRate(v[0])} />

      <p>Feed</p>
      <Slider value={[feedRate]} min={50} max={200} onValueChange={v=>setFeedRate(v[0])} />

      <p>Mill Power</p>
      <Slider value={[millPower]} min={10} max={100} onValueChange={v=>setMillPower(v[0])} />

      <p>Fuel</p>
      <Slider value={[fuelInput]} min={10} max={100} onValueChange={v=>setFuelInput(v[0])} />

    </CardContent></Card>
  );

  const Alarms = () => (
    <Card><CardContent>
      {alarms.length===0? <p className="text-green-500">NO ALARMS</p> : alarms.map((a,i)=><p key={i} className="text-red-500">⚠ {a}</p>)}
    </CardContent></Card>
  );

  const Process = () => (
    <Card><CardContent>
      Crusher → Raw Mill → Kiln → Cooler → Emissions
    </CardContent></Card>
  );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">CEMENT PLANT SCADA SYSTEM</h1>
      <Nav />
      {screen==='overview' && <Overview />}
      {screen==='process' && <Process />}
      {screen==='control' && <Control />}
      {screen==='trends' && <Trends />}
      {screen==='alarms' && <Alarms />}
    </div>
  );
}
