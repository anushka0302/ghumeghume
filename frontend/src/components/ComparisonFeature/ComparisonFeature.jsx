import React, { useState } from "react";
// Ensure you have lucide-react installed (npm install lucide-react)
import { X, Check } from "lucide-react"; 

const ComparisonFeature = ({ imageSrc }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Comparison Data
  const comparisonData = [
    { feature: "Water Sports", us: "Boating & Kayaking Included", others: "Not Included / Extra Cost" },
    { feature: "Accommodation", us: "Premium Homestay + Tents", others: "Basic Dorms" },
    { feature: "Meals", us: "B'fast, Lunch, Dinner & Snacks", others: "Basic Meals (No Snacks)" },
    { feature: "Campsite Location", us: "Private & Scenic Spots", others: "Crowded Common Areas" },
    { feature: "Batch Size", us: "Small (12-15 max)", others: "Large (30-40+)" },
    { feature: "Transport", us: "Tempo Traveler (Dehradun-Dehradun)", others: "Public Bus / Not Included" },
    { feature: "Guide Ratio", us: "1 Guide : 4 Trekkers", others: "1 Guide : 10 Trekkers" },
    { feature: "Forest Permits", us: "All Fees Included", others: "Pay at Checkpost" },
    { feature: "Safety", us: "Oximeter & O2 Cylinder", others: "Basic First Aid Only" },
  ];

  return (
    <>
      <style>
        {`
          @keyframes pulse-custom {
            0% { box-shadow: 0 0 0 0 rgba(250, 169, 53, 0.6); }
            70% { box-shadow: 0 0 0 12px rgba(250, 169, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(250, 169, 53, 0); }
          }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      <div 
        className="comparison-wrapper"
        style={{ position: "relative", display: "inline-block", marginTop: "15px", marginBottom: "25px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Preview Card */}
        <div style={{
          position: "absolute",
          bottom: "120%",
          left: "50%",
          transform: isHovered ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(10px) scale(0.9)",
          opacity: isHovered ? 1 : 0,
          width: "220px", // Made wider to fit the text
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          padding: "8px", // Increased padding
          zIndex: 20,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none"
        }}>
          {/* Image Container */}
          <div style={{ 
            height: "100px", // Slightly taller image
            width: "100%", 
            borderRadius: "8px", 
            overflow: "hidden", 
            marginBottom: "8px",
            backgroundColor: "#f0f0f0"
          }}>
            {imageSrc ? (
               <img src={imageSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
               <div style={{ width: "100%", height: "100%", background: "linear-gradient(45deg, #ddd, #eee)" }} />
            )}
          </div>
          
          {/* Summary List in Hover Card */}
          <div style={{ padding: "0 4px" }}>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "6px", borderBottom: "1px solid #eee", paddingBottom: "4px" }}>
              Includes:
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {/* Showing top 4 highlights */}
              {comparisonData.slice(0, 4).map((item, i) => (
                <li key={i} style={{ fontSize: "10px", color: "#555", marginBottom: "3px", display: "flex", alignItems: "center" }}>
                  <Check size={10} color="#16a34a" style={{ marginRight: "6px", flexShrink: 0 }} />
                  {item.us}
                </li>
              ))}
            </ul>
             <div style={{ fontSize: "9px", color: "#2563eb", fontWeight: "600", marginTop: "6px", textAlign: "right" }}>
              + 5 more features...
            </div>
          </div>

          {/* Arrow */}
          <div style={{
            position: "absolute", bottom: "-6px", left: "50%", marginLeft: "-6px",
            width: "12px", height: "12px", background: "white", transform: "rotate(45deg)"
          }}></div>
        </div>

        {/* Main Button */}
            <button 
              onClick={() => setModalOpen(true)}
              style={{
                position: "relative",
                zIndex: 10,
                background: "linear-gradient(to right, #ff4000ff, #faa935ff)", 
                color: "white",
                // ✅ Adjusted padding to fit two lines nicely
                padding: "8px 30px", 
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer",
                // ✅ FLEX COLUMN: Stacks text vertically
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse-custom 2s infinite",
                transition: "transform 0.2s",
                boxShadow: "0 4px 15px rgba(250, 169, 53, 0.4)",
                lineHeight: "1.2" // Keeps lines close together
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                {/* Top Line: Main Text */}
                <span style={{ 
                  fontWeight: "bold", 
                  fontSize: "14px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  🎁 What's Included?
                </span>

                {/* Bottom Line: Small Text */}
                <span style={{ 
                  fontSize: "10px", 
                  fontWeight: "400", 
                  opacity: 0.9, 
                  marginTop: "2px" 
                }}>
                  (Click here)
                </span>
            </button>
      </div>

      {/* Modal Popup (Unchanged logic, keeps existing style) */}
      {modalOpen && (
        <div 
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)",
            animation: "fade-in 0.2s ease-out"
          }}
          onClick={() => setModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: "white", width: "95%", maxWidth: "900px", // Slightly wider max-width for better table view
              borderRadius: "16px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              animation: "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              maxHeight: "90vh", display: "flex", flexDirection: "column"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(to right, #111827, #1f2937)", padding: "24px",
              display: "flex", justifyContent: "space-between", alignItems: "center", color: "white",
              flexShrink: 0
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "bold", color: "#10b981" }}>Unmatched Inclusions</h3>
                <p style={{ margin: "4px 0 0", fontSize: "14px", opacity: 0.9, color: "#e5e7eb" }}>Everything you need for a perfect trek.</p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>
                <X size={28} />
              </button>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", flex: 1 }}>
              {/* Table Header */}
              <div style={{ display: "flex", background: "#f9fafb", padding: "16px 24px", borderBottom: "2px solid #e5e7eb", fontSize: "14px", fontWeight: "800", color: "#4b5563", textTransform: "uppercase", position: "sticky", top: 0, zIndex: 10 }}>
                <div style={{ flex: 1 }}>Feature</div>
                <div style={{ flex: 1.5, color: "#16a34a" }}>Our Package</div>
                <div style={{ flex: 1.5, color: "#ef4444" }}>Others</div>
              </div>
              
              {/* Rows */}
              {comparisonData.map((row, idx) => (
                <div key={idx} style={{
                  display: "flex", alignItems: "center", padding: "18px 24px",
                  borderBottom: "1px solid #f3f4f6",
                  backgroundColor: idx % 2 === 0 ? "white" : "#f9fafb",
                  transition: "background-color 0.2s"
                }}>
                  <div style={{ flex: 1, fontWeight: "700", color: "#374151", fontSize: "15px" }}>{row.feature}</div>
                  <div style={{ flex: 1.5, display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: "600", fontSize: "14px" }}>
                    <Check size={18} className="flex-shrink-0" strokeWidth={3} /> {row.us}
                  </div>
                  <div style={{ flex: 1.5, display: "flex", alignItems: "center", gap: "10px", color: "#9ca3af", fontSize: "14px" }}>
                     {row.others}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: "24px", backgroundColor: "#f8fafc", textAlign: "center", borderTop: "1px solid #e2e8f0", flexShrink: 0 }}>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>"No hidden charges. Trekking certificate included on completion."</p>
              <button 
                onClick={() => { 
                  setModalOpen(false); 
                  const form = document.getElementById('booking-form');
                  if(form) form.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: "#16a34a", color: "white", padding: "14px 32px",
                  borderRadius: "8px", fontWeight: "700", border: "none", cursor: "pointer",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", fontSize: "16px",
                  transition: "transform 0.1s"
                }}
                onMouseDown={e => e.target.style.transform = "scale(0.98)"}
                onMouseUp={e => e.target.style.transform = "scale(1)"}
              >
                Book Now to Claim Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonFeature;