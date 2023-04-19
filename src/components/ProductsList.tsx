import { useContext } from "react";
import { AppContext } from "../App";
import { ProductType } from "../types/types";

const ProductsList = () => {
  const ctx = useContext(AppContext);

  const handleSelection = (potion: ProductType) => {
    if(ctx?.gemas as number > 0 && ctx?.gemas as number >= potion.precio) {
      ctx?.setGemas((gemas: number) => gemas - potion.precio);
      ctx?.selectedProducts.push(potion);
      ctx?.disabled.push(potion.categoria);
    }
  };

  return (
    <div className="flex flex-row justify-start w-full gap-4 flex-wrap">
      {
        ctx?.products &&
        ctx?.products.map((potion) => (
          <div
            className="flex flex-col justify-between items-start w-60 bg-stone-700 rounded-lg p-4 gap-2"
            key={potion.nombre}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-end items-center w-full">
                <div className="bg-green-500 text-xs p-2 text-white rounded-full">
                  {potion.precio > 1 ? `${potion.precio} Gemas` : `${potion.precio} Gema`}
                </div>
              </div>
              <div className="flex justify-center w-full">
                <img src={potion.imagen} alt="" width={50} />
              </div>
              <div className="flex w-full">
                <h2 className="text-gray-200 font-bold text-lg">
                  {potion.nombre}
                </h2>
              </div>
              <div className="flex w-full">
                <h2 className="text-gray-500 text-sm">
                  {potion.descripcion}
                </h2>
              </div>
            </div>
            <div className="flex w-full">
              <button
                className={`flex flex-row w-full justify-center rounded-xl p-1 ease-in duration-200
                  ${(ctx.gemas > 0 && potion.precio <= ctx.gemas && !ctx?.disabled.includes(potion.categoria)) 
                    ? 'bg-purple-700 hover:bg-purple-500 hover:scale-105 text-white' 
                    : 'bg-gray-600 cursor-default text-slate-400'}`
                }
                disabled={ctx?.disabled.includes(potion.categoria)}
                onClick={() => handleSelection(potion)}
              >
                Agregar
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ProductsList;
