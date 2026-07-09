import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function MyTestOverlay({ onClose }) {
    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/60 z-[9998]"
            />

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "500px",
                    height: "100vh",
                    background: "red",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "48px",
                    fontWeight: "bold",
                }}
            >
                HELLO
            </div>
        </>
    );
} 