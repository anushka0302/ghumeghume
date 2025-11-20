// File: src/assets/data/teamData.js

// Import placeholder images - update these with your real photos
import ava01 from '../images/ava-1.jpg';
import ava02 from '../images/ava-2.jpg';
import ava03 from '../images/ava-3.jpg';

// Import icons
import { BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';

export const teamData = [
  {
    id: 1,
    imgUrl: ava01, // Use your own image path
    name: "Umang Mathpal", // I saw your username in the file path :)
    role: "Founder & CEO",
    bio: "A lifelong explorer who turned a passion for the Himalayas into a way to share it with the world.",
    socials: [
      { icon: <BsLinkedin />, link: "https://www.linkedin.com/" },
      { icon: <BsTwitter />, link: "https://www.twitter.com/" },
    ]
  },
  {
    id: 2,
    imgUrl: ava02,
    name: "Anushaka Uniyal",
    role: "Co-Founder & CTO",
    bio: "With over a decade of experience, Anushaka has safely guided hundreds of adventurers to new heights.",
    socials: [
      { icon: <BsInstagram />, link: "https://www.instagram.com/" },
      { icon: <BsLinkedin />, link: "https://www.linkedin.com/" },
    ]
  },
  {
    id: 3,
    imgUrl: ava03,
    name: "Shashank Gusain",
    role: "Operations Manager",
    bio: "The logistics expert who ensures every detail of your trip is perfectly planned, from permits to porters.",
    socials: [
      { icon: <BsLinkedin />, link: "https://www.linkedin.com/" },
    ]
  },
];