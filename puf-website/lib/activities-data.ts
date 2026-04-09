export interface Activity {
  slug: string;
  title: string;
  category: "conference" | "project" | "volunteering" | "summer-camp";
  country: string;
  city?: string;
  description: string;
  longDescription: string;
  startsAt: string; // YYYY-MM-DD
  endsAt: string; // YYYY-MM-DD
  deadline?: string; // YYYY-MM-DD
  applicationUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  tags: string[];
  participants?: string;
  ageRequirement?: string;
  costRange?: string;
  benefits: string[];
  targetAudience: string[];
}

export const activities: Activity[] = [
  {
    slug: "global-leaders-summit-2026",
    title: "Global Leaders Summit 2026",
    category: "conference",
    country: "Austria",
    city: "Vienna",
    description: "Annual summit bringing together young leaders from 50+ countries",
    longDescription:
      "The Global Leaders Summit is the premier forum for ambitious students to connect with peers, thought leaders, and organizational partners. Over 3 days, participants attend keynote speeches, panel discussions, and networking events focused on global challenges and opportunities. Previous attendees have gone on to leadership roles at top universities and organizations.",
    startsAt: "2026-06-15",
    endsAt: "2026-06-18",
    deadline: "2026-04-30",
    applicationUrl: "https://globalleaders.org/apply",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Vienna_skyline_autumn.jpg/1280px-Vienna_skyline_autumn.jpg",
    tags: ["Leadership", "Networking", "International"],
    participants: "500+",
    ageRequirement: "16-25",
    costRange: "$200-500",
    benefits: ["Leadership training", "International networking", "Certificate", "Mentorship"],
    targetAudience: ["High School Students", "Undergraduates", "Young Professionals"],
  },
  {
    slug: "international-science-fair-2026",
    title: "International Science Fair 2026",
    category: "project",
    country: "Switzerland",
    city: "Geneva",
    description: "Showcase your STEM research to a global audience of scientists and peers",
    longDescription:
      "The International Science Fair brings together young scientists from across the globe to present cutting-edge research. Participants compete for awards and scholarships. Categories range from biology and chemistry to robotics and environmental science. Winning projects gain international recognition and publication opportunities.",
    startsAt: "2026-07-10",
    endsAt: "2026-07-14",
    deadline: "2026-05-15",
    applicationUrl: "https://sciencefair.org/register",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Science_and_industry_museum_manchester.jpg/1280px-Science_and_industry_museum_manchester.jpg",
    tags: ["STEM", "Research", "Competition"],
    participants: "300+",
    ageRequirement: "14-22",
    costRange: "Free-200",
    benefits: ["Publication opportunity", "Prizes", "Scholarship eligibility", "Portfolio builder"],
    targetAudience: ["STEM Students", "Researchers", "Science Enthusiasts"],
  },
  {
    slug: "tech-internship-summer-2026",
    title: "Tech Internship Program Summer 2026",
    category: "summer-camp",
    country: "Multiple",
    description: "Paid summer internships at leading tech companies - Remote & On-site",
    longDescription:
      "Top tech companies worldwide are hiring interns for summer 2026. This program includes hands-on project experience, mentorship from senior engineers, networking events, and potential return offers. Interns work on real products affecting millions of users. Perfect for building portfolio and industry connections.",
    startsAt: "2026-06-01",
    endsAt: "2026-08-31",
    deadline: "2026-04-15",
    applicationUrl: "https://techintern.org/apply",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Smartphone_app_developer.jpg/1280px-Smartphone_app_developer.jpg",
    tags: ["Technology", "Internship", "Career Development"],
    participants: "Varies",
    ageRequirement: "18+",
    costRange: "$0-500/month paid",
    benefits: ["Salary", "Mentorship", "Experience", "Return offer potential"],
    targetAudience: ["CS Students", "Engineering Students", "Tech Enthusiasts"],
  },
  {
    slug: "community-service-project-romania",
    title: "Community Service Project - Romania",
    category: "volunteering",
    country: "Romania",
    city: "Multiple Cities",
    description: "Summer volunteering - help rural communities with education and development",
    longDescription:
      "Join our international volunteer program across Romania. Volunteers teach English, help with infrastructure projects, and support local initiatives. Great opportunity to practice social responsibility, build leadership skills, and create meaningful impact. Housing and meals provided.",
    startsAt: "2026-07-01",
    endsAt: "2026-08-31",
    deadline: "2026-05-30",
    applicationUrl: "https://volunteerromania.org/apply",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Volunteering.jpg/1280px-Volunteering.jpg",
    tags: ["Volunteering", "Social Impact", "Leadership"],
    participants: "100+",
    ageRequirement: "16+",
    costRange: "Free (housing included)",
    benefits: ["Leadership experience", "Social impact", "Cultural exchange", "Certificate"],
    targetAudience: ["All Students", "Social Activists", "Humanitarian Workers"],
  },
  {
    slug: "hackathon-innovation-2026",
    title: "Hackathon Innovation 2026",
    category: "project",
    country: "Germany",
    city: "Berlin",
    description: "48-hour coding marathon with $50K in prizes - Build solutions for real problems",
    longDescription:
      "Join 1000+ developers and designers at Europe's largest hackathon. Teams of 3-4 build prototypes to solve real-world challenges. Mentors from top companies guide participants. Winning teams get prizes, investor meetings, and startup funding opportunities. Ideal for portfolio building and tech networking.",
    startsAt: "2026-09-18",
    endsAt: "2026-09-20",
    deadline: "2026-08-20",
    applicationUrl: "https://hackathon-innovation.eu/register",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hackathon_participants.jpg/1280px-Hackathon_participants.jpg",
    tags: ["Hackathon", "Coding", "Innovation"],
    participants: "1000+",
    ageRequirement: "18+",
    costRange: "Free",
    benefits: ["Prizes ($50K)", "Networking", "Mentorship", "Startup opportunities"],
    targetAudience: ["Tech Students", "Developers", "Entrepreneurs"],
  },
  {
    slug: "language-immersion-summer-2026",
    title: "Language Immersion Summer - Multiple Countries",
    category: "summer-camp",
    country: "Spain/France/Germany",
    description: "Intensive language programs combined with cultural experiences",
    longDescription:
      "Spend 4 weeks immersed in a new language with daily classes, homestays, and cultural activities. Choose from Spanish in Barcelona, French in Paris, or German in Berlin. Achieve official certifications and fluency. Perfect for studying abroad preparation and CV enhancement.",
    startsAt: "2026-07-01",
    endsAt: "2026-08-31",
    deadline: "2026-05-15",
    applicationUrl: "https://immersion-lang.com/apply",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/1280px-Camponotus_flavomarginatus_ant.jpg",
    tags: ["Language Learning", "Summer Camp", "Cultural Exchange"],
    participants: "200+ per location",
    ageRequirement: "15+",
    costRange: "$1200-2000",
    benefits: ["Language certification", "Cultural experience", "Homestay", "Networking"],
    targetAudience: ["Language Learners", "Future Study Abroad Students", "All Ages"],
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug);
}

export function getActivitiesByCategory(category: Activity["category"]): Activity[] {
  return activities.filter((activity) => activity.category === category);
}

export function getActivitiesByCountry(country: string): Activity[] {
  return activities.filter((activity) => activity.country.toLowerCase().includes(country.toLowerCase()));
}
