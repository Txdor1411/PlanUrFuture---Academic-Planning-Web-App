export type Subject = "matematica" | "romana" | "engleza";
export type ExerciseType = "multiple-choice" | "fill-in";

export interface Exercise {
  id: string;
  subject: Subject;
  type: ExerciseType;
  theory: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  bacSource?: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface SubjectMeta {
  subject: Subject;
  label: string;
  emoji: string;
  description: string;
  color: string;
  border: string;
  bg: string;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    subject: "matematica",
    label: "Matematică",
    emoji: "📐",
    description: "Algebră, funcții, geometrie — subiecte de Bac",
    color: "text-sky-300",
    border: "border-sky-300/30",
    bg: "bg-sky-900/20",
  },
  {
    subject: "romana",
    label: "Română",
    emoji: "📖",
    description: "Gramatică, texte literare, figuri de stil",
    color: "text-rose-300",
    border: "border-rose-300/30",
    bg: "bg-rose-900/20",
  },
  {
    subject: "engleza",
    label: "Engleză",
    emoji: "🌍",
    description: "Reading comprehension, vocabular, gramatică",
    color: "text-emerald-300",
    border: "border-emerald-300/30",
    bg: "bg-emerald-900/20",
  },
];

export const exercises: Exercise[] = [
  // ──────────────── MATEMATICĂ ────────────────
  {
    id: "mat-1",
    subject: "matematica",
    type: "multiple-choice",
    difficulty: "easy",
    bacSource: "Bac 2023, Subiectul I",
    theory:
      "Mulțimea soluțiilor unei ecuații de gradul II ax² + bx + c = 0 se determină cu formula discriminantului Δ = b² − 4ac. Dacă Δ > 0 există două soluții reale distincte; Δ = 0 — o soluție dublă; Δ < 0 — fără soluții reale.",
    question: "Care sunt soluțiile ecuației x² − 5x + 6 = 0?",
    options: ["x₁ = 2, x₂ = 3", "x₁ = −2, x₂ = −3", "x₁ = 1, x₂ = 6", "x₁ = −1, x₂ = 6"],
    correctAnswer: "x₁ = 2, x₂ = 3",
    explanation:
      "Δ = 25 − 24 = 1 > 0. x = (5 ± 1) / 2, deci x₁ = 3, x₂ = 2. Verificare: 3 × 2 = 6 ✓, 3 + 2 = 5 ✓.",
  },
  {
    id: "mat-2",
    subject: "matematica",
    type: "multiple-choice",
    difficulty: "medium",
    bacSource: "Bac 2022, Subiectul II",
    theory:
      "Funcția f: ℝ → ℝ, f(x) = ax² + bx + c este o parabolă. Vârful parabolei se află la x_v = −b / (2a). Funcția este monoton crescătoare pe [x_v, +∞) dacă a > 0.",
    question: "Funcția f(x) = x² − 4x + 3 este monoton descrescătoare pe intervalul:",
    options: ["(−∞, 2]", "[2, +∞)", "(−∞, 3]", "[1, 3]"],
    correctAnswer: "(−∞, 2]",
    explanation:
      "a = 1 > 0, deci vârful este la x_v = −(−4)/(2·1) = 2. Parabola deschisă în sus descreşte pe (−∞, 2] şi creşte pe [2, +∞).",
  },
  {
    id: "mat-3",
    subject: "matematica",
    type: "multiple-choice",
    difficulty: "medium",
    bacSource: "Bac 2023, Subiectul III",
    theory:
      "Limita unui șir geometric cu rație |r| < 1 este 0. Suma termenilor unei progresii geometrice infinite cu primul termen a₁ şi rație r, |r| < 1, este S = a₁ / (1 − r).",
    question: "Suma seriei 1 + 1/2 + 1/4 + 1/8 + ... este egală cu:",
    options: ["2", "3/2", "4/3", "∞"],
    correctAnswer: "2",
    explanation: "a₁ = 1, r = 1/2, |r| < 1 → S = 1 / (1 − 1/2) = 1 / (1/2) = 2.",
  },
  {
    id: "mat-4",
    subject: "matematica",
    type: "multiple-choice",
    difficulty: "hard",
    bacSource: "Bac 2024, Subiectul II",
    theory:
      "Derivata funcției f(x) = xⁿ este f′(x) = n·xⁿ⁻¹. Derivata unui produs: (uv)′ = u′v + uv′. Punctele de extrem local sunt la x unde f′(x) = 0 și f″(x) ≠ 0.",
    question: "Derivata funcției f(x) = x³ − 3x² + 2 în punctul x = 1 este:",
    options: ["−3", "0", "3", "−1"],
    correctAnswer: "−3",
    explanation: "f′(x) = 3x² − 6x. f′(1) = 3·1 − 6·1 = 3 − 6 = −3.",
  },
  {
    id: "mat-5",
    subject: "matematica",
    type: "multiple-choice",
    difficulty: "hard",
    bacSource: "Bac 2022, Subiectul I",
    theory:
      "Logaritmii: log_a(xy) = log_a(x) + log_a(y); log_a(x/y) = log_a(x) − log_a(y); log_a(xᵏ) = k·log_a(x). Schimbare bază: log_a(x) = ln(x)/ln(a).",
    question: "Valoarea expresiei log₂(8) + log₂(1/2) este:",
    options: ["2", "4", "1", "3"],
    correctAnswer: "2",
    explanation: "log₂(8) = log₂(2³) = 3. log₂(1/2) = log₂(2⁻¹) = −1. Suma: 3 + (−1) = 2.",
  },

  // ──────────────── ROMÂNĂ ────────────────
  {
    id: "rom-1",
    subject: "romana",
    type: "multiple-choice",
    difficulty: "easy",
    bacSource: "Bac 2023, Subiect I",
    theory:
      "Figurile de stil imbogatesc limbajul literar. Metafora identifica doua concepte prin asemanare implicita (fara termenul 'ca'). Comparatia este explicita, folosind termeni ca 'ca', 'precum', 'asemeni'.",
    question: "In versul 'Ochii ei sunt doua stele', figura de stil folosita este:",
    options: ["Metafora", "Comparatie", "Personificare", "Hiperbola"],
    correctAnswer: "Metafora",
    explanation:
      "Identificarea directa a ochilor cu stelele fara termenul comparativ indica o metafora.",
  },
  {
    id: "rom-2",
    subject: "romana",
    type: "multiple-choice",
    difficulty: "medium",
    bacSource: "Bac 2022, Subiect II",
    theory:
      "Complementul circumstantial de mod raspunde la intrebarea 'Cum?'. Complementul circumstantial de loc raspunde la 'Unde?'. Atributul determina un substantiv si poate fi adjectival, substantival sau pronominal.",
    question: "In propozitia 'El a plecat repede acasa', cuvantul 'repede' este:",
    options: [
      "Complement circumstantial de mod",
      "Complement circumstantial de loc",
      "Atribut adverbial",
      "Predicat nominal",
    ],
    correctAnswer: "Complement circumstantial de mod",
    explanation: "Cuvantul 'repede' raspunde la intrebarea 'Cum a plecat?' → complement circumstantial de mod.",
  },
  {
    id: "rom-3",
    subject: "romana",
    type: "multiple-choice",
    difficulty: "medium",
    bacSource: "Bac 2024, Subiect I",
    theory:
      "Romanul realist prezinta societatea ca atare, cu personaje tipice. Mihai Eminescu este considerat poetul national al Romaniei, reprezentant al romantismului. Ion Creanga este asociat cu realismul samanatorist si povestirile populare.",
    question: "Romanul 'Ion' de Liviu Rebreanu apartine curentului literar:",
    options: ["Realism", "Romantism", "Simbolism", "Modernism"],
    correctAnswer: "Realism",
    explanation:
      "Romanul 'Ion' (1920) este considerat primul roman realist modern din literatura romana, prezentand viata satului transilvanean.",
  },

  // ──────────────── ENGLEZĂ ────────────────
  {
    id: "eng-1",
    subject: "engleza",
    type: "multiple-choice",
    difficulty: "easy",
    theory:
      "The Present Perfect tense (have/has + past participle) is used for actions that happened at an unspecified time in the past or for actions that started in the past and continue to the present. Key words: already, yet, ever, never, just, since, for.",
    question: "Choose the correct sentence:",
    options: [
      "I have never been to Paris.",
      "I never been to Paris.",
      "I have never go to Paris.",
      "I was never to Paris.",
    ],
    correctAnswer: "I have never been to Paris.",
    explanation:
      "Present Perfect: have/has + past participle. 'Been' is the past participle of 'be'. 'Never' triggers Present Perfect in this context.",
  },
  {
    id: "eng-2",
    subject: "engleza",
    type: "multiple-choice",
    difficulty: "medium",
    theory:
      "Conditional sentences type 2 are used for hypothetical or unlikely situations in the present/future. Structure: If + past simple, would + base verb. Example: If I had more time, I would study more.",
    question: "Complete the sentence: 'If she _____ harder, she _____ the exam.'",
    options: [
      "studied / would pass",
      "studies / will pass",
      "had studied / would pass",
      "will study / passes",
    ],
    correctAnswer: "studied / would pass",
    explanation:
      "Type 2 conditional (hypothetical present/future): If + past simple (studied) + would + base verb (would pass).",
  },
];

export function getExercisesBySubject(subject: Subject): Exercise[] {
  return exercises.filter((e) => e.subject === subject);
}

export function getSubjectMeta(subject: Subject): SubjectMeta {
  return SUBJECTS.find((s) => s.subject === subject)!;
}
