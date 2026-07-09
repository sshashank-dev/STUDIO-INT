import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, Trash2, ArrowLeft, X, Upload, Lock, ShieldCheck, Database } from "lucide-react";
import { Link } from "react-router-dom";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // --- CURSOR HARD RESET ---
    useEffect(() => {
        // This forces the cursor to appear regardless of global CSS
        document.documentElement.style.setProperty('cursor', 'auto', 'important');
        document.body.style.setProperty('cursor', 'auto', 'important');

        return () => {
            // Re-hide the cursor when leaving the admin page to keep the home page clean
            document.documentElement.style.setProperty('cursor', 'none');
            document.body.style.setProperty('cursor', 'none');
        };
    }, []);

    // --- DATA STATES ---
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        imageUrl: "",
        year: "2026"
    });

    const handleAuth = (e) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/projects");
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (err) { console.error("Sync Error"); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (isAuthenticated) fetchProjects(); }, [isAuthenticated]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "your_preset");
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud/image/upload", {
                method: "POST",
                body: data,
            });
            const fileData = await res.json();
            setFormData({ ...formData, imageUrl: fileData.secure_url });
        } catch (err) { console.error("Upload failed"); }
        finally { setUploading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                fetchProjects();
                setIsAdding(false);
                setFormData({ title: "", category: "", imageUrl: "", year: "2026" });
            }
        } catch (err) { console.error("Write failed"); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("PERMANENT_DELETE?")) return;
        try {
            await fetch(`http://localhost:5000/api/projects/${id}`, { method: "DELETE" });
            fetchProjects();
        } catch (err) { console.error("Delete failed"); }
    };

    // --- RENDER: AUTH GATE ---
    if (!isAuthenticated) {
        return (
            <div className="h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-white font-mono !cursor-auto">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm border border-white/5 p-12 bg-[#0D0D0D]">
                    <div className="mb-10 flex justify-center">
                        <div className={`p-4 border border-white/10 ${error ? 'text-red-500 border-red-500' : 'text-white'}`}>
                            <Lock size={24} />
                        </div>
                    </div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-center mb-10 opacity-30">Authentication_Required</h2>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <input
                            type="password" placeholder="PASSWORD"
                            className="w-full bg-black border border-white/5 p-4 text-center text-xs outline-none focus:border-white transition-all uppercase !cursor-text"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:invert transition-all !cursor-pointer">
                            Initialize_Unlock
                        </button>
                    </form>
                    <Link to="/" className="block mt-10 text-[8px] text-center opacity-20 hover:opacity-100 uppercase tracking-widest">[ Exit ]</Link>
                </motion.div>
            </div>
        );
    }

    // --- RENDER: DASHBOARD ---
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-20 font-sans selection:bg-white selection:text-black !cursor-auto">

            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-10 mb-20 gap-8">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">
                        <ShieldCheck size={14} /> System_Live
                    </div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Control_Panel</h1>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:invert transition-all flex items-center gap-2 !cursor-pointer">
                    {isAdding ? <X size={14} /> : <Plus size={14} />} {isAdding ? "Cancel" : "Add_Entry"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <AnimatePresence>
                    {isAdding && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="lg:col-span-4 h-fit sticky top-10 border border-white/5 p-8 bg-[#0D0D0D]">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-mono uppercase opacity-30">Visual_Asset</label>
                                    <div className="relative aspect-video w-full bg-black border border-dashed border-white/10 flex items-center justify-center overflow-hidden !cursor-pointer">
                                        {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <Upload size={20} className="opacity-20" />}
                                        <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 !cursor-pointer" />
                                        {uploading && <div className="absolute inset-0 bg-black/80 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase opacity-30">Title</label>
                                    <input className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none uppercase text-sm !cursor-text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono uppercase opacity-30">Category</label>
                                    <input className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none uppercase text-sm !cursor-text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                                </div>
                                <button type="submit" className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest !cursor-pointer">Save_Entry</button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={isAdding ? "lg:col-span-8" : "lg:col-span-12"}>
                    <div className="flex justify-between items-center mb-10 text-[10px] font-mono uppercase opacity-30 tracking-[0.4em]">
                        <span>Archive_Database</span>
                        <Database size={12} />
                    </div>
                    {loading ? <Loader2 className="animate-spin opacity-10 mx-auto" /> : (
                        <div className="space-y-4">
                            {projects.map((p) => (
                                <div key={p._id} className="flex items-center justify-between p-5 border border-white/5 bg-[#0D0D0D] hover:border-white/20 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <img src={p.imageUrl} className="w-16 h-16 object-cover grayscale opacity-40 group-hover:opacity-100 transition-all" />
                                        <div>
                                            <h3 className="font-black uppercase tracking-tighter text-xl">{p.title}</h3>
                                            <p className="text-[9px] font-mono opacity-20 uppercase">{p.category}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(p._id)} className="p-4 text-white/5 hover:text-red-500 transition-all !cursor-pointer"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}