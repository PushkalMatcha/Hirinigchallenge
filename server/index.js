const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const port = 4000;

app.use(cors());

function generateAIName() {
  const prefixes = ["Quantum", "Cyber", "Data", "Logic", "Binary", "Code", "Tech", "Algo", "Flux"];
  const suffixes = ["mind", "core", "tron", "byte", "bot", "wave", "net", "sync", "flex", "node"];
  return faker.helpers.arrayElement(prefixes) + faker.helpers.arrayElement(suffixes);
}

function generateAnimeName() {
  const firstNames = ["Yuki", "Kai", "Akira", "Nova"];
  const lastNames = ["Shinigami", "Uzumaki", "Uchiha", "Akatsuki"];
  return faker.helpers.arrayElement(firstNames) + " " + faker.helpers.arrayElement(lastNames);
}

function generateSportsName() {
  const firstNames = ["LeBron", "Cristiano", "Lionel", "Serena", "Roger", "Tiger", "Usain"];
  const lastNames = ["James", "Ronaldo", "Messi", "Williams", "Federer", "Woods", "Bolt"];
  return faker.helpers.arrayElement(firstNames) + " " + faker.helpers.arrayElement(lastNames);
}

function generateCharacters(count = 29) { // 9 AI + 8 Sports + 12 Anime characters
  const races = ["AI Assistant", "Neural Network", "Expert System", "Quantum AI", "Hybrid AI", "Autonomous Agent", "Deep Learning Model", "Language Model"];
  const roles = ["Data Analyst", "Code Generator", "Pattern Recognizer", "Knowledge Assistant", "Language Processor", "Vision Analyzer", "Decision Maker", "Problem Solver"];
  const capabilities = ["Natural Language Processing", "Computer Vision", "Machine Learning", "Data Analysis", "Code Generation", "Speech Recognition", "Image Generation", "Text-to-Speech"];
  const specializations = ["Scientific Research", "Creative Writing", "Mathematics", "Programming", "Art Generation", "Music Composition", "Problem Solving", "Education"];
    // Generate 9 AI characters
  const aiCharacters = Array.from({ length: 9 }, (_, id) => ({    
    id: id + 1,
    type: "AI",
    name: generateAIName(),
    avatar: `https://source.boringavatars.com/beam/120/${encodeURIComponent(generateAIName())}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
    race: faker.helpers.arrayElement(races),
    role: faker.helpers.arrayElement(roles),
    capability: faker.helpers.arrayElement(capabilities),
    specialization: faker.helpers.arrayElement(specializations),
    version: faker.system.semver(),
    uptime: faker.number.int({ min: 95, max: 100 }) + "%",
  }));

  // Generate 8 sports characters
  const sports = ["Football", "Basketball", "Tennis", "Soccer", "Baseball", "Boxing", "MMA", "Cricket"];
  const sportsRoles = ["Forward", "Guard", "Striker", "Pitcher", "Quarterback", "Champion", "All-Star", "MVP"];    const sportsCharacters = Array.from({ length: 8 }, (_, id) => ({    
    id: id + 10,
    type: "Sports",
    name: generateSportsName(),
    avatar: `https://source.boringavatars.com/pixel/120/${encodeURIComponent(generateSportsName())}?colors=003f5c,58508d,bc5090,ff6361,ffa600`,
    sport: faker.helpers.arrayElement(sports),
    role: faker.helpers.arrayElement(sportsRoles),
    achievements: faker.number.int({ min: 1, max: 5 }) + " Championships",
    experience: faker.number.int({ min: 5, max: 20 }) + " years",
    rating: faker.number.int({ min: 85, max: 99 }) + "/100"
  }));

  // Generate 12 anime characters
  const classes = ["Ninja", "Saiyan", "Soul Reaper", "Alchemist", "Hero", "Mage", "Warrior", "Demon Slayer"];
  const powers = ["Chakra", "Ki", "Reiatsu", "Alchemy", "Quirk", "Magic", "Spirit Energy", "Breathing Technique"];
  const ranks = ["S-Class", "A-Class", "SSS-Rank", "Supreme", "Legendary", "Ultimate", "Grand Master", "Elite"];
    const animeCharacters = Array.from({ length: 12 }, (_, id) => ({    
    id: id + 18,
    type: "Anime",
    name: generateAnimeName(),
    avatar: `https://source.boringavatars.com/marble/120/${encodeURIComponent(generateAnimeName())}?colors=ff0a54,ff477e,ff7096,ff85a1,ff99ac`,
    class: faker.helpers.arrayElement(classes),
    power: faker.helpers.arrayElement(powers),
    rank: faker.helpers.arrayElement(ranks),
    specialMove: faker.helpers.arrayElement([
      "Ultimate Dragon Fist",
      "Shadow Clone Jutsu",
      "Spirit Gun",
      "Final Flash",
      "Bankai",
      "Detroit Smash",
      "Thunder Cross Split Attack",
      "Flame Breathing"
    ]),
    powerLevel: faker.number.int({ min: 9000, max: 100000 }).toLocaleString(),
    transformations: faker.number.int({ min: 1, max: 5 })
  }));

  // Generate 4 music characters
  const musicCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 26,
    type: "Music",
    name: faker.person.fullName(),
    avatar: `https://source.boringavatars.com/sunset/120/${encodeURIComponent(faker.person.fullName())}?colors=004b23,006400,007200,008000,38b000`,
    genre: faker.helpers.arrayElement(["Classical", "Jazz", "Rock", "Pop"]),
    role: faker.helpers.arrayElement(["Composer", "Singer", "Instrumentalist", "Conductor"]),
    achievements: faker.number.int({ min: 1, max: 10 }) + " Albums",
    experience: faker.number.int({ min: 5, max: 20 }) + " years",
  }));

  // Generate 4 cooking characters
  const cookingCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 34,
    type: "Cooking",
    name: faker.person.fullName(),
    avatar: `https://source.boringavatars.com/ring/120/${encodeURIComponent(faker.person.fullName())}?colors=590d22,800f2f,a4133c,c9184a,ff4d6d`,
    style: faker.helpers.arrayElement(["Italian", "French", "Chinese", "Indian"]),
    role: faker.helpers.arrayElement(["Chef", "Sous Chef", "Pastry Chef", "Line Cook"]),
    achievements: faker.number.int({ min: 1, max: 5 }) + " Awards",
    experience: faker.number.int({ min: 5, max: 20 }) + " years",
  }));

  // Generate 4 car characters
  const carCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 38,
    type: "Cars",
    name: faker.vehicle.vehicle(),
    avatar: `https://source.boringavatars.com/bauhaus/120/${encodeURIComponent(faker.vehicle.vehicle())}?colors=001219,005f73,0a9396,94d2bd,e9d8a6`,
    brand: faker.helpers.arrayElement(["Tesla", "BMW", "Mercedes", "Toyota"]),
    type: faker.helpers.arrayElement(["Sedan", "SUV", "Truck", "Coupe"]),
    speed: faker.number.int({ min: 100, max: 300 }) + " km/h",
    price: "$" + faker.number.int({ min: 20000, max: 100000 }).toLocaleString(),
    description: "A high-performance car with magical attributes and ultimate rank.",
    generalInfo: "This car is equipped with advanced features and a unique special move for unparalleled performance."
  }));

  // Generate 4 bike characters
  const bikeCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 42,
    type: "Bikes",
    name: faker.vehicle.vehicle(),
    avatar: `https://source.boringavatars.com/bauhaus/120/${encodeURIComponent(faker.vehicle.vehicle())}?colors=582f0e,7f4f24,936639,a68a64,b6ad90`,
    brand: faker.helpers.arrayElement(["Yamaha", "Ducati", "Kawasaki", "Suzuki"]),
    type: faker.helpers.arrayElement(["Sport", "Touring", "Standard", "Adventure"]),
    speed: faker.number.int({ min: 80, max: 250 }) + " km/h",
    price: "$" + faker.number.int({ min: 10000, max: 50000 }).toLocaleString(),
  }));

  // Generate 4 mythology characters
  const mythologyCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 46,
    type: "Mythology",
    name: faker.helpers.arrayElement(["Zeus", "Thor", "Odin", "Ra", "Athena", "Apollo", "Isis", "Anubis"]),
    avatar: `https://source.boringavatars.com/crystal/120/${encodeURIComponent(faker.helpers.arrayElement(["Zeus", "Thor", "Odin", "Ra"]))}}?colors=ff7b00,ff8800,ff9500,ffa200,ffaa00`,
    domain: faker.helpers.arrayElement(["Sky", "Thunder", "Wisdom", "Sun", "War", "Death", "Nature", "Love"]),
    powers: faker.helpers.arrayElement(["Lightning", "Storm Control", "Divine Wisdom", "Solar Energy", "Battle Strategy", "Life and Death", "Nature Control", "Emotional Influence"]),
    realm: faker.helpers.arrayElement(["Olympus", "Asgard", "Heliopolis", "Elysium"]),
    weapon: faker.helpers.arrayElement(["Thunderbolt", "Mjolnir", "Gungnir", "Solar Staff", "Aegis", "Bow of Light"]),
  }));

  // Generate 4 historical characters
  const historicalCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 50,
    type: "Historical",
    name: faker.helpers.arrayElement(["Leonardo da Vinci", "Cleopatra", "Alexander", "Joan of Arc", "Napoleon", "Gandhi"]),
    avatar: `https://source.boringavatars.com/marble/120/${encodeURIComponent(faker.helpers.arrayElement(["davinci", "cleopatra", "alexander", "joan"]))}}?colors=8338ec,3a86ff,ff006e,fb5607,ffbe0b`,
    era: faker.helpers.arrayElement(["Renaissance", "Ancient Egypt", "Classical", "Medieval", "Modern"]),
    achievements: faker.helpers.arrayElement(["Art & Science", "Egyptian Dynasty", "Empire Building", "Military Leadership", "Civil Rights"]),
    impact: faker.number.int({ min: 8, max: 10 }) + "/10",
    legacy: faker.helpers.arrayElement(["Cultural Revolution", "Political Reform", "Scientific Progress", "Social Change"]),
  }));

  // Generate 4 scientist characters
  const scientistCharacters = Array.from({ length: 4 }, (_, id) => ({
    id: id + 54,
    type: "Scientist",
    name: faker.helpers.arrayElement(["Einstein", "Newton", "Tesla", "Curie", "Darwin", "Hawking"]),
    avatar: `https://source.boringavatars.com/pixel/120/${encodeURIComponent(faker.helpers.arrayElement(["einstein", "newton", "tesla", "curie"]))}}?colors=390099,9e0059,ff0054,ff5400,ffbd00`,
    field: faker.helpers.arrayElement(["Physics", "Mathematics", "Chemistry", "Biology", "Astronomy"]),
    discovery: faker.helpers.arrayElement(["Relativity", "Gravity", "Radioactivity", "Evolution", "Black Holes"]),
    awards: faker.number.int({ min: 1, max: 5 }) + " Nobel Prizes",
    influence: faker.number.int({ min: 90, max: 100 }) + " Citations",
  }));

  // Combine all characters
  const allCharacters = [...aiCharacters, ...sportsCharacters, ...animeCharacters, ...musicCharacters, ...cookingCharacters, ...carCharacters, ...bikeCharacters, ...mythologyCharacters, ...historicalCharacters, ...scientistCharacters];

  // Shuffle characters randomly
  for (let i = allCharacters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCharacters[i], allCharacters[j]] = [allCharacters[j], allCharacters[i]];
  }

  // Return shuffled characters
  return allCharacters;
}

app.get("/api/characters", (req, res) => {
  const count = parseInt(req.query.count) || 29;
  const category = req.query.category;
  const characters = generateCharacters(count);

  // Filter characters by category if specified
  const filteredCharacters = category
    ? characters.filter((character) => character.type.toLowerCase() === category.toLowerCase())
    : characters;

  res.json(filteredCharacters);
});

// Get character by ID
app.get("/api/characters/:id", (req, res) => {
  const { id } = req.params;
  const characters = generateCharacters();
  const character = characters.find((c) => c.id.toString() === id);

  if (!character) {
    return res.status(404).json({ error: "Character not found" });
  }

  res.json(character);
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});