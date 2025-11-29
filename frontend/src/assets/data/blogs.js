// ✅ Import Images (Same as your trek.js to ensure consistency)
import dayaraImg from "../images/dayara_g1.jpg";
import haruntaImg from "../images/harunta_1.jpg";
import doditalImg from "../images/dodital_1.jpg";
import wftImg from "../images/WFT.jpg";
import womenTrekImg from "../images/womenkity.png";
import fatherSonImg from "../images/fatherson.png";
import detoxImg from "../images/detoxblog.png";
import soloTrekImg from "../images/solotrek.png";

const blogs = [
  {
    id: 1,
    title: "The Office with a View: Redefining 9 to 5 with Work From Trek",
    author: "Ghume Ghume Team",
    date: "20 Nov, 2025",
    desc: "Why stare at a cubicle wall when you can look at a snow peak? Break the corporate chain and breathe life back into your work.",
    imgUrl: wftImg,
    trekLink: "/home",
    content: `
      <p>We spend the prime years of our lives sitting in chairs that hurt our backs, staring at screens that hurt our eyes, breathing air that hurts our lungs. Is this really living? It's time to redefine productivity.</p>
      
      <h5>Repair Your Lungs, Refresh Your Mind</h5>
      <p><strong>Detox yourself from the polluted air.</strong> Imagine taking a deep breath and filling your lungs with crisp, pine-scented air instead of city smog. Our <strong>Ghume Ghume group trek</strong> for remote workers is designed to heal you physically while you work.</p>

      <h5>Step Back to Your Roots</h5>
      <p>We believe that creativity doesn't thrive in chaos; it thrives in calm. By changing your AQI for a few days, you aren't running away from work; you are running towards a better version of yourself. As one of the <strong>Ghume Ghume best trekking companies in india</strong>, we ensure you have the connectivity you need, with the peace you crave.</p>

      <h5>Why WFT?</h5>
      <ul>
        <li><strong>Productivity:</strong> Nature is the ultimate focus booster.</li>
        <li><strong>Health:</strong> Eat organic, breathe pure, and live slow.</li>
        <li><strong>Balance:</strong> Prove that you don't need to sacrifice your health to build your career.</li>
      </ul>
      
      <p>Don't just take a vacation; take a lifestyle break. Come, breathe, and work from where you belong—in nature.</p>
    `
  },
  {
    id: 2,
    title: "From Kitty Parties to Mountain Peaks: A Women's Guide to Real Detox",
    author: "Ghume Ghume Team",
    date: "25 Nov, 2025",
    desc: "Swap the tea parties for mountain trails. Discover how women are finding strength, health, and lifelong memories in the Himalayas.",
    imgUrl: womenTrekImg,
    trekLink: "/home", // General tours link
    content: `
      <p>We all know the routine. Once a month, we gather under a roof for a kitty party. There is good food, laughter, and the comfort of friends. But how many times have we sat in the same living rooms, breathing the same recycled air, talking about the same things?</p>
      
      <p>Women are undoubtedly the strongest pillars of any family. You hold everything together. But sometimes, even the strongest pillars need to lean back and breathe. It is time to upgrade your health and detox your soul.</p>

      <h5>Trade the Roof for the Sky</h5>
      <p>Imagine swapping that ceiling fan for the open blue sky. A <strong>Ghume Ghume hike in the mountains</strong> isn't just about walking; it's about reclaiming your space. It's about trading the pollution of the city for air so pure it heals you from the inside out.</p>

      <h5>The Ultimate Detox</h5>
      <p>We often talk about detox diets, but what about a detox for your mind? A <strong>Ghume Ghume group trek</strong> offers you a chance to step away from the daily grind. No cooking, no cleaning, no deadlines. Just you, your girlfriends, and the majestic <strong>Ghume Ghume hike trails</strong>.</p>

      <h5>Creating Bonds That Last</h5>
      <p>When you struggle up a slope together and share a cup of hot chai at the summit, you create a bond that no kitty party can match. We are proud to be one of the <strong>Ghume Ghume best trekking companies in india</strong> because we understand safety and comfort are your priority.</p>

      <p>So, gather your girl gang. Whether you choose a simple <strong>Ghume Ghume hike trail</strong> or a full <strong>Ghume Ghume trek group</strong> adventure, you are promising yourself better health, a genuine smile, and memories that will last a lifetime.</p>
      
      <p>Come, let the mountains remind you of your strength.</p>
    `
  },
  {
    id: 3,
    title: "No Wi-Fi, Just High-Fives: Reconnecting with Your Child in the Wild",
    author: "Ghume Ghume Team",
    date: "10 Nov, 2025",
    desc: "Screens have built walls between parents and children. Break them down with a family adventure where the only status update is a smile.",
    imgUrl: fatherSonImg,
    trekLink: "/home", // Dayara is great for kids
    content: `
      <p>In the hustle of city life, conversations often happen over WhatsApp even when we are sitting in the same living room. We are physically present, but mentally miles apart. On a trek, that noise disappears. There are no distractions—just the trail, the sky, and each other.</p>
      
      <h5>The Mountain as a Teacher</h5>
      <p>This isn't just a walk; it's a lesson in resilience. When your child struggles up a steep slope and you offer a hand, you aren't just helping them climb; you are teaching them that it's okay to ask for help. In that moment, you stop being just a provider and become a hero again.</p>

      <h5>Why Choose Our Family Packages?</h5>
      <p>We specialize in <strong>Family trekking packages</strong> designed with children in mind. We know that <strong>trekking with kids in India</strong> requires a different pace and extra care. Our guides are trained to keep little ones engaged with nature, turning a simple walk into a treasure hunt.</p>

      <h5>Safe, Supportive, and Memorable</h5>
      <p>Joining a <strong>Ghume Ghume trek group</strong> means you have a village looking out for you. We are proud to be one of the <strong>best trekking companies in India for families</strong> because we prioritize safety above all else. We handle the logistics so you can focus on the bonding.</p>

      <p>Give your child a gift they can't download. Come build memories that don't need a charger.</p>
    `
  },
  {
    id: 4,
    title: "The Joy of Missing Out (JOMO): Why Your Soul Needs a Signal Break",
    author: "Ghume Ghume Team",
    date: "02 Nov, 2025",
    desc: "Your phone battery is full, but your internal battery is empty. Leave the charger behind and recharge your spirit on a Ghume Ghume hike trail.",
    imgUrl: detoxImg,
    trekLink: "/home", // Harunta is also great for quiet
    content: `
      <p>We live in an age of constant urgency. We panic when our phone battery hits 10%, scrambling for a charger. But what about our internal battery? It has been blinking red for months, yet we keep pushing through, living for likes, shares, and email notifications.</p>
      
      <h5>Trading Pings for Chirps</h5>
      <p>A <strong>Digital detox trek</strong> isn't about running away from technology; it's about running towards yourself. It invites you to trade the stressful "ping" of a notification for the chirping of birds and the rustle of leaves. This isn't just a walk; it is <strong>mental peace trekking</strong> at its finest.</p>

      <h5>The Best Connection is Offline</h5>
      <p>We are more connected than ever, yet more lonely. On our <strong>Ghume Ghume hike adventures</strong>, we emphasize that the best connection isn't Wi-Fi; it's connecting with the earth under your boots. When you lose the signal bars, you gain perspective.</p>

      <h5>A Real Break from Technology</h5>
      <p>Imagine a day where your thumb doesn't scroll, and your eyes don't strain against blue light. A <strong>break from technology</strong> allows your senses to wake up. You notice the shade of the sky, the texture of the rock, and the taste of the air.</p>

      <p>Don't let life become a series of status updates. Log out of the matrix and log in to the real world. Come, find the joy of missing out.</p>
    `
  },
  {
    id: 5,
    title: "Lost in the Woods to Find Yourself: A Solo Journey",
    author: "Ghume Ghume Team",
    date: "15 Jan, 2026",
    desc: "When life feels like a checklist you didn't write, it's time to walk away. Discover how a solo trek can be the silent therapist you need.",
    imgUrl: soloTrekImg,
    trekLink: "/home", // Harunta is good for reflection
    content: `
      <p>There comes a moment in your late 20s or early 30s when you look around at your life—the job, the routine, the expectations—and ask, "Is this it?" You feel lost, not because you don't know where you are, but because you don't know who you are anymore.</p>
      
      <h5>Walking Away to Come Back</h5>
      <p>Sometimes, the only way to find yourself is to get a little lost. A <strong>Solo trekking India</strong> experience isn't about being lonely; it's about enjoying your own company without the noise of others' opinions. It is a <strong>soul searching hike</strong> where the only person you have to listen to is yourself.</p>

      <h5>The Mountain as a Therapist</h5>
      <p>Mountains don't judge. They don't care about your job title or your bank balance. They simply exist, massive and silent. When you face a giant peak, your problems suddenly feel small. This <strong>find yourself trek</strong> acts as a mirror, reflecting your true strength back at you.</p>

      <h5>Safe Solo Travel with a Group</h5>
      <p>Taking a solo leap of faith can be scary. That's where we come in. As one of the <strong>Ghume Ghume best trekking</strong> providers, we offer the safety of a group with the freedom of a solo journey. You walk with us, but the journey is yours.</p>

      <p>Don't wait for permission to live your life. Pack your bag, lace up your boots, and come find the version of you that got lost along the way.</p>
    `
  },
  {
  id: 6,
    title: "Dayara Bugyal: A Fairy Tale in White for Your First Adventure",
    author: "Ghume Ghume Team",
    date: "12 Nov, 2025",
    desc: "Remember the first time you touched snow? Relive that magic at Dayara Bugyal, the perfect canvas for your family's first Himalayan story.",
    imgUrl: dayaraImg,
    trekLink: "/tour/dayara-bugyal",
    content: `
      <p>Do you remember the first time you saw snow? That pure, unadulterated joy that made you forget how cold your fingers were? <strong>Dayara Bugyal</strong> isn't just a destination; it is a time machine that takes you back to that innocence.</p>
      
      <h5>Your First Step into the Mountains</h5>
      <p>Taking that first step towards the Himalayas can be daunting. You worry about fitness, cold, and safety. That is why we curated this specific <strong>Ghume Ghume hike trail</strong>. It is gentle, welcoming, and forgiving. It is the perfect place to start your <strong>Ghume Ghume hike adventures</strong> without fear.</p>

      <h5>A Winter Wonderland</h5>
      <p>When you stand on the vast, snow-covered meadows with the Bandarpoonch peak watching over you, you realize why we are considered one of the <strong>Ghume Ghume best trekking companies in india</strong>. We don't just guide you; we introduce you to a new world. The expanse of white snow against the blue sky is a memory you will cherish forever.</p>

      <h5>Why This Story Matters</h5>
      <ul>
        <li><strong>Connection:</strong> Perfect for families to bond away from screens.</li>
        <li><strong>Safety:</strong> We ensure your first <strong>Ghume Ghume hike in the mountains</strong> is safe and comfortable.</li>
        <li><strong>Magic:</strong> Witness the golden sunrise that turns the snow into gold.</li>
      </ul>
    `
  },
  {
    id: 7,
    title: "Silence Speaks: Finding Peace at Harunta Bugyal & Nachiketa Tal",
    author: "Ghume Ghume Team",
    date: "05 Jan, 2026",
    desc: "In a noisy world, find your quiet corner. Leave the crowds behind and listen to the forests on this unexplored trail.",
    imgUrl: haruntaImg,
    trekLink: "/tour/harunta-bugyal-nachiketa-tal",
    content: `
      <p>In a world that never stops talking, finding silence is a luxury. We are constantly bombarded with notifications, traffic, and noise. But there is a place where the only sound is the wind through the oak trees and your own breath. That place is <strong>Harunta Bugyal</strong>.</p>
      
      <h5>The Road Less Travelled</h5>
      <p>While everyone rushes to popular spots, true peace lies on the hidden <strong>Ghume Ghume hike trails</strong>. Walking to Nachiketa Tal, a lake steeped in the legend of a young boy seeking truth, feels like a pilgrimage for the soul. This isn't just another <strong>Ghume Ghume hike india</strong> itinerary; it is a retreat.</p>

      <h5>Nature's Own Therapy</h5>
      <p>The dense forests here embrace you. They filter out the chaos of the world. Joining a <strong>Ghume Ghume trek group</strong> to Harunta means choosing solitude over selfies. It means sitting by the lake and realizing that you don't need to do anything to be happy; you just need to be.</p>

      <h5>Why Choose Solitude?</h5>
      <ul>
        <li><strong>Mental Health:</strong> The silence of the forest is the best medicine for a cluttered mind.</li>
        <li><strong>Authenticity:</strong> Experience the raw, untouched beauty of <strong>Ghume Ghume best trekking india</strong>.</li>
        <li><strong>Soulful:</strong> Reconnect with yourself in the lap of nature.</li>
      </ul>
    `
  },
  {
    id: 8,
    title: "Walking with Legends: The Mythical Journey to Dodital",
    author: "Ghume Ghume Team",
    date: "18 Nov, 2025",
    desc: "They say the Gods live in the Himalayas. Walk the path to Lord Ganesha’s birthplace and feel the divine energy of nature.",
    imgUrl: doditalImg,
    trekLink: "/tour/dodital-darwa-pass",
    content: `
      <p>There is a different kind of energy when you walk on land that is steeped in stories. <strong>Dodital</strong> is believed to be the birthplace of Lord Ganesha. Whether you walk as a devotee or an admirer of nature, the aura of this place changes you.</p>
      
      <h5>A Spiritual Ascent</h5>
      <p>As you climb towards Darwa Top, it feels like a metaphor for life—the struggle of the ascent followed by the breathtaking reward at the summit. Our <strong>Ghume Ghume group trekking</strong> experience is designed to support you through every step of this journey.</p>

      <h5>The View from the Top</h5>
      <p>From the pass, when you look at the majestic Bandarpoonch and Swargarohini peaks, you feel small in the most beautiful way. It puts all our daily worries into perspective. This is the essence of <strong>Ghume Ghume best trekking</strong> experiences—finding humility in the face of nature's grandeur.</p>

      <h5>Highlights of the Journey</h5>
      <ul>
        <li><strong>Divine Waters:</strong> The crystal clear waters of the lake home to the Golden Trout.</li>
        <li><strong>Community:</strong> Walk with a <strong>Ghume Ghume trek group</strong> that supports and motivates each other.</li>
        <li><strong>Achievement:</strong> The climb to Darwa Top is a badge of honor you will wear for life.</li>
      </ul>
    `
  },
];

export default blogs;