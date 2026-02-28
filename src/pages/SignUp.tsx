import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, GraduationCap, Briefcase, BookOpen } from "lucide-react";
import { useLanguage, type Lang } from "@/hooks/useLanguage";

type Role = "student" | "alumni" | "faculty" | null;

const SignUp = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const [role, setRole] = useState<Role>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", linkedIn: "", phone: "", shareContact: false,
  });

  const roles = [
    { key: "student" as const, label: t.student, icon: GraduationCap, desc: t.student_desc },
    { key: "alumni" as const, label: t.alumni_role, icon: Briefcase, desc: t.alumni_desc },
    { key: "faculty" as const, label: t.faculty, icon: BookOpen, desc: t.faculty_desc },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/main");
  };

  return (
    <div className="page-container pt-6">
      <button onClick={() => (role ? setRole(null) : navigate("/"))} className="mb-6 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {t.back}
      </button>

      <AnimatePresence mode="wait">
        {!role ? (
          <motion.div key="pick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold tracking-tight">{t.join_hanken}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.select_role}</p>
            <div className="mt-8 space-y-3">
              {roles.map(({ key, label, icon: Icon, desc }) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className="glass-card-hover flex w-full items-center gap-4 p-5 text-left"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Language selector */}
            <div className="mt-10">
              <p className="text-xs font-semibold text-muted-foreground mb-2">{t.language}</p>
              <div className="flex gap-2">
                {(["en", "sv"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition-all ${
                      lang === l
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {l === "en" ? "English" : "Svenska"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold tracking-tight capitalize">{role} {t.signup_title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.fill_details}</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder={t.first_name} required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="search-input" />
                <input placeholder={t.last_name} required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="search-input" />
              </div>
              <input type="email" placeholder={t.email} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="search-input" />
              <input placeholder={t.linkedin_optional} value={form.linkedIn} onChange={(e) => setForm({ ...form, linkedIn: e.target.value })} className="search-input" />
              <input placeholder={t.phone_optional} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="search-input" />

              {role === "alumni" && (
                <label className="flex items-start gap-3 rounded-2xl bg-secondary p-4 cursor-pointer">
                  <input type="checkbox" checked={form.shareContact} onChange={(e) => setForm({ ...form, shareContact: e.target.checked })} className="mt-0.5 h-5 w-5 rounded accent-primary" />
                  <div>
                    <p className="text-sm font-medium">{t.share_contact}</p>
                    <p className="text-xs text-muted-foreground">{t.share_contact_desc}</p>
                  </div>
                </label>
              )}

              <button type="submit" className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]">
                {t.create_account}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
