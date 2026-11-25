"use client";

import { useRef, useState } from "react";

interface FeatureChipsProps {
  features: string[];
}

export default function FeatureChips({ features }: FeatureChipsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="es-features-grid-wrapper">
      <div
        className={`es-features-grid-container ${isExpanded ? "expanded" : "collapsed"}`}
        style={isExpanded ? { maxHeight: gridRef.current?.scrollHeight } : undefined}
      >
        <div className="es-features-grid" ref={gridRef}>
          {features.map((feature, i) => (
            <div key={i} className="es-feature-chip">
              {feature}
            </div>
          ))}
        </div>
      </div>
      
      <div className="es-toggle-btn-wrapper">
        <button 
          className="es-toggle-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
          <span className={`material-symbols-rounded es-toggle-icon${isExpanded ? " is-open" : ""}`}>
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
}
