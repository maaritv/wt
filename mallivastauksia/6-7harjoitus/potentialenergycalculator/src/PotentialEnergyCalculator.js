import "./styles.css";
import React from "react";
import { calculatePotentialEnergy } from "./calculations";

function PotentialEnergyCalculator() {
  const instructions = "Kirjoita m ja h syötekenttiin (g.tä ei tarvitse, koska se on vakio.)";
  const [mass, setMass] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [energy, setEnergy] = React.useState(0);

  function handleMassChange(event) {
    setMass(Number(event.target.value));
  }

  function handleHeightChange(event) {
    setHeight(Number(event.target.value));
  }

  function resolveEnergy() {
    if (mass > 0 && height > 0) {
      const energy = calculatePotentialEnergy(mass, height);
      setEnergy(energy);
    } else {
      setEnergy(0);
    }
  }

  return (
    <div>
      <h2>{instructions}</h2>
      <form>
        <label>Mass:</label>
        <input
          type="number"
          name="u"
          value={mass}
          onChange={handleMassChange}
        />
        <br />
        <label>Height:</label>
        <input
          type="number"
          name="i"
          value={height}
          onChange={handleHeightChange}
        />
        <p>
          <label>Potentiaalienergia: {energy}</label>
        </p>
        <button type="button" onClick={resolveEnergy}>
          Laske potentiaalienergia
        </button>
      </form>
    </div>
  );
}

export default PotentialEnergyCalculator;
