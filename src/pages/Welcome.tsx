import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center px-8 text-center"
      >
        {/* Logo / Brand */}
        <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20">
          <span className="text-3xl font-bold text-primary-foreground">H</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground">
          Hanken Hub
        </h1>
        <p className="mt-2 max-w-xs text-base text-primary-foreground/70 font-medium">
          Your community for students, alumni & faculty
        </p>

        {/* Buttons */}
        <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
          <button
            onClick={() => navigate("/main")}
            className="w-full rounded-2xl bg-primary-foreground py-3.5 text-sm font-semibold text-primary transition-transform active:scale-[0.97]"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full rounded-2xl border border-primary-foreground/30 bg-primary-foreground/10 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur-lg transition-transform active:scale-[0.97]"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
