export interface HankenEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: "school" | "shs" | "club";
  description: string;
}

export const events: HankenEvent[] = [
  {
    id: "1", title: "Welcome Back Party", date: "2026-03-05", time: "18:00",
    location: "SHS Lounge", organizer: "SHS", category: "shs",
    description: "Kick off the spring semester with SHS! DJ, drinks, and great vibes."
  },
  {
    id: "2", title: "Finance Guest Lecture: Goldman Sachs", date: "2026-03-10", time: "14:00",
    location: "Auditorium", organizer: "Hanken", category: "school",
    description: "Senior VP from Goldman Sachs talks about career paths in investment banking."
  },
  {
    id: "3", title: "Sitz Party – Spring Edition", date: "2026-03-14", time: "19:00",
    location: "Hanken Main Hall", organizer: "KY", category: "club",
    description: "The legendary spring sitz with singing, food, and festivities."
  },
  {
    id: "4", title: "Career Fair 2026", date: "2026-03-18", time: "10:00",
    location: "Hanken Campus", organizer: "Hanken", category: "school",
    description: "Meet top employers from finance, consulting, tech, and more."
  },
  {
    id: "5", title: "Pub Crawl Helsinki", date: "2026-03-20", time: "20:00",
    location: "Helsinki City Center", organizer: "SHS", category: "shs",
    description: "Explore Helsinki's best pubs with fellow Hanken students."
  },
  {
    id: "6", title: "Entrepreneurship Workshop", date: "2026-03-22", time: "13:00",
    location: "Room 301", organizer: "StartUp Club", category: "club",
    description: "Learn how to pitch your startup idea from successful Hanken alumni."
  },
  {
    id: "7", title: "Annual Gala", date: "2026-03-28", time: "18:00",
    location: "Hotel Kämp", organizer: "SHS", category: "shs",
    description: "The most prestigious event of the year. Black tie required."
  },
  {
    id: "8", title: "AI in Business Seminar", date: "2026-03-12", time: "09:00",
    location: "Auditorium", organizer: "Hanken", category: "school",
    description: "How AI is transforming modern business – featuring industry leaders."
  },
];
