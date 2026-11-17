"use client";

import { Map as MapIcon, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mapNodes } from "@/data/weather";
import { ModalShell } from "@/components/common/ModalShell";

export function MapModal() {
  const { isDark, setShowMapModal } = useApp();

  return (
    <ModalShell onClose={() => setShowMapModal(false)} maxWidth="max-w-4xl">
      <div
        className={
          isDark
            ? "p-4 border-b border-zinc-800 flex justify-between items-center"
            : "p-4 border-b border-gray-150 flex justify-between items-center"
        }
      >
        <div className="flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-extrabold text-base">Dhaka City Interactive Transit Map</h3>
        </div>
        <button
          onClick={() => setShowMapModal(false)}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-[480px] bg-[#E8ECEF] dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
        <svg className="w-full h-full opacity-80" viewBox="0 0 600 380">
          <rect x="0" y="0" width="600" height="380" fill={isDark ? "#121212" : "#F3F4F6"} />
          <path d="M 0,330 Q 150,320 280,350 T 600,320" fill="none" stroke="#22D3EE" strokeWidth="16" />
          <path d="M 50,0 Q 80,150 120,250 T 280,350" fill="none" stroke="#22D3EE" strokeWidth="12" />

          <path
            d="M 120,50 L 120,280 L 250,280 L 350,300"
            fill="none"
            stroke={isDark ? "#3F3F46" : "#E2E8F0"}
            strokeWidth="10"
          />
          <path
            d="M 200,50 L 200,200 L 250,280"
            fill="none"
            stroke={isDark ? "#3F3F46" : "#E2E8F0"}
            strokeWidth="8"
          />
          <path
            d="M 400,40 L 400,250 L 350,300"
            fill="none"
            stroke={isDark ? "#3F3F46" : "#E2E8F0"}
            strokeWidth="8"
          />
          <path
            d="M 300,0 L 300,180 L 200,200"
            fill="none"
            stroke={isDark ? "#3F3F46" : "#E2E8F0"}
            strokeWidth="10"
          />

          <path
            d="M 120,50 L 120,280 L 250,280 L 350,300"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="6,6"
          />
          <path d="M 300,0 L 300,180" fill="none" stroke="#EF4444" strokeWidth="2.5" />

          {mapNodes.map((node, i) => (
            <g key={i} className="cursor-pointer group">
              <circle cx={node.x} cy={node.y} r="8" fill={node.col} />
              <circle
                cx={node.x}
                cy={node.y}
                r="14"
                fill="none"
                stroke={node.col}
                strokeWidth="2"
                className="animate-ping"
                style={{ animationDuration: "3s" }}
              />
              <text
                x={node.x + 12}
                y={node.y + 4}
                fill={isDark ? "#FFFFFF" : "#1E293B"}
                fontSize="11"
                fontWeight="bold"
                className="drop-shadow"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur text-white p-4 rounded-xl space-y-2 text-xs">
          <h4 className="font-extrabold text-[13px] border-b border-white/10 pb-1.5 font-sans">
            Map Legend
          </h4>
          <div className="flex items-center gap-2 font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Good Transit Fluidity</span>
          </div>
          <div className="flex items-center gap-2 font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Moderate Congestion</span>
          </div>
          <div className="flex items-center gap-2 font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>High Traffic/Incident</span>
          </div>
        </div>
      </div>

      <div
        className={
          isDark
            ? "p-4 border-t border-zinc-800 bg-zinc-900/40 text-center"
            : "p-4 border-t border-gray-150 bg-gray-50/50 text-center"
        }
      >
        <span className="text-[12px] text-gray-400">
          Hold Left Click to drag and pan across sectors.
        </span>
      </div>
    </ModalShell>
  );
}