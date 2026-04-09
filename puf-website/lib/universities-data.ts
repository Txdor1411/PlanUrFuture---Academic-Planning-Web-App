export type University = {
  slug: string;
  name: string;
  imageUrl: string;
  region: string;
  location: string;
  type: "Public" | "Private";
  qsRank: string;
  acceptanceRate: string;
  tuition: string;
  totalCost: string;
  roomBoard: string;
  financialAid: string;
  scholarships: string[];
  admissionTypeAndDeadlines: string;
  testRequirements: string;
  essaysAndRecommendations: string;
  extracurricularsAndInterview: string;
  applicationFee: string;
  housing: string;
  stepByStep: string[];
  undergraduateProgrammes: string[];
  graduateProgrammes: string[];
};

export const universities: University[] = [
  {
    slug: "harvard-university",
    name: "Harvard University",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/330px-Harvard_University_coat_of_arms.svg.png",
    region: "USA",
    location: "Cambridge, MA",
    type: "Private",
    qsRank: "#4 (2025)",
    acceptanceRate: "3.6%",
    tuition: "$59,950/year",
    totalCost: "~$82,000/year",
    roomBoard: "$21,400/year",
    financialAid:
      "Meets 100% of demonstrated need; avg aid package around $56,000/year; families earning below $85K usually pay nothing.",
    scholarships: [
      "Harvard Scholarship (need-based)",
      "No merit scholarships for undergrad",
    ],
    admissionTypeAndDeadlines:
      "Holistic admission (Common App + Harvard supplement). Early Action: Nov 1. Regular Decision: Jan 1.",
    testRequirements:
      "SAT 1500-1580 or ACT 34-36 (mid-50%), currently test-optional. Very strong GPA and rigorous courses expected.",
    essaysAndRecommendations:
      "Common App essay + Harvard short essays. 2 teacher recommendations + 1 counselor recommendation.",
    extracurricularsAndInterview:
      "Leadership, research and measurable impact matter. Alumni interview is informational and usually offered.",
    applicationFee: "$85 (fee waivers available)",
    housing:
      "On-campus housing guaranteed for all 4 years; first year in Yard dorms, then House system.",
    stepByStep: [
      "Create Common App account and select Harvard.",
      "Ask for recommendations early (teachers + counselor).",
      "Prepare SAT/ACT if you choose to submit scores.",
      "Draft and refine Common App + supplement essays.",
      "Submit application by Nov 1 (EA) or Jan 1 (RD).",
      "Submit CSS Profile + FAFSA for financial aid.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Economics",
      "Government",
      "Biology",
      "Mathematics",
      "Psychology",
      "Physics",
      "Environmental Science",
    ],
    graduateProgrammes: [
      "MBA (HBS)",
      "JD",
      "MD",
      "MPA/MPP",
      "MEd",
      "PhD programmes",
    ],
  },
  {
    slug: "mit",
    name: "MIT",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/330px-MIT_Seal.svg.png",
    region: "USA",
    location: "Cambridge, MA",
    type: "Private",
    qsRank: "#1 (2025)",
    acceptanceRate: "4.7%",
    tuition: "$59,750/year",
    totalCost: "~$81,000/year",
    roomBoard: "$19,800/year",
    financialAid:
      "Meets 100% of demonstrated need; families below $90K often pay nothing; average package around $55,000/year.",
    scholarships: [
      "MIT Scholarship (need-based)",
      "No merit scholarship model for undergrad",
    ],
    admissionTypeAndDeadlines:
      "Holistic admission via MyMIT. Early Action: Nov 1. Regular Decision: Jan 1.",
    testRequirements:
      "SAT 1510-1580 or ACT 34-36 (mid-50%), test-flexible/test-optional policy depending on cycle. Strong STEM profile required.",
    essaysAndRecommendations:
      "Multiple MIT short essays. 2 teacher recommendations (at least one math/science) + counselor recommendation.",
    extracurricularsAndInterview:
      "STEM olympiads, projects, robotics, research and entrepreneurship are highly valued. Alumni interview encouraged.",
    applicationFee: "$75",
    housing:
      "Freshman housing guaranteed. Upper-year housing available through dorm selection/lottery.",
    stepByStep: [
      "Open MyMIT account and start the application.",
      "Secure strong STEM recommendations.",
      "Prepare tests and academic profile.",
      "Write authentic MIT short essays.",
      "Apply by Nov 1 (EA) or Jan 1 (RD).",
      "Complete CSS Profile + FAFSA.",
    ],
    undergraduateProgrammes: [
      "Electrical Engineering and Computer Science",
      "Mechanical Engineering",
      "Aerospace Engineering",
      "Mathematics",
      "Physics",
      "Biology",
      "Economics",
      "Architecture",
    ],
    graduateProgrammes: [
      "MS/PhD Computer Science",
      "MS/PhD Engineering",
      "MBA (Sloan)",
      "MArch",
      "MS/PhD Physics",
    ],
  },
  {
    slug: "stanford-university",
    name: "Stanford University",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/960px-Seal_of_Leland_Stanford_Junior_University.svg.png",
    region: "USA",
    location: "Stanford, CA",
    type: "Private",
    qsRank: "#5 (2025)",
    acceptanceRate: "3.7%",
    tuition: "$62,484/year",
    totalCost: "~$84,000/year",
    roomBoard: "$20,000/year",
    financialAid:
      "Meets 100% of need; families below $75K often pay no tuition. Average aid package around $60,000/year.",
    scholarships: [
      "Stanford Scholarship (need-based)",
      "Knight-Hennessy (graduate)",
    ],
    admissionTypeAndDeadlines:
      "Holistic admission via Common App. Restrictive Early Action: Nov 1. Regular Decision: Jan 2.",
    testRequirements:
      "SAT 1500-1570 or ACT 34-36 typical range; currently test-optional. Very strong GPA and course rigor expected.",
    essaysAndRecommendations:
      "Common App personal statement + Stanford short essays and short questions. 2 teacher + 1 counselor recommendation.",
    extracurricularsAndInterview:
      "Depth of impact matters more than number of activities. Alumni interview may be offered based on availability.",
    applicationFee: "$90",
    housing:
      "On-campus housing generally available across all four years through residential communities.",
    stepByStep: [
      "Open Common App and choose Stanford.",
      "Decide REA vs RD strategy.",
      "Prepare Stanford essays and recommendations.",
      "Submit application and aid documents.",
      "Track interview invite and portal updates.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Economics",
      "Human Biology",
      "Engineering",
      "Mathematics",
      "Communication",
      "Symbolic Systems",
      "Data Science",
    ],
    graduateProgrammes: [
      "MBA",
      "JD",
      "MD",
      "MS Computer Science",
      "MS Electrical Engineering",
      "PhD programmes",
    ],
  },
  {
    slug: "yale-university",
    name: "Yale University",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/330px-Yale_University_Shield_1.svg.png",
    region: "USA",
    location: "New Haven, CT",
    type: "Private",
    qsRank: "#16 (2025)",
    acceptanceRate: "4.6%",
    tuition: "$64,700/year",
    totalCost: "~$85,000/year",
    roomBoard: "$19,800/year",
    financialAid:
      "Meets 100% of demonstrated need; average aid around $61,000/year; families below $75K often pay nothing.",
    scholarships: ["Yale Scholarship (need-based)"],
    admissionTypeAndDeadlines:
      "Common App + Yale supplement. Single-Choice Early Action: Nov 1. Regular Decision: Jan 2.",
    testRequirements:
      "SAT 1470-1570 or ACT 33-35 typical range; currently test-optional. Excellent grades and rigor expected.",
    essaysAndRecommendations:
      "Common App essay + Yale short essays/questions. 2 teacher + 1 counselor recommendations.",
    extracurricularsAndInterview:
      "Strong intellectual engagement and meaningful extracurricular depth. Alumni interview recommended when available.",
    applicationFee: "$80",
    housing:
      "Residential College system with on-campus housing throughout undergraduate years.",
    stepByStep: [
      "Start Common App and select Yale.",
      "Choose SCEA or RD path.",
      "Write Yale supplement essays.",
      "Submit recommendations and academic records.",
      "Submit CSS Profile + FAFSA.",
    ],
    undergraduateProgrammes: [
      "Political Science",
      "Economics",
      "History",
      "Computer Science",
      "Mathematics",
      "Physics",
      "Architecture",
      "Global Affairs",
    ],
    graduateProgrammes: [
      "JD",
      "MD",
      "MBA",
      "MFA",
      "Master of Architecture",
      "PhD programmes",
    ],
  },
  {
    slug: "columbia-university",
    name: "Columbia University",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Coat_of_Arms_of_Columbia_University.svg/330px-Coat_of_Arms_of_Columbia_University.svg.png",
    region: "USA",
    location: "New York, NY",
    type: "Private",
    qsRank: "#22 (2025)",
    acceptanceRate: "3.9%",
    tuition: "$66,139/year",
    totalCost: "~$87,000/year",
    roomBoard: "$16,000/year",
    financialAid:
      "Meets 100% of demonstrated need with significant need-based aid packages.",
    scholarships: [
      "Columbia Scholarship (need-based)",
      "Kluge Scholars Program",
    ],
    admissionTypeAndDeadlines:
      "Common App + Columbia supplement. Early Decision (binding): Nov 1. Regular Decision: Jan 1.",
    testRequirements:
      "SAT 1490-1570 or ACT 34-36 typical range; currently test-optional.",
    essaysAndRecommendations:
      "Supplement includes list questions and Why Columbia/Core essay. 2 teacher + 1 counselor recommendations.",
    extracurricularsAndInterview:
      "Urban impact, research and strong profile coherence matter. Interview is generally not offered.",
    applicationFee: "$85",
    housing:
      "On-campus housing guaranteed mainly for first years, then more limited upper-year availability.",
    stepByStep: [
      "Choose ED or RD strategy.",
      "Complete Common App + Columbia supplements.",
      "Write strong Why Columbia/Core essay.",
      "Submit aid forms (CSS + FAFSA).",
      "Track portal and admissions timeline.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Economics",
      "Political Science",
      "Mathematics",
      "Mechanical Engineering",
      "Psychology",
      "Film Studies",
      "Sustainable Development",
    ],
    graduateProgrammes: [
      "MS Computer Science",
      "MBA",
      "MA Journalism",
      "JD",
      "MD",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-oxford",
    name: "University of Oxford",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Arms_of_University_of_Oxford.svg/500px-Arms_of_University_of_Oxford.svg.png",
    region: "UK",
    location: "Oxford, England",
    type: "Public",
    qsRank: "#3 (2025)",
    acceptanceRate: "~17% overall",
    tuition: "GBP 9,250 (UK) / GBP 26,770-39,010 (international)",
    totalCost: "~GBP 26,000-50,000+/year",
    roomBoard: "~GBP 10,000-13,000/year",
    financialAid:
      "Bursaries available for UK students; limited but important support schemes for internationals.",
    scholarships: [
      "Reach Oxford Scholarship",
      "Rhodes Scholarship (postgraduate)",
      "Clarendon Fund (postgraduate)",
    ],
    admissionTypeAndDeadlines:
      "UCAS application only, strict deadline October 15. You apply to a specific course and college.",
    testRequirements:
      "Course-specific admissions tests are often mandatory (LNAT, MAT, TSA, PAT, etc.). Excellent A-level/IB or equivalent expected.",
    essaysAndRecommendations:
      "UCAS Personal Statement focused on academics + one academic reference through UCAS.",
    extracurricularsAndInterview:
      "Academic passion and super-curricular depth matter most. Interview is mandatory for shortlisted candidates.",
    applicationFee: "UCAS fee",
    housing:
      "College accommodation usually guaranteed for at least first year, often more.",
    stepByStep: [
      "Choose course and college early.",
      "Create UCAS application before October 15.",
      "Register for required admissions test.",
      "Prepare an academic-focused personal statement.",
      "Attend mandatory interviews if shortlisted.",
    ],
    undergraduateProgrammes: [
      "PPE",
      "Law",
      "Medicine",
      "Mathematics",
      "Computer Science",
      "Engineering Science",
      "History",
      "Chemistry",
    ],
    graduateProgrammes: [
      "MSc Computer Science",
      "MBA",
      "MSc Law",
      "MSc Financial Economics",
      "MPP",
      "DPhil programmes",
    ],
  },
  {
    slug: "university-of-cambridge",
    name: "University of Cambridge",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/3840px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png",
    region: "UK",
    location: "Cambridge, England",
    type: "Public",
    qsRank: "#2 (2025)",
    acceptanceRate: "~18% overall",
    tuition: "GBP 9,250 (UK) / GBP 22,227-58,038 (international)",
    totalCost: "~GBP 35,000-65,000/year",
    roomBoard: "~GBP 8,000-11,000/year",
    financialAid:
      "Cambridge bursaries for UK students and highly competitive international support via trusts.",
    scholarships: [
      "Gates Cambridge (postgraduate)",
      "Cambridge Trust Scholarships",
      "Cambridge International Scholarships",
    ],
    admissionTypeAndDeadlines:
      "UCAS application by October 15 + Cambridge supplementary form shortly after.",
    testRequirements:
      "Strong A-level/IB/equivalent profile and course-specific assessments (STEP, TMUA, etc.) for many programs.",
    essaysAndRecommendations:
      "UCAS Personal Statement and academic reference, plus supplementary Cambridge academic information.",
    extracurricularsAndInterview:
      "Academic depth is prioritized. Interview is mandatory for shortlisted applicants.",
    applicationFee: "UCAS fee",
    housing:
      "College accommodation is often guaranteed across most undergraduate years.",
    stepByStep: [
      "Choose subject and college.",
      "Submit UCAS by October 15.",
      "Complete supplementary Cambridge form.",
      "Sit pre-interview assessments if required.",
      "Attend interview in December if invited.",
    ],
    undergraduateProgrammes: [
      "Natural Sciences",
      "Mathematics",
      "Computer Science",
      "Engineering",
      "Law",
      "Economics",
      "Medicine",
      "Architecture",
    ],
    graduateProgrammes: [
      "MPhil/PhD programmes",
      "MBA",
      "LLM",
      "MPhil Advanced Computer Science",
      "MPhil Economics",
      "MEng",
    ],
  },
  {
    slug: "imperial-college-london",
    name: "Imperial College London",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/960px-Shield_of_Imperial_College_London.svg.png",
    region: "UK",
    location: "London, England",
    type: "Public",
    qsRank: "#8 (2025)",
    acceptanceRate: "~14%",
    tuition: "GBP 9,250 (UK) / GBP 32,000-45,000 (international)",
    totalCost: "~GBP 45,000-60,000/year",
    roomBoard: "~GBP 12,000-16,000/year",
    financialAid:
      "Strong UK bursary support; international funding exists but is more limited and competitive.",
    scholarships: [
      "Imperial Bursary (UK)",
      "President's Undergraduate Scholarship",
      "Chevening (postgraduate)",
    ],
    admissionTypeAndDeadlines:
      "UCAS application. Standard deadline in January; Medicine deadline in October.",
    testRequirements:
      "High STEM requirements, usually A*AA-A*A*A or equivalent. Some courses require BMAT/PAT/TMUA or similar tests.",
    essaysAndRecommendations:
      "UCAS Personal Statement with strong STEM motivation + one UCAS academic reference.",
    extracurricularsAndInterview:
      "Hands-on STEM experience is valued. Interviews are common for Medicine and selected courses.",
    applicationFee: "UCAS fee",
    housing:
      "First-year accommodation usually guaranteed; later years are more competitive.",
    stepByStep: [
      "Choose target STEM course.",
      "Submit UCAS by required deadline.",
      "Prepare required admissions test(s).",
      "Build STEM-focused personal statement.",
      "Attend interview if requested.",
    ],
    undergraduateProgrammes: [
      "Mechanical Engineering",
      "Electrical and Electronic Engineering",
      "Chemical Engineering",
      "Civil Engineering",
      "Computing",
      "Mathematics",
      "Physics",
      "Biochemistry",
    ],
    graduateProgrammes: [
      "MSc Computing",
      "MSc Biomedical Engineering",
      "MBA",
      "MSc Applied Mathematics",
      "MSc Physics",
      "PhD STEM fields",
    ],
  },
  {
    slug: "ucl",
    name: "University College London (UCL)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Wilkins_Building%2C_University_College_London%2C_UK_-_20120201-02.jpg",
    region: "UK",
    location: "London, England",
    type: "Public",
    qsRank: "#9 (2025)",
    acceptanceRate: "~63% overall (lower for competitive courses)",
    tuition: "GBP 9,250 (UK) / GBP 22,000-35,000 (international)",
    totalCost: "~GBP 35,000-50,000/year",
    roomBoard: "~GBP 12,000-15,000/year",
    financialAid:
      "Widening access bursaries for UK students and selected scholarship opportunities for international students.",
    scholarships: [
      "Provost's Scholarship",
      "Denys Holland Scholarship",
      "Chevening and Commonwealth scholarships",
    ],
    admissionTypeAndDeadlines:
      "UCAS-based application. Medicine/Dentistry typically October deadline; most courses January deadline.",
    testRequirements:
      "A-level AAA-A*AA or equivalent. Selected courses need UCAT/LNAT or specific assessments.",
    essaysAndRecommendations:
      "UCAS Personal Statement and one academic reference.",
    extracurricularsAndInterview:
      "Course-relevant profile matters (especially for Medicine, Architecture, Fine Art). Interview required for selected courses.",
    applicationFee: "UCAS fee",
    housing:
      "First-year accommodation often guaranteed if deadlines are met.",
    stepByStep: [
      "Choose UCL programme in UCAS.",
      "Prepare Personal Statement aligned with course.",
      "Take required test (if applicable).",
      "Submit by course deadline.",
      "Complete interview/portfolio steps if requested.",
    ],
    undergraduateProgrammes: [
      "Law",
      "Medicine",
      "Architecture",
      "Computer Science",
      "Economics",
      "Psychology",
      "Engineering",
      "Neuroscience",
    ],
    graduateProgrammes: [
      "LLM",
      "MSc Computer Science",
      "MSc Economics",
      "MArch",
      "MBA",
      "PhD programmes",
    ],
  },
  {
    slug: "eth-zurich",
    name: "ETH Zurich",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/ETH_Z%C3%BCrich_-_Hauptgeb%C3%A4ude_-_Unispital_2012-07-30_07-57-03_ShiftN.jpg",
    region: "Europe",
    location: "Zurich, Switzerland",
    type: "Public",
    qsRank: "#7 (2025)",
    acceptanceRate: "~27%",
    tuition: "CHF 730/semester",
    totalCost: "~CHF 25,000-30,000/year",
    roomBoard: "~CHF 1,500-2,000/month in Zurich",
    financialAid:
      "Tuition is low compared to peer institutions; scholarships exist but are more common at master's level.",
    scholarships: [
      "ETH Excellence Scholarships (master's)",
      "Swiss Government Excellence Scholarships",
    ],
    admissionTypeAndDeadlines:
      "Direct application through ETH portal, usually with spring deadlines for autumn intake.",
    testRequirements:
      "Recognized diploma equivalent to Swiss Matura. Some applicants may need entrance/reduction exams.",
    essaysAndRecommendations:
      "Motivation letter can be requested for specific programmes; recommendation requirements vary by level.",
    extracurricularsAndInterview:
      "Admissions focus is highly academic and STEM-centric. Interview is uncommon at bachelor's level.",
    applicationFee: "CHF 150",
    housing:
      "WOKO and private market options; early housing application is essential due to demand.",
    stepByStep: [
      "Check diploma recognition for ETH admission.",
      "Apply through ETH portal before deadline.",
      "Prepare for possible entrance/reduction exam.",
      "Track decision and complete enrollment steps.",
      "Secure housing as soon as admitted.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Architecture",
      "Chemistry",
      "Mathematics",
      "Physics",
    ],
    graduateProgrammes: [
      "MSc Computer Science",
      "MSc Robotics",
      "MSc Data Science",
      "MSc Architecture",
      "MSc Environmental Engineering",
      "PhD STEM fields",
    ],
  },
];

export function getUniversityBySlug(slug: string) {
  return universities.find((university) => university.slug === slug);
}
