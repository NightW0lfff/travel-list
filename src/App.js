import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
  ]);

  const addItemList = (item) => {
    setItems([...items, item]);
  };

  const setPacked = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItemList} />
      <PackingList itemList={items} setPacked={setPacked} />
      <Stats items={items} />
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

function PackingList({ itemList, setPacked }) {
  return (
    <div className="list">
      <ul>
        {itemList.map((item) => (
          <Item key={item.id} item={item} setPacked={setPacked} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, setPacked }) {
  const togglePacked = (item) => {
    setPacked(item.id);
  };

  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {item.packed ? (
        <button onClick={(e) => togglePacked(item)}>😇</button>
      ) : (
        <button onClick={(e) => togglePacked(item)}>👹</button>
      )}
    </li>
  );
}

function Stats({ items }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const temp_list = items.filter((item) => {
      if (!item.packed) {
        return item;
      }
    });

    setList(temp_list);
    console.log(list.length);
  }, [items]);

  return (
    <footer className="stats">
      <em>
        You have {list.length} items on your list, and you already packed{" "}
        {items.length - list.length}{" "}
        {`${Math.round(((items.length - list.length) / items.length) * 100)}%`}
      </em>
    </footer>
  );
}
