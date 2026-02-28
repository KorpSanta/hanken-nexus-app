import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Lang = "en" | "sv";

type Translations = typeof en;

const en = {
  // Welcome
  welcome_tagline: "Your community for students, alumni & faculty",
  login: "Log In",
  signup: "Sign Up",

  // SignUp
  join_hanken: "Join Hanken Hub",
  select_role: "Select your role to get started",
  student: "Student",
  alumni_role: "Alumni",
  faculty: "Faculty",
  student_desc: "Currently studying at Hanken",
  alumni_desc: "Hanken graduate",
  faculty_desc: "Professor or staff",
  signup_title: "Sign Up",
  fill_details: "Fill in your details below",
  first_name: "First name",
  last_name: "Last name",
  email: "Email",
  linkedin_optional: "LinkedIn (optional)",
  phone_optional: "Phone (optional)",
  share_contact: "Share my contact on Alumni Connect",
  share_contact_desc: "Students can find you by country to connect",
  create_account: "Create Account",
  back: "Back",
  language: "Language",

  // Main
  hanken_hub: "Hankeit",
  main_description: "Your all-in-one hub for students, alumni, and faculty of Hanken — songs, events, videos, and a community that stays connected.",
  songbook: "Songbook",
  classics: "Classics",
  events: "Events",
  connect: "Connect",
  whats_new: "What's new on campus?",

  // Songbook
  search_songs: "Search by title or number…",
  no_songs: "No songs found",
  home: "Home",
  song_number: "Song",

  // Classics
  search_classics: "Search classics…",
  no_classics: "No classics found",

  // Events
  search_events: "Search events…",
  no_events: "No events found",
  all: "All",
  hanken: "Hanken",

  // Connect
  alumni_tab: "Alumni",
  job_board: "Job Board",
  all_countries: "All Countries",
  search_alumni: "Search alumni by name, company, LinkedIn…",
  search_jobs: "Search jobs by title, company…",
  no_alumni: "No alumni found",
  no_jobs: "No jobs found",

  // SongDetail
  songbook_back: "Songbook",

  // BottomNav
  nav_home: "Home",
  nav_songs: "Songs",
  nav_classics: "Classics",
  nav_events: "Events",
  nav_connect: "Connect",
};

const sv: Translations = {
  welcome_tagline: "Din gemenskap för studenter, alumner & personal",
  login: "Logga in",
  signup: "Registrera",

  join_hanken: "Gå med i Hanken Hub",
  select_role: "Välj din roll för att komma igång",
  student: "Student",
  alumni_role: "Alumn",
  faculty: "Personal",
  student_desc: "Studerar för närvarande vid Hanken",
  alumni_desc: "Utexaminerad från Hanken",
  faculty_desc: "Professor eller personal",
  signup_title: "Registrering",
  fill_details: "Fyll i dina uppgifter nedan",
  first_name: "Förnamn",
  last_name: "Efternamn",
  email: "E-post",
  linkedin_optional: "LinkedIn (valfritt)",
  phone_optional: "Telefon (valfritt)",
  share_contact: "Dela min kontakt på Alumni Connect",
  share_contact_desc: "Studenter kan hitta dig efter land för att ansluta",
  create_account: "Skapa konto",
  back: "Tillbaka",
  language: "Språk",

  hanken_hub: "Hankeit",
  main_description: "Din allt-i-ett-hub för studenter, alumner och personal vid Hanken — sånger, evenemang, videor och en gemenskap som håller kontakten.",
  songbook: "Sångbok",
  classics: "Klassiker",
  events: "Evenemang",
  connect: "Kontakt",
  whats_new: "Vad är nytt på campus?",

  search_songs: "Sök efter titel eller nummer…",
  no_songs: "Inga sånger hittades",
  home: "Hem",
  song_number: "Sång",

  search_classics: "Sök klassiker…",
  no_classics: "Inga klassiker hittades",

  search_events: "Sök evenemang…",
  no_events: "Inga evenemang hittades",
  all: "Alla",
  hanken: "Hanken",

  alumni_tab: "Alumner",
  job_board: "Jobbanslagstavla",
  all_countries: "Alla länder",
  search_alumni: "Sök alumner efter namn, företag, LinkedIn…",
  search_jobs: "Sök jobb efter titel, företag…",
  no_alumni: "Inga alumner hittades",
  no_jobs: "Inga jobb hittades",

  songbook_back: "Sångbok",

  nav_home: "Hem",
  nav_songs: "Sånger",
  nav_classics: "Klassiker",
  nav_events: "Evenemang",
  nav_connect: "Kontakt",
};

const translations = { en, sv };

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("hanken-lang") as Lang) || "en";
    }
    return "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("hanken-lang", l);
  }, []);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}
