import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, GraduationCap, Briefcase, BookOpen } from "lucide-react";

type Role = "student" | "alumni" | "faculty" | null;

const roles = [
  { key: "student" as const, label: "Student", icon: GraduationCap, desc: "Currently studying at Hanken" },
  { key: "alumni" as const, label: "Alumni", icon: Briefcase, desc: "Hanken graduate" },
  { key: "faculty" as const, label: "Faculty", icon: BookOpen, desc: "Professor or staff" },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", linkedIn: "", phone: "", shareContact: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/main");
  };

  return (
    <div className="page-container pt-6">
      <button onClick={() => (role ? setRole(null) : navigate("/"))} className="mb-6 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <AnimatePresence mode="wait">
        {!role ? (
          <motion.div key="pick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold tracking-tight">Join Hanken Hub</h1>
            <p className="mt-1 text-sm text-muted-foreground">Select your role to get started</p>
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
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold tracking-tight capitalize">{role} Sign Up</h1>
            <p className="mt-1 text-sm text-muted-foreground">Fill in your details below</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="search-input" />
                <input placeholder="Last name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="search-input" />
              </div>
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="search-input" />
              <input placeholder="LinkedIn (optional)" value={form.linkedIn} onChange={(e) => setForm({ ...form, linkedIn: e.target.value })} className="search-input" />
              <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="search-input" />

              {role === "alumni" && (
                <label className="flex items-start gap-3 rounded-2xl bg-secondary p-4 cursor-pointer">
                  <input type="checkbox" checked={form.shareContact} onChange={(e) => setForm({ ...form, shareContact: e.target.checked })} className="mt-0.5 h-5 w-5 rounded accent-primary" />
                  <div>
                    <p className="text-sm font-medium">Share my contact on Alumni Connect</p>
                    <p className="text-xs text-muted-foreground">Students can find you by country to connect</p>
                  </div>
                </label>
              )}

              <button type="submit" className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]">
                Create Account
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
