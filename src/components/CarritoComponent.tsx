import { useContext } from "react";
import { AppContext } from "../App";

const CarritoComponent = () => {
  const ctx = useContext(AppContext);
  console.log(ctx?.selectedProducts)
  
  const handleDeleteSelected = (selectedPotion: any) => {
    ctx?.setSelectedProducts(ctx?.selectedProducts.filter((potions) => potions.id !== selectedPotion.id));
    ctx?.setGemas((prev: number) => prev + selectedPotion.precio);
    ctx?.setDisabled(ctx?.disabled.filter((potions) => potions !== selectedPotion.id));
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <button
        className="bg-purple-700 px-4 p-2 text-white rounded-full w-min"
        onClick={() => ctx?.setShowCarrito(false)}
      >
        Volver
      </button>
      <div>
        {
          ctx?.selectedProducts &&
          ctx?.selectedProducts.map((product) => (
            <div key={product.nombre} className="flex justify-between px-4 py-2 items-center w-full bg-stone-700 border-b-2 border-stone-500">
              <div className="flex justify-center items-center rounded-full bg-stone-500">
                <img src={product.imagen} alt="" width={40} />
              </div>
              <div className="text-gray-200 font-bold text-lg">
                {product.nombre}
              </div>
              <div className="text-gray-200 font-bold text-lg">
                <button onClick={() => handleDeleteSelected(product)}>
                  X
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CarritoComponent;
