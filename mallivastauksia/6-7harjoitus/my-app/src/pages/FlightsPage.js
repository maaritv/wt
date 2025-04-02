import { useState } from "react";

// Otsikkokomponentti vihreällä taustalla



// FlightsPage, joka yhdistää komponentit
function FlightsPage() {
    const [selectedFlight, setSelectedFlight] = useState(null);

    const flights = [
        { number: "AY123", destination: "Helsinki", time: '18:30', gate: 23 },
        { number: "BA456", destination: "London", time: '18:50', gate: 12 },
        { number: "DL789", destination: "New York", time: '19:20', gate: 16 }
    ];

    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    return (
        <div style={mainStyle}>
            <Header />
            <StatusText selectedFlight={selectedFlight} />
            <FlightsTable flights={flights} onSelectFlight={setSelectedFlight} />
        </div>
    );
};

function Header() {

    const headerStyle = {
        backgroundColor: "lightgreen",
        width: 400,
        height: 30,
        alignSelf: "center",
    }

    const dateStr = new Date().toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    return (<div style={headerStyle}>
        Lähtevät lennot {dateStr}
    </div>);
}

// StatusText-komponentti näyttää valitun lennon tiedot
function StatusText({ selectedFlight }) {
    return (<div className="p-4 text-lg text-center">
        {selectedFlight
            ? `Selected Flight: ${selectedFlight.number} - ${selectedFlight.destination}`
            : "No flight selected"}
    </div>)
}

// FlightsTable-komponentti näyttää lentolistauksen
const FlightsTable = ({ flights, onSelectFlight }) => (
    <table style={{ borderWidth: 0 }}>
        <thead style={{ borderWidth: 0 }}>
            <tr style={{ background: 'lightblue' }}>
                <th>Lennon numero</th>
                <th>Destination</th>
                <th>Kello</th>
                <th>Portti</th>
                <th>Valitse</th>
            </tr>
        </thead>
        <tbody>
            {flights.map((flight) => (
                <tr key={flight.number}>
                    <td>{flight.number}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.time}</td>
                    <td>{flight.gate}</td>
                    <td>
                        <button
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                            onClick={() => onSelectFlight(flight)}
                        >
                            Select
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default FlightsPage;