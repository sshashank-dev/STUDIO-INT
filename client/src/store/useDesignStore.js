import { create } from 'zustand';

export const useDesignStore = create((set) => ({
    cart: [],
    activeMaterial: '#1a1a1a',
    addItem: (item) => set((state) => ({
        cart: [...state.cart, { ...item, id: Date.now() }]
    })),
    setMaterial: (mat) => set({ activeMaterial: mat }),
    removeItem: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),
}));