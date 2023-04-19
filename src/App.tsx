import { createContext, useEffect, useState } from "react";
import CarritoComponent from "./components/CarritoComponent";
import HeaderComponent from "./components/HeaderComponent";
import ProductsList from "./components/ProductsList";
import { AppContextType } from "./types/types";

function App() {
  const [showCarrito, setShowCarrito] = useState(false);
  const [gemas, setGemas] = useState(3);
  const [products, setProducts] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState([])
  const [disabled, setDisabled] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-full bg-fixed" style={{ backgroundImage: "url(background.webp)" }}>
      <AppContext.Provider 
        value={{
          showCarrito, 
          setShowCarrito, 
          gemas, 
          setGemas, 
          products,
          selectedProducts,
          setSelectedProducts,
          disabled,
          setDisabled
        }}
      >
        <HeaderComponent />
        <div className="flex justify-center min-h-full">
          <div className="max-w-lg w-full py-16">
            {showCarrito ? <CarritoComponent /> : <ProductsList />}
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

export const AppContext = createContext<AppContextType | null>(null);
