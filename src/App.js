import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import { ProductContext, CartContext } from './contexts'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		setCart([...cart, item])
	};

	const removeItem = itemID => {
		const cartCopy = [...cart] // Splice mutates original array, so we make a copy 
		let index;
		for(let i = 0; i < cartCopy.length; i++) { // Loop through cart, return index of item 
			if(cartCopy[i].id === itemID) {		   // with id matching itemID
				index = i						   // assign index 
			}
		}

		if(index) {
			cartCopy.splice(index, 1) // Splice returns copied array minus item
			setCart(cartCopy)
		}
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }} >
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>

					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
