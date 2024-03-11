import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Labosi", quantity: 23, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  const Handletoggleitem = (id) =>{
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed } : item));
  }

  const HandleAddItem = (item) => {
    setItems(items => [...items, item]);
  };

  const HandledeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const HandleClearitem = () => {
    const confirmed = window.confirm("Are you sure you want to clear all items?");

   if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAdditems= {HandleAddItem} />
      <PackingList items={items} onDeleteitem = {HandledeleteItem} onToggleitem ={Handletoggleitem} onClear={HandleClearitem}/>
      <Stats item = {items}/>
    </div>
  )
}

function Logo() {
  return (
    <div>
      <h1> Far Away Labosi</h1>
    </div>
  )
}

function Form({onAdditems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const Handlesubmit = (e) => {
    e.preventDefault(); 

    if(!description) return;

    const newItem = {description, quantity, packed: false , id: Date.now() };
    console.log(newItem);

    onAdditems(newItem);

    setDescription("");
    setQuantity(1);
  }   

  return(
    <form className="add-form" onSubmit={Handlesubmit}>
      <h3>What do you want for your Labosi trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => (i + 1)).map(num =>(
        <option value={num} key={num}>
          {num}
          </option> ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>  
    </form>
  )
}

function PackingList({items , onDeleteitem , onToggleitem , onClear}) {
  const [sortby, setsortby] = useState("input");

  let sorteditems;

  if (sortby === "input") sorteditems = items;

  if (sortby === "description") sorteditems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === "packed") sorteditems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed)); 

  return (
    <div className="list">
      <ul>
        {sorteditems .map((item) =>(
          <Item item={item} onDeleteitem={onDeleteitem} onToggleitem = {onToggleitem} key={item.id}/>
        ))}
      </ul>
      
      <div className="actions">
        <select value={sortby} onChange={(e) => setsortby (e.target.value)}>
          <option value="input"> Sort by input order</option>
          <option value="description"> Sort by description</option>
          <option value="packed"> Sort by packed</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  )
}

function Item ({ item , onDeleteitem , onToggleitem}){
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={ () => onToggleitem(item.id)} />
    <span style={item.packed ? {textDecoration : "line-through"} : {} }>
    {item.quantity} {item.description}
    </span>
    <button onClick={() => onDeleteitem(item.id)}>❌</button>  
    </li>
  )
}

function Stats({ item  }) {
 
  if (!item.length) return(
    <p className="stats">
      <em>
        Start adding to your packing list
      </em> 
    </p>
   )


  const itemsnumber = item.length;
  const packednumber = item.filter(item => item.packed === true).length;
  const percentage = Math.round((packednumber / itemsnumber) * 100);

return (
  <footer className="stats">
    <em>
      {percentage === 100 ? "You are ready for labosi trip" :`You have ${itemsnumber} Labosi items on your list , 
       and you already packed ${packednumber} (${(percentage)})%`
       }
    </em>
  </footer>
)
}















