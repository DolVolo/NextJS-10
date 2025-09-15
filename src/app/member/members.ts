export type Member = {
  id: number;
  name: string;
  role?: string;
  age: number; // years (approx, 2025 reference)
  height: number; // centimeters
  image: string; // avatar keyword
  bio: string;
  skills: string[];
};

export const members: Member[] = [
  { id: 1, name: "Suho", role: "Leader / Lead Vocal", age: 34, height: 172, image: "suho", bio: "Leader known for stability and vocals.", skills: ["Leadership", "Vocal", "MC"] },
  { id: 2, name: "Xiumin", role: "Lead Vocal / Rap", age: 35, height: 173, image: "xiumin", bio: "Energetic performer and versatile vocalist.", skills: ["Falsetto", "Dance", "Rap"] },
  { id: 3, name: "Lay", role: "Main Dancer / Vocal", age: 33, height: 177, image: "lay", bio: "Strong dancer with musical composition talent.", skills: ["Dance", "Composition", "Production"] },
  { id: 4, name: "Baekhyun", role: "Main Vocal", age: 33, height: 174, image: "baekhyun", bio: "Powerful main vocal with stage presence.", skills: ["High Notes", "Stage Presence"] },
  { id: 5, name: "Chen", role: "Main Vocal", age: 32, height: 173, image: "chen", bio: "Known for emotional vocal tone.", skills: ["Ballad", "Technique"] },
  { id: 6, name: "Chanyeol", role: "Main Rap / Vocal", age: 32, height: 186, image: "chanyeol", bio: "Rapper and multi-instrument enthusiast.", skills: ["Rap", "Guitar", "Production"] },
  { id: 7, name: "D.O.", role: "Main Vocal", age: 32, height: 172, image: "do", bio: "Rich vocal tone and acting talent.", skills: ["Vocal", "Acting", "Cooking"] },
  { id: 8, name: "Kai", role: "Main Dancer / Vocal", age: 31, height: 182, image: "kai", bio: "Main dancer with sharp performance style.", skills: ["Dance", "Charisma"] },
  { id: 9, name: "Sehun", role: "Lead Dancer / Rap", age: 31, height: 183, image: "sehun", bio: "Maknae with growing performance versatility.", skills: ["Rap", "Modeling", "Dance"] },
  { id: 10, name: "Kris", role: "Leader (M) / Rap", age: 34, height: 187, image: "kris", bio: "Former M leader noted for charisma.", skills: ["Rap", "Leadership"] },
  { id: 11, name: "Luhan", role: "Lead Vocal / Lead Dancer", age: 35, height: 178, image: "luhan", bio: "Gentle visuals and smooth dance lines.", skills: ["Dance", "Vocal"] },
  { id: 12, name: "Tao", role: "Lead Rap / Martial Arts", age: 32, height: 185, image: "tao", bio: "Martial arts flair and intense performance.", skills: ["Wushu", "Rap", "Performance"] },
];
