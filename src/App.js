import { useState } from "react";

export default function App() {
  const [initialItems, addItem] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
  ]);

  const addItemList = (item) => {
    addItem([...initialItems, item]);
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItemList} />
      <PackingList itemList={initialItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, package: false, id: Date.now() };

    setDescription("");
    setQuantity(1);

    addItem(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 className="">What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ itemList }) {
  return (
    <div className="list">
      <ul>
        {itemList.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>👹</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X item on your list, and you already packed X (X%)</em>
    </footer>
  );
}
