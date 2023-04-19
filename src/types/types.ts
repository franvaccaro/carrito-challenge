interface ProductModel {
  id: number,
  nombre: string,
  precio: number,
  categoria: string,
  descripcion: string,
  imagen: string
}

export type AppContextType = {
  showCarrito: boolean,
  setShowCarrito: Function,
  gemas: number,
  setGemas: Function,
  products: ProductModel[],
  selectedProducts: ProductModel[],
  setSelectedProducts: Function,
  disabled: number[],
  setDisabled: Function
}