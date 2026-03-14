import { useState, useCallback } from "react";
import { OnboardingStepsSidebar, Stage } from "@/components/novabyte/OnboardingStepsSidebar";
import { ChatWindow, Message } from "@/components/novabyte/ChatWindow";
import { ChecklistPanel } from "@/components/novabyte/ChecklistPanel";
import { TicketPanel, TicketStatus } from "@/components/novabyte/TicketPanel";
import { DebugPanel } from "@/components/novabyte/DebugPanel";
import { CompletionSummaryCard } from "@/components/novabyte/CompletionSummaryCard";

const INITIAL_CHECKLIST = [
  { id: 1, task: "Clone repository", completed: false },
  { id: 2, task: "Install dependencies", completed: false },
  { id: 3, task: "Setup environment variables", completed: false },
  { id: 4, task: "Read coding standards", completed: false },
  { id: 5, task: "Complete security training", completed: false },
  { id: 6, task: "Sign NDA", completed: false },
  { id: 7, task: "Read architecture documentation", completed: false },
  { id: 8, task: "Setup local dev server", completed: false },
  { id: 9, task: "Run test suite", completed: false },
  { id: 10, task: "Join Slack channels", completed: false },
];

type PersonaField = "role" | "level" | "stack";

const PERSONA_FLOW: { field: PersonaField; question: string; options: string[] }[] = [
  { field: "role", question: "Let's start by identifying your role. What is your primary focus?", options: ["Backend", "Frontend", "DevOps", "FullStack"] },
  { field: "level", question: "Great choice. What is your seniority level?", options: ["Intern", "Junior", "Senior"] },
  { field: "stack", question: "And what's your primary tech stack?", options: ["Node.js", "Python", "React"] },
];

let msgId = 0;
const newId = () => String(++msgId);

