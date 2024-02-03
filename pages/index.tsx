'use client';
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { addDoc, collection, deleteDoc, onSnapshot, query, doc } from "firebase/firestore";
import { db } from './firebase'

const inter = Inter({ subsets: ["latin"] });


export default function Home() {

  const [items, setItems] = useState([
    { name: 'For dinner', price: 12.5 },
    { name: 'candy', price: 3.46 },
    { name: 'PS5', price: 720.50 },
  ])
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0
  })
  const [total, setTotal] = useState(0)

  // Add items to DB
  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price > 0) {
      await addDoc(collection(db, 'expenses'), {
        name: newItem.name,
        price: newItem.price
      })
      setNewItem({ name: '', price: 0 })
    }
  }

  // Read items from firebase
  useEffect(() => {
    const q = query(collection(db, 'expenses'));
    const unsunscribe = onSnapshot(q, querySnapshot => {
      let itemsArray = []

      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArray)

      // Read totle from item array
      const calculateTotal = () => {
        const totalPrice = itemsArray.reduce(
          (sum, item) => sum + parseFloat(item.price), 0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsunscribe()
    });
  }, []);

  // delete items from the DB
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'expenses', id))
  }


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-400 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-2 border"
              type="text"
              placeholder="Enter item" />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              className="col-span-2 p-2 border mx-3"
              type="number"
              placeholder="Enter $" />
            <button 
              className="text-white bg-slate-500 p-2 text-xl hover:bg-slate-600" 
              onClick={(e) =>addItem(e)}>+</button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li 
                key={id} 
                className="my-4 w-full flex justify-between bg-slate-300">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-500 hover:bg-red-600 w-16"
                  >X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className="p-3 flex justify-between">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
