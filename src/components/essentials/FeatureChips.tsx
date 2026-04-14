"use client";

import { useState } from "react";

interface FeatureChipsProps {
  features: string[];
}

export default function FeatureChips({ features }: FeatureChipsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="es-features-grid-wrapper">
      <div className={`es-features-grid-container ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="es-features-grid">
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
          <div className="es-toggle-btn-content">
            <span className="es-toggle-btn-title">
              {isExpanded ? "Collapse Features" : "Show All Features"}
            </span>
            {!isExpanded && (
              <span className="es-toggle-btn-desc">
                Explore 25+ power user tools & utilities
              </span>
            )}
          </div>
          <span className="material-symbols-rounded es-toggle-icon">
            {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
      </div>
    </div>
  );
}
