import { useDesignStore } from '../store/useDesignStore';

export default function BudgetSidebar() {
    const { cart, removeItem, getTotal } = useDesignStore();

    return (
        <div className="fixed top-20 right-5 w-64 bg-black/80 p-4 border border-white/20 text-white">
            <h2 className="font-bold mb-4">Project Budget</h2>
            {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span>{item.name}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-500">X</button>
                </div>
            ))}
            <div className="mt-4 border-t pt-2 font-bold">
                Total: ${getTotal(useDesignStore.getState())}
            </div>
        </div>
    );
}