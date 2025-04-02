import "./styles.css";
import React from "react";
import { calculatePower } from "./calculations";

function PotentialEnergyCalculator() {
  const instructions = "Kirjoita jännite ja virta syötekenttiin";
  const [voltage, setVoltage] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [power, setPower] = React.useState(0);

  function handleVoltageChange(event) {
    setVoltage(Number(event.target.value));
  }

  function handleCurrentChange(event) {
    setCurrent(Number(event.target.value));
  }

  function resolvePower() {
    if (voltage > 0 && current > 0) {
      const power = calculatePower(voltage, current);
      setPower(power);
    } else {
      setPower(0);
    }
  }

  return (
    <div>
      <h2>{instructions}</h2>
      <form>
        <label>U 1. syöte (parametri):</label>
        <input
          type="number"
          name="u"
          value={voltage}
          onChange={handleVoltageChange}
        />
        <br />
        <label>I 2. syöte (parametri):</label>
        <input
          type="number"
          name="i"
          value={current}
          onChange={handleCurrentChange}
        />
        <p>
          <label>Teho (tuloste) on: {power}</label>
        </p>
        <button type="button" onClick={resolvePower}>
          Laske teho
        </button>
      </form>
    </div>
  );
}

export default PotentialEnergyCalculator;
