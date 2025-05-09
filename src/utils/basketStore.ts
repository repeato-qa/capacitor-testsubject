import { create } from 'zustand';
import type { Product } from './types'; // Import the centralized Product interface

// Assuming Product interface is defined elsewhere and imported
// For now, let's define a basic one here if not.
// You'll likely want to import this from your types definition file or ProductCatalog.tsx

interface BasketState {
  basketItems: Product[];
  itemCount: number;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: string) => void;
  // clearBasket: () => void; // Optional: for future enhancement
}

export const useBasketStore = create<BasketState>((set, get) => ({
  basketItems: [],
  itemCount: 0,
  addToBasket: (product) => {
    const currentItems = get().basketItems;
    // Prevent adding duplicate products for now
    if (!currentItems.find(item => item.id === product.id)) {
      set((state) => ({
        basketItems: [...state.basketItems, product],
        itemCount: state.basketItems.length + 1,
      }));
    }
  },
  removeFromBasket: (productId) => {
    set((state) => ({
      basketItems: state.basketItems.filter(item => item.id !== productId),
      itemCount: state.basketItems.filter(item => item.id !== productId).length,
    }));
  },
  // clearBasket: () => set({ basketItems: [], itemCount: 0 }),
}));

// Example of how to get derived state (itemCount) more robustly if needed,
// or if it becomes more complex than just length.
// For now, directly updating itemCount in actions is fine.
//
// const unsub = useBasketStore.subscribe(
//   (state) => state.basketItems,
//   (basketItems) => {
//     useBasketStore.setState({ itemCount: basketItems.length });
//   },
// );
// This subscription method is more for side effects outside of component renders.
// Deriving in components or simple state updates are usually preferred.
