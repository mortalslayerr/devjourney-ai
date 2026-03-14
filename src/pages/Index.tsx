import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(217_91%_60%/0.08),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center glow-blue">
            <Terminal size={28} className="text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            NovaByte
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Developer Onboarding Agent
          </p>
          <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">
            AI-powered onboarding that gets you from zero to shipping in record time.
          </p>
        </div>

        <button
          onClick={() => navigate("/onboarding")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl text-sm font-semibold transition-all glow-blue hover:shadow-[0_0_25px_hsl(217_91%_60%/0.5)]"
        >
          Start Onboarding
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
};

export default Index;
