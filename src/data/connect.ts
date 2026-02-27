export interface Alumni {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  linkedIn?: string;
  email?: string;
  phone?: string;
  graduationYear: number;
  field: string;
  company?: string;
}

export const alumni: Alumni[] = [
  { id: "1", firstName: "Erik", lastName: "Lindström", country: "Finland", city: "Helsinki", linkedIn: "https://linkedin.com/in/eriklindstrom", email: "erik@example.com", graduationYear: 2018, field: "Finance", company: "Nordea" },
  { id: "2", firstName: "Sofia", lastName: "Karlsson", country: "Sweden", city: "Stockholm", linkedIn: "https://linkedin.com/in/sofiakarlsson", email: "sofia@example.com", graduationYear: 2019, field: "Marketing", company: "Spotify" },
  { id: "3", firstName: "Anna", lastName: "Virtanen", country: "United Kingdom", city: "London", linkedIn: "https://linkedin.com/in/annavirtanen", phone: "+44 7700 900000", graduationYear: 2016, field: "Investment Banking", company: "JP Morgan" },
  { id: "4", firstName: "Marcus", lastName: "Holm", country: "Germany", city: "Berlin", linkedIn: "https://linkedin.com/in/marcusholm", email: "marcus@example.com", graduationYear: 2020, field: "Consulting", company: "McKinsey" },
  { id: "5", firstName: "Liisa", lastName: "Mäkelä", country: "United States", city: "New York", linkedIn: "https://linkedin.com/in/liisamakela", graduationYear: 2015, field: "Private Equity", company: "KKR" },
  { id: "6", firstName: "Jonas", lastName: "Björk", country: "Finland", city: "Turku", email: "jonas@example.com", graduationYear: 2021, field: "Accounting", company: "KPMG" },
  { id: "7", firstName: "Emilia", lastName: "Grönroos", country: "Singapore", city: "Singapore", linkedIn: "https://linkedin.com/in/emiliagronroos", graduationYear: 2017, field: "Supply Chain", company: "Maersk" },
  { id: "8", firstName: "Oscar", lastName: "Nyman", country: "Switzerland", city: "Zurich", linkedIn: "https://linkedin.com/in/oscarnyman", phone: "+41 79 123 45 67", graduationYear: 2014, field: "Wealth Management", company: "UBS" },
];

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "full-time" | "part-time" | "club" | "school" | "research";
  location: string;
  description: string;
  postedDate: string;
}

export const jobs: Job[] = [
  { id: "1", title: "Financial Analyst Intern", company: "Nordea", type: "part-time", location: "Helsinki", description: "Join Nordea's team as a financial analyst intern for spring 2026.", postedDate: "2026-02-20" },
  { id: "2", title: "Junior Consultant", company: "McKinsey & Company", type: "full-time", location: "Helsinki", description: "Entry-level consulting role for recent Hanken graduates.", postedDate: "2026-02-18" },
  { id: "3", title: "Marketing Coordinator", company: "SHS", type: "club", location: "Hanken Campus", description: "Help organize SHS marketing campaigns and social media.", postedDate: "2026-02-25" },
  { id: "4", title: "Research Assistant – Economics", company: "Hanken", type: "research", location: "Hanken Campus", description: "Assist Prof. Andersson with ongoing economic research.", postedDate: "2026-02-22" },
  { id: "5", title: "Teaching Assistant – Accounting", company: "Hanken", type: "school", location: "Hanken Campus", description: "Support the accounting department with tutorials and grading.", postedDate: "2026-02-15" },
  { id: "6", title: "Data Analyst", company: "Supercell", type: "full-time", location: "Helsinki", description: "Analyze player data to drive game design decisions.", postedDate: "2026-02-24" },
  { id: "7", title: "Event Coordinator", company: "KY", type: "club", location: "Hanken Campus", description: "Plan and execute KY's spring events and sitz parties.", postedDate: "2026-02-23" },
];

export const countries = [...new Set(alumni.map(a => a.country))].sort();
