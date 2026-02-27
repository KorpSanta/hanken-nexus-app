import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Linkedin, Mail, Phone, MapPin, Building2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar, { useSearch } from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import { alumni, jobs, countries, type Job } from "@/data/connect";

type Tab = "alumni" | "jobs";
type JobFilter = "all" | Job["type"];

const Connect = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("alumni");
  const [alumniQuery, setAlumniQuery] = useState("");
  const [jobQuery, setJobQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [jobFilter, setJobFilter] = useState<JobFilter>("all");

  const filteredCountry = country === "all" ? alumni : alumni.filter((a) => a.country === country);
  const filteredAlumni = useSearch(filteredCountry, alumniQuery, ["firstName", "lastName", "city", "linkedIn", "email", "phone", "company", "field"]);

  const filteredType = jobFilter === "all" ? jobs : jobs.filter((j) => j.type === jobFilter);
  const filteredJobs = useSearch(filteredType, jobQuery, ["title", "company", "location"]);

  return (
    <div className="page-container">
      <button onClick={() => navigate("/main")} className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Home
      </button>
      <h1 className="text-2xl font-bold tracking-tight mb-4">Connect</h1>

      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl bg-secondary p-1 mb-4">
        {(["alumni", "jobs"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t === "alumni" ? "Alumni" : "Job Board"}
          </button>
        ))}
      </div>

      {tab === "alumni" ? (
        <>
          <SearchBar placeholder="Search alumni by name, company, LinkedIn…" value={alumniQuery} onChange={setAlumniQuery} />
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: "none" }}>
            <button onClick={() => setCountry("all")} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${country === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              All Countries
            </button>
            {countries.map((c) => (
              <button key={c} onClick={() => setCountry(c)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${country === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {filteredAlumni.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }} className="glass-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{a.firstName} {a.lastName}</h3>
                    <p className="text-xs text-muted-foreground">{a.field} · Class of {a.graduationYear}</p>
                    {a.company && <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3 w-3" />{a.company}</p>}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />{a.city}, {a.country}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.linkedIn && (
                    <a href={a.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </a>
                  )}
                  {a.email && (
                    <a href={`mailto:${a.email}`} className="flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-[11px] font-medium text-secondary-foreground">
                      <Mail className="h-3 w-3" /> Email
                    </a>
                  )}
                  {a.phone && (
                    <a href={`tel:${a.phone}`} className="flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-[11px] font-medium text-secondary-foreground">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {filteredAlumni.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No alumni found</p>}
          </div>
        </>
      ) : (
        <>
          <SearchBar placeholder="Search jobs by title, company…" value={jobQuery} onChange={setJobQuery} />
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: "none" }}>
            {(["all", "full-time", "part-time", "club", "school", "research"] as const).map((f) => (
              <button key={f} onClick={() => setJobFilter(f)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${jobFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {filteredJobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }} className="glass-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold capitalize text-accent mb-1">{job.type}</span>
                    <h3 className="text-sm font-semibold">{job.title}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3 w-3" />{job.company}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />{job.location}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{job.description}</p>
              </motion.div>
            ))}
            {filteredJobs.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No jobs found</p>}
          </div>
        </>
      )}
      <BottomNav />
    </div>
  );
};

export default Connect;
