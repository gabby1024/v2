import './App.css';
import ProductList from './components/ProductList';
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  imgURL: string;
  description: string;
  price: number;
  quantity: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Chocolate and whipped caramel Swiss roll",
      imgURL: "https://realfood.tesco.com/media/images/1400x919-Chocolate--caramel-swss-roll-7f47ecfe-16cc-4f44-a0cb-6cf33fa35021-0-1400x919.jpg",
      description: "Chocolate and whipped caramel Swiss roll",
      price: 1550,
      quantity: 0
    },
    {
      id: 2,
      title: "Mulled wine",
      imgURL: "https://cdn.shopify.com/s/files/1/0247/4681/9693/files/pexels-photo-5430757_480x480.jpg?v=1637058972",
      description: "Mulled wine, also known as spiced wine, is an alcoholic drink usually made with red wine, along with various mulling spices and sometimes raisins, served hot or warm.",
      price: 165,
      quantity: 0
    },
    {
      id: 3,
      title: "Wiener schnitzel",
      imgURL: "https://cdn1.matadornetwork.com/blogs/1/2020/11/Switzerland-winter-foods-wiener-schnitzel.jpg",
      description: "wiener schnitzel — thinly sliced veal that’s pounded, breaded, and pan-fried — on any lists of “traditional” Swiss foods.",
      price: 70,
      quantity: 0
    },
    {
      id: 4,
      title: "Älplermagronen Cheesy Swiss Alpine Macaroni ",
      imgURL: "https://dobbernationloves.com/wp-content/uploads/2017/10/Alplermagrnonen-1.jpg",
      description: "Swiss comfort food is best expressed via steaming bowl of alplermagronen.",
      price: 155,
      quantity: 0
    },
    {
      id: 5,
      title: "Fluffy Pancakes",
      imgURL: "https://i.redd.it/4u6x6vf5c5sa1.jpg",
      description: "souffle pancakes",
      price: 90,
      quantity: 0
    }
  ]);

  const handleIncrement = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleAddToCart = () => {
    const selected = products.filter(p => p.quantity > 0);

    if (selected.length === 0) {
      alert("No items selected.");
      return;
    }

    const message = `🛒 Added to cart:\n${selected
      .map(p => `${p.title} x${p.quantity} = ₱${(p.quantity * p.price).toFixed(2)}`)
      .join('\n')}\n\n🧾 Total: ₱${selected
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2)}`;

    alert(message);
  };

  return (
    <div>
      <div className="add-to-cart-container">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart 🛒
        </button>
      </div>

      <div className="container">
        {products.map(product => (
          <ProductList
            key={product.id}
            title={product.title}
            imgURL={product.imgURL}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            onIncrement={() => handleIncrement(product.id)}
            onDecrement={() => handleDecrement(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
