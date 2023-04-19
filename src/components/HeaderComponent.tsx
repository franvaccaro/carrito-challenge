import { useContext } from "react";
import { AppContext } from "../App";

const HeaderComponent = () => {
  const ctx = useContext(AppContext);
  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" alt=""/>
        <span>
          {ctx?.gemas === 1 ? `${ctx?.gemas} Gema` : `${ctx?.gemas} Gemas`}
        </span>
      </div>
      <button
        className="text-white hover:underline"
        onClick={() => ctx?.setShowCarrito(true)}
      >
        {`Ver Carrito (${ctx?.selectedProducts.length})`}
      </button>
    </div>
  );
};

export default HeaderComponent;
