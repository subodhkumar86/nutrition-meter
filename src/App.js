// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ name: '', calories: '', fat: '', carbs: '' });
  const [editIndex, setEditIndex] = useState(-1);
  const calorieLimit = 1000;

  const totalCalories = items.reduce((total, item) => total + parseInt(item.calories), 0);

  const handleInputChange = (e) => {
    setItemInput({ ...itemInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      setItems([...items, itemInput]);
    } else {
      const updatedItems = [...items];
      updatedItems[editIndex] = itemInput;
      setItems(updatedItems);
      setEditIndex(-1);
    }
    setItemInput({ name: '', calories: '', fat: '', carbs: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setItemInput(items[index]);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Nutrition Meter</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={itemInput.name}
            onChange={handleInputChange}
            placeholder="Food Item"
            required
          />
          <input
            type="number"
            name="calories"
            value={itemInput.calories}
            onChange={handleInputChange}
            placeholder="Calories"
            required
          />
          <input
            type="number"
            name="fat"
            value={itemInput.fat}
            onChange={handleInputChange}
            placeholder="Fat (g)"
            required
          />
          <input
            type="number"
            name="carbs"
            value={itemInput.carbs}
            onChange={handleInputChange}
            placeholder="Carbs (g)"
            required
          />
          <button type="submit">
            {editIndex === -1 ? 'Add Item' : 'Update Item'}
          </button>
        </form>
      </div>

      <div className="calorie-display">
        <h2>Total Calories: {totalCalories} kcal</h2>
        {totalCalories > calorieLimit && (
          <p>⚠️ Calorie limit exceeded!</p>
        )}
      </div>

      <div>
        {items.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.name}</h3>
            <p>Calories: {item.calories} kcal</p>
            <p>Fat: {item.fat} g | Carbs: {item.carbs} g</p>
            <div>
              <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
