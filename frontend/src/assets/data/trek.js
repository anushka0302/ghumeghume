// ✅ Import Local Images for Tours
import dayaraImg from "../images/dayara_g1.webp";
import haruntaImg from "../images/harunta_1.webp";
import doditalImg from "../images/dodital_1.webp";
import kedarkanthaImg from "../images/kedar_g1.webp";

const trek = [
  // ✅ NEW TREK ADDED: KEDARKANTHA
  {
    id: 1,
    title: "KEDARKANTHA TREK",
    city: "Sankri, Uttarakhand",
    altitude: "12,500 ft",
    priceSolo: 11500,
    priceGroup: 6299,
    days: "5 Days / 4 Nights",
    desc: "The Queen of Winter Treks. Experience 360° summit views, the frozen Juda Ka Talab, and a thrilling summit climb in snow.",
    included: [
      "Accommodation",
      "Meals",
      "Trek Leader & Guide",
      "Forest Permits",
      "Trek Equipment",
    ],
    img: kedarkanthaImg, // Using placeholder image
    link: "/tour/kedarkantha-trek",
    featured: true,
  },
  {
    id: 2,
    title: "DAYARA BUGYAL",
    city: "Uttarkashi, Uttarakhand",
    altitude: "11,155 ft", // Bakaria Top
    priceSolo: 10500,
    priceGroup: 6499,
    days: "4 days / 3 nights",
    desc: "Dayara Bugyal is one of India’s most beautiful alpine meadows. In winter, these large grasslands turn into huge snow fields with 180° views.",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: dayaraImg,
    link: "/tour/dayara-bugyal",
    featured: true,
  },
  {
    id: 3,
    title: "HARUNTA BUGYAL AND NACHIKETA TAL",
    city: "Uttarkashi, Uttarakhand",
    altitude: "10,200 ft",
    priceSolo: 10500,
    priceGroup: 6499,
    days: "4 days / 3 nights",
    desc: "A hidden gem offering peace, snow-capped peaks, and the serene Nachiketa Tal lake.",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: haruntaImg,
    link: "/tour/harunta-bugyal-nachiketa-tal",
    featured: true,
  },
  {
    id: 4,
    title: "DODITAL AND DARWA TOP",
    city: "Uttarkashi, Uttarakhand",
    altitude: "13,615 ft",
    priceSolo: 12500,
    priceGroup: 8499,
    days: "5 days / 4 nights",
    desc: "Trek to the emerald Ganesha-lake (Dodital) and climb Darwa Top for spectacular Himalayan views.",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: doditalImg,
    link: "/tour/dodital-darwa-pass",
    featured: true,
  },
  
];

export default trek;