const Onboarding = () => {
  const [stage, setStage] = useState<Stage>("Persona");
  const [personaStep, setPersonaStep] = useState(0);
  const [persona, setPersona] = useState({ name: "Riya", role: "", level: "", stack: "" });
  const [messages, setMessages] = useState<Message[]>([
    { id: newId(), role: "assistant", content: `Welcome to NovaByte, Riya. I'm your onboarding agent. ${PERSONA_FLOW[0].question}`, options: PERSONA_FLOW[0].options },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>("Unassigned");
  const [completionTime, setCompletionTime] = useState("");

  const addAssistantMessage = useCallback((content: string, options?: string[], delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: newId(), role: "assistant", content, options }]);
    }, delay);
  }, []);

  const handleOptionClick = useCallback((option: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: newId(), role: "user", content: option }]);

    if (stage === "Persona") {
      const currentField = PERSONA_FLOW[personaStep].field;
      setPersona(p => ({ ...p, [currentField]: option }));

      const nextStep = personaStep + 1;
      if (nextStep < PERSONA_FLOW.length) {
        setPersonaStep(nextStep);
        addAssistantMessage(PERSONA_FLOW[nextStep].question, PERSONA_FLOW[nextStep].options);
      } else {
        // Persona complete — compute final values inline since state hasn't updated yet
        const finalPersona = { ...persona, [currentField]: option };
        setStage("Setup");
        addAssistantMessage(
          `Welcome ${finalPersona.name}! I've identified you as a ${finalPersona.level} ${finalPersona.role} developer working with ${option}. I've populated your setup checklist in the right panel. Check off tasks as you complete them, or let me know if you need help with anything.`
        );
      }
    }
  }, [stage, personaStep, persona, addAssistantMessage]);

  const handleSendMessage = useCallback((message: string) => {
    setMessages(prev => [...prev, { id: newId(), role: "user", content: message }]);
    const lower = message.toLowerCase();

    if (stage === "Setup") {
      // RAG-like responses
      if (lower.includes("database") || lower.includes("db")) {
        addAssistantMessage("To setup the database, check the `docs/database-setup.md` file in the repository. You'll need to run `docker-compose up -d` first, then `npm run db:migrate`. Let me know if you hit any issues.");
      } else if (lower.includes("help") || lower.includes("stuck")) {
        addAssistantMessage("I'm here to help! You can ask me about any setup step — database, environment variables, Docker, testing, or architecture. What do you need help with?");
      } else {
        addAssistantMessage("I'd recommend checking the internal docs for that. You can also ask me specific questions about setup steps. Keep working through the checklist!");
      }
    } else if (stage === "Ticket") {
      if (lower.includes("picked up") || lower.includes("pick up") || lower.includes("started")) {
        setTicketStatus("Picked Up");
        addAssistantMessage("Great! You've picked up FLOW-INTERN-001. Work through the fix and submit a PR when ready. Say 'PR submitted' or paste your PR link when done.");
      } else if (lower.includes("pr submitted") || lower.includes("pr link") || lower.includes("pull request")) {
        setTicketStatus("PR Submitted");
        addAssistantMessage("PR submitted! I'll notify the team for review. The webhook will update when it's merged. You can also use the Debug panel to simulate the merge.");
      } else {
        addAssistantMessage("I see you're working on the starter ticket. Let me know when you've 'picked up' the ticket or when your 'PR submitted'.");
      }
    } else if (stage === "Completion") {
      addAssistantMessage("Your onboarding is complete! Head to the dashboard to start your regular workflow.");
    }
  }, [stage, addAssistantMessage]);

  const handleChecklistToggle = useCallback((id: number) => {
    setChecklist(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      const allDone = updated.every(t => t.completed);
      if (allDone) {
        setStage("Ticket");
        setTicketStatus("Unassigned");
        addAssistantMessage("Excellent work! All setup tasks are complete. You've been assigned your starter ticket: FLOW-INTERN-001 — 'Fix login API validation'. Say 'picked up' when you start working on it.");
      }
      return updated;
    });
  }, [addAssistantMessage]);

  const handlePRMerged = useCallback(() => {
    setTicketStatus("Merged");
    setStage("Completion");
    setCompletionTime(new Date().toLocaleString());
    addAssistantMessage("🎉 System Alert: PR #104 for FLOW-INTERN-001 has been merged into main. Congratulations, your onboarding is officially complete!");
  }, [addAssistantMessage]);

  const handleLMS = useCallback(() => {
    setChecklist(prev => prev.map(t => t.task === "Complete security training" ? { ...t, completed: true } : t));
    addAssistantMessage("✅ LMS webhook received — Security training marked as complete.");
  }, [addAssistantMessage]);

  const handleDocuSign = useCallback(() => {
    setChecklist(prev => prev.map(t => t.task === "Sign NDA" ? { ...t, completed: true } : t));
    addAssistantMessage("✅ DocuSign webhook received — NDA has been signed and verified.");
  }, [addAssistantMessage]);

  const inputDisabled = stage === "Completion";

  return (
    <div className="flex h-screen w-full font-sans selection:bg-primary/30">
      <OnboardingStepsSidebar currentStage={stage} />

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        inputDisabled={inputDisabled}
        onOptionClick={handleOptionClick}
        onSendMessage={handleSendMessage}
      />

      {/* Right Panel */}
      <aside className="w-80 border-l border-nova-white-5 flex flex-col bg-sidebar p-6 overflow-y-auto scrollbar-hide">
        {stage === "Completion" ? (
          <CompletionSummaryCard
            name={persona.name}
            role={persona.role}
            level={persona.level}
            stack={persona.stack}
            ticketId="FLOW-INTERN-001"
            timestamp={completionTime}
          />
        ) : (
          <>
            <div className="mb-8">
              {stage === "Ticket" ? (
                <TicketPanel status={ticketStatus} assignee={persona.name} />
              ) : (
                <ChecklistPanel items={checklist} onToggle={handleChecklistToggle} />
              )}
            </div>

            <div className="mt-auto">
              <DebugPanel
                onSimulatePRMerged={handlePRMerged}
                onSimulateLMS={handleLMS}
                onSimulateDocuSign={handleDocuSign}
              />
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Onboarding;
