"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const routes = [
  { path: "/", label: "Home", number: 0 },
  { path: "/gradient1", label: "CSS Gradients", number: 1 },
  { path: "/gradient2", label: "CSS Blobs", number: 2 },
  { path: "/gradient3", label: "3D Shapes", number: 3 },
  { path: "/gradient4", label: "Noise Gradients", number: 4 },
  { path: "/gradient5", label: "WebGL/Canvas", number: 5 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        {routes.map((route) => {
          const isActive = pathname === route.path;

          return (
            <Link key={route.path} href={route.path}>
              <motion.div
                className={`nav-indicator ${isActive ? "active" : ""}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={route.label}
              />
            </Link>
          );
        })}
      </div>

      {/* Page Info */}
      {/* <div className="text-center mt-4">
        <motion.p
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/70"
        >
          {routes.find((route) => route.path === pathname)?.label || "Home"}
        </motion.p>
      </div> */}
    </nav>
  );
}
