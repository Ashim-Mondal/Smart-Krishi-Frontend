import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "panel" | "center";
  headerRight?: ReactNode;
}

export default function Modal({ open, onClose, title, children, variant = "panel", headerRight }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {variant === "panel" ? (
            <motion.div
              className="ml-auto relative h-full w-full max-w-xl bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-ink">{title}</h2>
                <div className="flex items-center gap-2">
                  {headerRight}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 text-muted transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            </motion.div>
          ) : (
            <motion.div
              className="m-auto relative w-full max-w-lg bg-white rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-ink">{title}</h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-muted">
                  <X size={18} />
                </button>
              </div>
              <div className="px-6 py-6">{children}</div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
