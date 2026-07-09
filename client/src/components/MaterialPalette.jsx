import { useDesignStore } from '../store/useDesignStore';

const materials = [
    { id: 'oak', color: '#B58B55' },
    { id: 'marble', color: '#E0E0E0' },
    { id: 'velvet', color: '#4A148C' }
];

export default function MaterialPalette() {
    const { setMaterial } = useDesignStore();
    return (
        <div className="flex gap-2 p-4">
            {materials.map(m => (
                <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    style={{ backgroundColor: m.color }}
                    className="w-10 h-10 rounded-full border-2 border-white"
                />
            ))}
        </div>
    );
}