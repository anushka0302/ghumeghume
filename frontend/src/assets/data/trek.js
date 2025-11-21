// ✅ Import Local Images for Tours
import dayaraImg from "../images/dayara_g1.jpg";
import haruntaImg from "../images/harunta_1.jpg";
import doditalImg from "../images/dodital_1.jpg";

const trek = [
  {
    id: 1,
    title: "DAYARA BUGYAL",
    city: "Uttarkashi, Uttarakhand",
    priceSolo: 15500,
    priceGroup: 10500,
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
    id: 2,
    title: "HARUNTA BUGYAL AND NACHIKETA TAL",
    city: "Uttarkashi, Uttarakhand",
    priceSolo: 15500,
    priceGroup: 10500,
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
    id: 3,
    title: "DODITAL AND DARWA TOP",
    city: "Uttarkashi, Uttarakhand",
    priceSolo: 17500,
    priceGroup: 12500,
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