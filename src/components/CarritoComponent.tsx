import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { ProductType } from "../types/types";

const CarritoComponent = () => {
  const ctx = useContext(AppContext);
  const [shopPermission, setShopPermission] = useState<Boolean>(true);
  const [shopDone, setShopDone] = useState<Boolean>(false);
  
  const handleDeleteSelected = (selectedPotion: ProductType) => {
    ctx?.setSelectedProducts(ctx?.selectedProducts.filter((potions) => potions.id !== selectedPotion.id));
    ctx?.setGemas((prev: number) => prev + selectedPotion.precio);
    ctx?.setDisabled(ctx?.disabled.filter((potions) => potions !== selectedPotion.categoria));
  };

  const handleShopDone = (res: Response) => {
    if (res.status === 201) {
      setShopDone(true);
      setShopPermission(false);
      ctx?.setDisabled([]);
      ctx?.setSelectedProducts([]);
    }
  };
  
  const handleBuyAction = async () => {
    const selectedProductsId = ctx?.selectedProducts.map((products) => products.id);
    await fetch("http://localhost:3001/compras", {
      method: "POST",
      body: JSON.stringify({ itemsId: selectedProductsId }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(res => handleShopDone(res))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    ctx?.selectedProducts.length as number > 0 ? setShopPermission(true) : setShopPermission(false);
  }, [ctx?.selectedProducts]);

  return (
    <div className="flex flex-col w-full gap-4">
      <button
        className="bg-purple-700 hover:bg-purple-500 px-4 p-2 text-white rounded-full w-min ease-in duration-200"
        onClick={() => ctx?.setShowCarrito(false)}
      >
        Volver
      </button>
      <div>
        {
          shopDone ?
          <div className="flex w-full text-lg text-gray-200 font-bold">
            Compra Realizada!
          </div>
          :
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
      <div className="flex w-full">
        <button
          className={`flex flex-row w-full justify-center rounded-full p-2 ease-in duration-200
          ${(shopPermission) ? 'bg-purple-700 hover:bg-purple-500 text-white' : 'bg-gray-600 cursor-default text-slate-400'}`}
          disabled={!shopPermission as boolean}
          onClick={() => handleBuyAction()}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CarritoComponent;
