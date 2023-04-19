export type ProductType = {
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
  products?: ProductType[],
  selectedProducts: ProductType[],
  setSelectedProducts: Function,
  disabled: string[],
  setDisabled: Function
}