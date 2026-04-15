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
  {
    slug: "university-of-bucharest",
    name: "University of Bucharest",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Palatul_Universit%C4%83%C8%9Bii_din_Bucure%C8%99ti.jpg",
    region: "Romania",
    location: "Bucharest, Romania",
    type: "Public",
    qsRank: "Top 1000 QS",
    acceptanceRate: "~30-80% (varies by faculty)",
    tuition: "State-funded seats or ~3,500-6,000 RON/year",
    totalCost: "~3,500-6,000 RON/year tuition + living costs",
    roomBoard: "~200-400 RON/month (dorm, limited spots)",
    financialAid:
      "Merit and social scholarships are available; Erasmus+ mobility support is common.",
    scholarships: [
      "Merit scholarships",
      "Social scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Admission by faculty (file-based or exam-based). Main round in July, with some faculties offering a September round.",
    testRequirements:
      "Baccalaureate required; some faculties require additional exams (for example Law or Psychology).",
    essaysAndRecommendations:
      "Usually no essay-centric process; required documents include diploma records and enrollment file.",
    extracurricularsAndInterview:
      "Portfolio/interview is faculty-dependent and more common in selective tracks.",
    applicationFee: "Faculty-dependent admission fee",
    housing:
      "Student dormitories are available but competitive; early application is recommended.",
    stepByStep: [
      "Choose faculty and verify admission method on unibuc.ro.",
      "Create an admission account and submit documents.",
      "Sit faculty exam if required.",
      "Check results and confirm place by deadline.",
      "Apply for dorm accommodation early.",
    ],
    undergraduateProgrammes: [
      "Law",
      "Letters",
      "Physics",
      "Chemistry",
      "Biology",
      "Psychology",
      "Political Science",
      "Mathematics and Computer Science",
    ],
    graduateProgrammes: [
      "MA Law",
      "MA International Relations",
      "MSc Physics",
      "MSc Chemistry",
      "MSc Biology",
      "MA Psychology",
    ],
  },
  {
    slug: "babes-bolyai-university",
    name: "Babes-Bolyai University (UBB)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/84/Universitatea_Babes-Bolyai%2C_Cluj-Napoca.jpg",
    region: "Romania",
    location: "Cluj-Napoca, Romania",
    type: "Public",
    qsRank: "Top 1000 QS",
    acceptanceRate: "~40-75%",
    tuition: "State-funded seats or ~3,000-7,000 RON/year",
    totalCost: "~3,000-8,000 RON/year tuition + living costs",
    roomBoard: "~350-500 RON/month",
    financialAid:
      "Performance and social aid scholarships plus Erasmus+ funding options.",
    scholarships: [
      "Performance scholarships",
      "Social scholarships",
      "UBB excellence scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Faculty-based admission with a main July round and a secondary September round.",
    testRequirements:
      "Baccalaureate required; some faculties use written/oral exams, others file-based ranking.",
    essaysAndRecommendations:
      "Admissions are mostly exam/file-driven rather than essay-driven.",
    extracurricularsAndInterview:
      "Portfolio or interviews may apply for arts and selected programs.",
    applicationFee: "Faculty-dependent admission fee",
    housing:
      "Modern dorm network, but capacity is limited and demand is high.",
    stepByStep: [
      "Review faculty requirements at ubbcluj.ro.",
      "Open account on the admission platform.",
      "Submit required documents and exam preferences.",
      "Take any required exam/interview.",
      "Confirm place and apply for dorm housing.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Economics",
      "Law",
      "Psychology",
      "Political Science",
      "Biology",
      "Theology",
      "Business Administration",
    ],
    graduateProgrammes: [
      "MSc Computer Science",
      "MSc Economics",
      "MA Psychology",
      "MA International Studies",
      "MBA tracks",
      "PhD programmes",
    ],
  },
  {
    slug: "national-university-of-science-and-technology-politehnica-bucharest",
    name: "Politehnica Bucharest",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Universitatea_Politehnica_din_Bucuresti.jpg",
    region: "Romania",
    location: "Bucharest, Romania",
    type: "Public",
    qsRank: "Top 1200 QS",
    acceptanceRate: "~60-90% (lower for Computer Science)",
    tuition: "State-funded seats or ~4,500-6,000 RON/year",
    totalCost: "~4,500-6,000 RON/year tuition + living costs",
    roomBoard: "~250-400 RON/month",
    financialAid:
      "Merit/social scholarships and corporate partnerships in tech fields.",
    scholarships: [
      "Merit scholarships",
      "Social scholarships",
      "Industry-backed scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Main admission in July, often with a September second round for remaining seats.",
    testRequirements:
      "Baccalaureate required; many faculties admit via weighted BAC scores, while some tracks have specific filters.",
    essaysAndRecommendations:
      "Admissions are primarily grades/exam-based; essays are usually not central.",
    extracurricularsAndInterview:
      "Technical competitions and STEM projects strengthen competitive applications.",
    applicationFee: "Enrollment fee required by faculty",
    housing:
      "Large dorm network with competitive placement for first years.",
    stepByStep: [
      "Choose faculty and specialization at upb.ro.",
      "Register in the online admission portal.",
      "Submit baccalaureate and academic records.",
      "Follow ranking lists and confirm your seat.",
      "Apply for campus accommodation.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Automatic Control",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Energy Engineering",
      "Civil Engineering",
      "Electronics",
      "Applied Mathematics",
    ],
    graduateProgrammes: [
      "MSc Artificial Intelligence",
      "MSc Cybersecurity",
      "MSc Energy Systems",
      "MSc Robotics",
      "MSc Telecommunications",
      "PhD Engineering",
    ],
  },
  {
    slug: "carol-davila-university-of-medicine-and-pharmacy",
    name: "Carol Davila University of Medicine and Pharmacy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Carol_Davila_University_of_Medicine_and_Pharmacy.jpg",
    region: "Romania",
    location: "Bucharest, Romania",
    type: "Public",
    qsRank: "Top specialized",
    acceptanceRate: "~25-35% (Medicine is highly competitive)",
    tuition: "~6,000-10,000 RON/year (varies by seat type)",
    totalCost: "~6,000-10,000 RON/year tuition + living costs",
    roomBoard: "~350-450 RON/month",
    financialAid:
      "Merit and social scholarships; limited mobility funding for medical tracks.",
    scholarships: [
      "Merit scholarships",
      "Social scholarships",
      "Erasmus+ grants",
      "Medical NGO scholarships",
    ],
    admissionTypeAndDeadlines:
      "Highly competitive faculty-run admission with summer intake and strict calendar.",
    testRequirements:
      "Dedicated multiple-choice entrance exam (typically Biology plus Chemistry) for core medicine tracks.",
    essaysAndRecommendations:
      "Admissions are exam-intensive, with formal document checks and medical fitness documentation.",
    extracurricularsAndInterview:
      "Research, volunteering and clinical exposure can help, but exam performance is decisive.",
    applicationFee: "Faculty-set admission fee",
    housing:
      "Dorms available but limited; immediate application after admission is recommended.",
    stepByStep: [
      "Download updated exam syllabus from umfcd.ro.",
      "Register online and upload required documents.",
      "Prepare Biology and Chemistry intensively.",
      "Sit the entrance exam.",
      "Confirm place and apply for accommodation quickly.",
    ],
    undergraduateProgrammes: [
      "Medicine",
      "Dentistry",
      "Pharmacy",
      "Nursing",
      "Midwifery",
      "Radiology and Medical Imaging",
    ],
    graduateProgrammes: [
      "Medical Residency Tracks",
      "Master in Public Health",
      "Master in Biomedical Sciences",
      "Doctoral School in Medicine",
    ],
  },
  {
    slug: "alexandru-ioan-cuza-university",
    name: "Alexandru Ioan Cuza University (UAIC)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Universitatea_Alexandru_Ioan_Cuza_din_Iasi.jpg",
    region: "Romania",
    location: "Iasi, Romania",
    type: "Public",
    qsRank: "Top 1000 QS",
    acceptanceRate: "~50-80%",
    tuition: "State-funded seats or ~2,500-5,500 RON/year",
    totalCost: "~2,500-5,500 RON/year tuition + living costs",
    roomBoard: "~200-350 RON/month",
    financialAid:
      "Merit/social scholarships and Erasmus+ are available across faculties.",
    scholarships: [
      "Merit scholarships",
      "Social scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Main July round with possible September round depending on available seats.",
    testRequirements:
      "Baccalaureate mandatory; some faculties use dedicated exams while others use file-based ranking.",
    essaysAndRecommendations:
      "Admissions generally rely on grades/exams and required official documents.",
    extracurricularsAndInterview:
      "Interviews/tests are faculty-specific and more common in selective fields.",
    applicationFee: "Faculty-dependent",
    housing:
      "Wide dorm network with strong demand in peak admission periods.",
    stepByStep: [
      "Choose faculty and review requirements at uaic.ro.",
      "Submit online application and documents.",
      "Attend faculty exam if required.",
      "Check admission list and confirm seat.",
      "Apply for dorm allocation.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Law",
      "Economics",
      "Biology",
      "Chemistry",
      "Physics",
      "Letters",
      "Philosophy",
    ],
    graduateProgrammes: [
      "MSc Computer Science",
      "MA Law",
      "MSc Biology",
      "MSc Chemistry",
      "MA International Relations",
      "PhD programmes",
    ],
  },
  {
    slug: "west-university-of-timisoara",
    name: "West University of Timisoara (UVT)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/West_University_of_Timisoara.jpg",
    region: "Romania",
    location: "Timisoara, Romania",
    type: "Public",
    qsRank: "Top 1200 QS",
    acceptanceRate: "~55-85%",
    tuition: "State-funded seats or ~2,500-5,000 RON/year",
    totalCost: "~2,500-5,000 RON/year tuition + living costs",
    roomBoard: "~250-400 RON/month",
    financialAid:
      "Merit and social scholarships, Erasmus+ mobility and international exchange support.",
    scholarships: [
      "Merit scholarships",
      "Social scholarships",
      "Erasmus+ grants",
      "Institutional excellence scholarships",
    ],
    admissionTypeAndDeadlines:
      "Admissions in July-August, with faculty-specific calendars and optional practical tests.",
    testRequirements:
      "Baccalaureate required; practical exams may apply for arts, music and sports tracks.",
    essaysAndRecommendations:
      "Standard file-based process for most faculties, with special requirements in performance-oriented programs.",
    extracurricularsAndInterview:
      "Portfolio, audition or physical tests can be required for specific programs.",
    applicationFee: "Faculty-dependent",
    housing:
      "Student dorms available with moderate costs and limited slots.",
    stepByStep: [
      "Review faculty offer at uvt.ro.",
      "Register in the admission platform.",
      "Upload documents and required proofs.",
      "Take practical exam where applicable.",
      "Confirm place and request dorm housing.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Law",
      "Economics",
      "Biology",
      "Chemistry",
      "Arts",
      "Music",
      "Sports Science",
    ],
    graduateProgrammes: [
      "MSc Computer Science",
      "MA Law",
      "MSc Economics",
      "MA Performing Arts",
      "MSc Biology",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-amsterdam",
    name: "University of Amsterdam (UvA)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/University_of_Amsterdam_logo.svg",
    region: "Europe",
    location: "Amsterdam, Netherlands",
    type: "Public",
    qsRank: "#53 (2024)",
    acceptanceRate: "~45-60%",
    tuition: "EU/EEA ~EUR 2,314; non-EU ~EUR 10,000-20,000/year",
    totalCost: "~EUR 12,000-30,000/year plus housing",
    roomBoard: "~EUR 600-1,200/month",
    financialAid:
      "EU tuition support structure plus selected international scholarships.",
    scholarships: [
      "Holland Scholarship",
      "UvA Excellence Scholarships",
      "Orange Tulip Scholarship",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Application through Studielink and UvA systems; strict deadlines by citizenship and programme.",
    testRequirements:
      "English proficiency (IELTS/TOEFL) is standard; selected programmes may require additional assessments.",
    essaysAndRecommendations:
      "Motivation letter and programme-specific documents are common.",
    extracurricularsAndInterview:
      "Interview or aptitude checks may apply in selective programmes.",
    applicationFee: "~EUR 100 (programme-dependent)",
    housing:
      "Housing is highly competitive and should be arranged immediately after admission.",
    stepByStep: [
      "Create account in Studielink and apply to programme.",
      "Upload diploma, transcripts and language proof.",
      "Submit motivation and any required portfolio.",
      "Track decision in UvA portal.",
      "Apply for housing as soon as admitted.",
    ],
    undergraduateProgrammes: [
      "Economics",
      "Law",
      "Psychology",
      "Communication Science",
      "Political Science",
      "Business Administration",
      "Media and Culture",
      "Computer Science",
    ],
    graduateProgrammes: [
      "MSc Data Science",
      "MSc AI",
      "MSc Economics",
      "LLM programmes",
      "MSc Psychology",
      "Research Master programmes",
    ],
  },
  {
    slug: "technical-university-of-munich",
    name: "Technical University of Munich (TUM)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/Technische_Universit%C3%A4t_M%C3%BCnchen_Logo.svg",
    region: "Europe",
    location: "Munich, Germany",
    type: "Public",
    qsRank: "#37 (2024)",
    acceptanceRate: "~35-55%",
    tuition: "Mostly low-fee public model plus semester contributions",
    totalCost: "Low tuition model + Munich living costs",
    roomBoard: "~EUR 300-600/month student housing; private usually higher",
    financialAid:
      "German and EU scholarship options plus DAAD and Erasmus pathways.",
    scholarships: [
      "Deutschlandstipendium",
      "DAAD scholarships",
      "TUM merit scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Programme-specific application cycles through TUM and sometimes Uni-Assist.",
    testRequirements:
      "Language proof (German or English) and programme-specific academic requirements; some tracks use interviews/tests.",
    essaysAndRecommendations:
      "Motivation statements and academic records are common; GRE may be requested for selected graduate tracks.",
    extracurricularsAndInterview:
      "Interview rounds are used in selected programmes, especially graduate and competitive tracks.",
    applicationFee: "Administrative and processing fees may apply",
    housing:
      "Student housing is limited and waiting times can be long in Munich.",
    stepByStep: [
      "Verify diploma recognition and programme requirements.",
      "Apply in TUM portal (and Uni-Assist when required).",
      "Upload language certificates and academic documents.",
      "Complete interview/test if invited.",
      "Accept offer and arrange housing early.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Architecture",
      "Mathematics",
      "Physics",
      "Business and Technology",
      "Sports Science",
    ],
    graduateProgrammes: [
      "MSc Informatics",
      "MSc Robotics",
      "MSc Data Engineering",
      "MSc Aerospace",
      "MSc Management and Technology",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-bologna",
    name: "University of Bologna",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Universit%C3%A0_di_Bologna_stemma.svg",
    region: "Europe",
    location: "Bologna, Italy",
    type: "Public",
    qsRank: "#154 (2024)",
    acceptanceRate: "~40-65%",
    tuition: "EU income-based model; international tuition varies by programme",
    totalCost: "Moderate tuition + Bologna living costs",
    roomBoard: "~EUR 200-900/month depending on housing type",
    financialAid:
      "Regional scholarships and Erasmus opportunities are significant.",
    scholarships: [
      "ER.GO scholarships",
      "Regional scholarships",
      "Italian government scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Multi-session admissions with programme-specific cycles through the university portal.",
    testRequirements:
      "Language certification (Italian or English) and programme-specific tests where applicable.",
    essaysAndRecommendations:
      "Motivation letters and certified academic documents are commonly required.",
    extracurricularsAndInterview:
      "Interviews/portfolio may apply in selected tracks.",
    applicationFee: "Application fee may apply by programme",
    housing:
      "Public student residence options exist but private market is often needed.",
    stepByStep: [
      "Choose programme on unibo.it and review deadlines.",
      "Prepare translated and legalized academic documents.",
      "Submit language certificates and supporting documents.",
      "Complete programme tests/interviews if requested.",
      "Finalize enrollment and secure accommodation.",
    ],
    undergraduateProgrammes: [
      "Law",
      "Medicine",
      "Engineering",
      "Political Science",
      "Economics",
      "Arts and Humanities",
      "Computer Science",
      "Biology",
    ],
    graduateProgrammes: [
      "MSc Economics",
      "MSc Engineering",
      "MSc Computer Science",
      "MA International Relations",
      "MSc Biomedical Sciences",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-copenhagen",
    name: "University of Copenhagen",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/University_of_Copenhagen_seal.svg",
    region: "Europe",
    location: "Copenhagen, Denmark",
    type: "Public",
    qsRank: "#121 (2024)",
    acceptanceRate: "~40-55%",
    tuition: "EU/EEA tuition-free; non-EU tuition applies by programme",
    totalCost: "Tuition policy by citizenship + high Copenhagen living costs",
    roomBoard: "~DKK 3,000-5,000/month typical student housing",
    financialAid:
      "Scholarship options exist for international students plus Erasmus pathways.",
    scholarships: [
      "Danish government scholarships",
      "GSST scholarships",
      "Erasmus+ grants",
    ],
    admissionTypeAndDeadlines:
      "Different windows for EU and non-EU applicants with strict portal-based processing.",
    testRequirements:
      "English proficiency and programme-specific entry requirements; selected master's tracks may require extra tests.",
    essaysAndRecommendations:
      "Motivation letter and reference requirements vary by faculty.",
    extracurricularsAndInterview:
      "Interviews are programme-dependent and more common in selective tracks.",
    applicationFee: "Programme-dependent",
    housing:
      "Student housing allocation is limited; early registration is important.",
    stepByStep: [
      "Review programme criteria on ku.dk.",
      "Prepare language certification and transcripts.",
      "Submit application in the correct EU/non-EU window.",
      "Complete additional tests/interview if required.",
      "Apply for housing immediately after admission.",
    ],
    undergraduateProgrammes: [
      "Medicine",
      "Law",
      "Natural Sciences",
      "Social Sciences",
      "Theology",
      "Humanities",
      "Biology",
      "Computer Science",
    ],
    graduateProgrammes: [
      "MSc Data Science",
      "MSc Biology",
      "MSc Public Health",
      "LLM programmes",
      "MSc Economics",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-edinburgh",
    name: "University of Edinburgh",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/The_University_of_Edinburgh_Logo.svg",
    region: "UK",
    location: "Edinburgh, Scotland",
    type: "Public",
    qsRank: "#27 (2024)",
    acceptanceRate: "~35-45%",
    tuition: "UK and international tuition vary by programme",
    totalCost: "Tuition + Edinburgh living costs",
    roomBoard: "~GBP 600-1,100/month",
    financialAid:
      "Institutional, Commonwealth and global scholarships available by programme.",
    scholarships: [
      "Think Big Scholarship",
      "Edinburgh Global Scholarships",
      "Commonwealth scholarships",
    ],
    admissionTypeAndDeadlines:
      "UCAS undergraduate cycle (with medicine/vet earlier deadlines) and direct postgraduate applications.",
    testRequirements:
      "Strong school profile plus IELTS/TOEFL for international applicants; some programmes need portfolio/interview.",
    essaysAndRecommendations:
      "UCAS personal statement and academic references are standard for undergraduate applicants.",
    extracurricularsAndInterview:
      "Programme-specific portfolios/interviews may be required in creative or professional tracks.",
    applicationFee: "UCAS fee for undergraduate",
    housing:
      "Strong accommodation support for first-year students, subject to deadlines.",
    stepByStep: [
      "Apply through UCAS for undergraduate programmes.",
      "Submit language proof and references.",
      "Complete portfolio/interview where requested.",
      "Accept offer and complete enrollment steps.",
      "Apply for university accommodation.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Medicine",
      "Law",
      "Engineering",
      "Philosophy",
      "Biological Sciences",
      "Economics",
      "Arts and Humanities",
    ],
    graduateProgrammes: [
      "MSc AI",
      "MSc Data Science",
      "LLM",
      "MSc Public Health",
      "MBA",
      "PhD programmes",
    ],
  },
  {
    slug: "university-of-california-berkeley",
    name: "University of California, Berkeley",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Seal_of_University_of_California%2C_Berkeley.svg/512px-Seal_of_University_of_California%2C_Berkeley.svg.png",
    region: "USA",
    location: "Berkeley, CA",
    type: "Public",
    qsRank: "#12 (2024)",
    acceptanceRate: "~14% overall (lower in competitive majors)",
    tuition: "In-state ~USD 14,000; out-of-state/international higher",
    totalCost: "~USD 35,000-65,000/year depending on residency",
    roomBoard: "~USD 18,000-22,000/year",
    financialAid:
      "State/federal aid for eligible students plus merit-based campus awards.",
    scholarships: [
      "Regents' and Chancellor's Scholarship",
      "UC Blue and Gold Opportunity Plan",
      "Departmental scholarships",
    ],
    admissionTypeAndDeadlines:
      "Single UC application cycle, typically October-November window without early action.",
    testRequirements:
      "Holistic review with strong GPA and coursework rigor; English tests required for many international applicants.",
    essaysAndRecommendations:
      "UC Personal Insight Questions are central to application evaluation.",
    extracurricularsAndInterview:
      "Academic impact, projects, leadership and context are important in holistic review.",
    applicationFee: "UC application fee per campus",
    housing:
      "First-year housing support is stronger than upper-year availability.",
    stepByStep: [
      "Create account on the UC application portal.",
      "Select Berkeley and your intended major.",
      "Complete Personal Insight Questions and activity list.",
      "Submit by the UC deadline window.",
      "Track decision and housing timeline.",
    ],
    undergraduateProgrammes: [
      "Computer Science",
      "Electrical Engineering",
      "Economics",
      "Business Administration",
      "Psychology",
      "Political Science",
      "Data Science",
      "Environmental Science",
    ],
    graduateProgrammes: [
      "MS Computer Science",
      "MEng programmes",
      "MBA",
      "MPH",
      "MPP",
      "PhD programmes",
    ],
  },
  {
    slug: "new-york-university",
    name: "New York University (NYU)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/New_York_University_Seal.svg",
    region: "USA",
    location: "New York, NY",
    type: "Private",
    qsRank: "#39 (2024)",
    acceptanceRate: "~13-16%",
    tuition: "~USD 60,000/year",
    totalCost: "~USD 82,000/year including NYC living costs",
    roomBoard: "~USD 12,000-18,000/year",
    financialAid:
      "Need-based aid and limited merit scholarships, with substantial use of external scholarships.",
    scholarships: [
      "NYU need-based aid",
      "Albert Gallatin Scholars",
      "Merit scholarships by school",
    ],
    admissionTypeAndDeadlines:
      "Common App/Coalition with Early Decision and Regular Decision options.",
    testRequirements:
      "Test policy varies by cycle; TOEFL/IELTS generally required for many international applicants.",
    essaysAndRecommendations:
      "Application essay plus school/program supplements and recommendations.",
    extracurricularsAndInterview:
      "Portfolio/interview can apply for arts and selective professional schools.",
    applicationFee: "Common App application fee",
    housing:
      "Strong first-year housing availability; upper-year students often rent privately in NYC.",
    stepByStep: [
      "Choose school/program (e.g., Stern, Tisch, CAS).",
      "Apply via Common App or Coalition App.",
      "Submit essays, recommendations and test/language results.",
      "Upload portfolio where required.",
      "Track admission decision and housing forms.",
    ],
    undergraduateProgrammes: [
      "Business",
      "Film and Television",
      "Computer Science",
      "Economics",
      "Psychology",
      "Media and Communication",
      "International Relations",
      "Performing Arts",
    ],
    graduateProgrammes: [
      "MBA",
      "MS Data Science",
      "MA International Affairs",
      "LLM",
      "MFA Film",
      "PhD programmes",
    ],
  },
];

export function getUniversityBySlug(slug: string) {
  return universities.find((university) => university.slug === slug);
}
