import React, {useState} from "react"

function AddMemoComponent({addNewMemo}){
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
 
   const handleSubmit = (event) => {
     event.preventDefault(); // Estää lomakkeen uudelleenlatautumisen
 
     if (name.trim() && description.trim()) {
       addNewMemo({ memoName: name, memoDescription: description }); // Kutsutaan takaisinkutsufunktiota
       setName(""); // Tyhjennetään kentät
       setDescription("");
     }
   };
 
   return (<div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nimi:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anna muistiinpanon nimi"
        />
      </div>
      <div>
        <label>Kuvaus:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kirjoita kuvaus..."
        />
      </div>
      <button type="submit">Lisää memo</button>
     </form>
   </div>)
}

export default AddMemoComponent;


