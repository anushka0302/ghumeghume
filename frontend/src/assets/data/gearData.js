// We are using only Bootstrap icons to ensure compatibility
import { 
  BsBackpack, 
  BsSun, 
  BsCamera, 
  BsFileEarmarkText, 
  BsLayers, 
  BsHeartPulse,
  BsLightningCharge
} from 'react-icons/bs';

export const gearCategories = [
  {
    title: "Essentials",
    icon: <BsBackpack />, // Fixed: Capital 'B'
    items: [
      "Backpack (50-60L) with rain cover",
      "Daypack (20-30L) for day hikes",
      "Water Bottle (Reusable, 2 Liters)",
      "Headlamp or Torch with extra batteries",
      "Walking Stick / Trekking Pole"
    ]
  },
  {
    title: "Footwear",
    icon: <BsLightningCharge />, // Changed to a standard BS icon
    items: [
      "Trekking Shoes (Waterproof, high ankle)",
      "Cotton Socks (3-4 pairs)",
      "Woolen Socks (2 pairs for night)",
      "Sandals/Slippers (for campsite)"
    ]
  },
  {
    title: "Clothing (Layers)",
    icon: <BsLayers />, // Changed to 'Layers' icon
    items: [
      "Down Jacket or Heavy Woolen Jacket",
      "Waterproof/Windproof Jacket",
      "Thermals (Top & Bottom)",
      "Quick-dry T-shirts (3-4)",
      "Trek Pants (Avoid Denim/Jeans)",
      "Woolen Cap & Sun Cap",
      "Gloves (Waterproof & Woolen)"
    ]
  },
  {
    title: "Toiletries & Hygiene",
    icon: <BsSun />,
    items: [
      "Sunscreen (SPF 50+)",
      "Sunglasses (UV protection)",
      "Lip Balm & Moisturizer",
      "Quick-dry Towel",
      "Personal Toilet Kit (Soap, Toothpaste, etc.)",
      "Hand Sanitizer"
    ]
  },
  {
    title: "First Aid & Meds",
    icon: <BsHeartPulse />, // Changed to Heart/Health icon
    items: [
      "Personal Medications (if any)",
      "Diamox (for altitude sickness - consult doctor)",
      "Painkillers & muscle sprays",
      "Band-aids & Blister tape",
      "ORS packets / Glucose"
    ]
  },
  {
    title: "Documents & Electronics",
    icon: <BsFileEarmarkText />,
    items: [
      "Valid Govt ID (Aadhar/Passport) - Original + Copies",
      "Medical Certificate (if required)",
      "Power Bank (High capacity)",
      "Camera & Memory Cards",
      "Cash (ATMs are scarce in remote areas)"
    ]
  }
];