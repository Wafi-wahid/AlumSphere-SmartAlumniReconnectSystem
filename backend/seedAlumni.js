import mongoose from "mongoose";
import dotenv from "dotenv";
import Alumni from "./models/Alumni.js"; // <-- make sure path is correct

dotenv.config();

// 🔹 connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ Connection error:", err));

// 🔹 your existing alumni static array
const alumniData = [
 {
    name: "Maria Kiran",
    class: "Fall 2022",
    major: "Software Engineer",
    role: "Senior Web developer",
    company: "Microsoft",
    location: "Islamabad, Pakistan",
    description:
      "Passionate about building scalable web applications and mentoring junior developers.",
    skills: ["React", "Python", "React Native"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdLTh97PzuM7QR8Wvu81hw3rplxVpZkTRw-vnNGTm784xphL-aeAQGnID42mTfukG6jcE&usqp=CAU",
    available: true,
  },
  {
    name: "Jaweriya Khan",
    class: "Fall 2022",
    major: "Software Engineering",
    role: "Frontend Developer",
    company: "Systems Limited",
    location: "Lahore, Pakistan",
    description:
      "Passionate about crafting responsive UI/UX and improving user experience.",
    skills: ["React", "JavaScript", "CSS"],
    image: "https://snapynow.com/wp-content/uploads/unique-dp-for-girls_7.webp",
    available: false,
  },
  {
    name: "Hassan Raza",
    class: "Fall 2022",
    major: "Software Engineering",
    role: "Full Stack Developer",
    company: "NETSOL Technologies",
    location: "Lahore, Pakistan",
    description:
      "Works on scalable full-stack web apps and cloud-based systems.",
    skills: ["React", "Node.js", "AWS"],
    image: "https://media.istockphoto.com/id/495700524/photo/concept-for-student-graduation-day.jpg?s=612x612&w=0&k=20&c=auvS1Trtay2SYhONqD-8KJLWLS1iiDt9P4e0qUJYRkU=",
    available: true,
  },
  {
    name: "Ume Rubab Malik",
    class: "Fall 2022",
    major: "Information Technology",
    role: "UI/UX Designer",
    company: "Techlogix",
    location: "Rawalpindi, Pakistan",
    description:
      "Designs clean and accessible interfaces for web and mobile platforms.",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGhkwZU59FduJioGGXWQ6yOjWx-iHXpyMUwQ&s",
    available: false,
  },
  {
    name: "Wafi Wahid",
    class: "Fall 2022",
    major: "Computer Science",
    role: "Backend Engineer",
    company: "10Pearls",
    location: "Islamabad, Pakistan",
    description:
      "Focused on scalable backend systems and API integration using Node.js.",
    skills: ["Node.js", "MongoDB", "Express"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYs1rh_0WCPG8N1Oby0zlpPBfp9G9Ls8Pqww&s",
    available: true,
  },
  {
    name: "Arisha Noor",
    class: "Fall 2022",
    major: "Data Science",
    role: "Data Analyst",
    company: "Careem",
    location: "Karachi, Pakistan",
    description:
      "Analyzing large datasets to drive business insights and optimize performance.",
    skills: ["Python", "Power BI", "SQL"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt502F01zFHBKGODXAF3DbwYR0ggrYeCQEA&s",
    available: false,
  },
  {
    name: "Usman Khalid",
    class: "Fall 2022",
    major: "Electrical Engineering",
    role: "Project Engineer",
    company: "Siemens Pakistan",
    location: "Karachi, Pakistan",
    description:
      "Manages electrical automation projects and system implementation.",
    skills: ["AutoCAD", "PLC", "Team Coordination"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTmb3DvByna5k-BvH8jjjrMhPmDuuBKOsQyA&s",
    available: true,
  },
  {
    name: "Minal Fatima",
    class: "Fall 2022",
    major: "Artificial Intelligence",
    role: "Machine Learning Engineer",
    company: "VisionX",
    location: "Multan, Pakistan",
    description:
      "Develops predictive models and AI-driven recommendation systems.",
    skills: ["TensorFlow", "Python", "ML Algorithms"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQKYrPAyja79UqRKT8rpWv_sYOQtBNlGepw&s",
    available: false,
  },
  {
    name: "Bilal Ahmed",
    class: "Fall 2022",
    major: "Computer Science",
    role: "DevOps Engineer",
    company: "TPL Corp",
    location: "Lahore, Pakistan",
    description:
      "Automates deployment pipelines and manages cloud infrastructure.",
    skills: ["Docker", "CI/CD", "Linux"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-fcas3lPjcLH8J8zqDcyrsFAN-zJuYBIqqg&s",
    available: true,
  },
  {
    name: "Laiba Noor",
    class: "Fall 2022",
    major: "Cybersecurity",
    role: "Security Analyst",
    company: "Inbox Business Technologies",
    location: "Islamabad, Pakistan",
    description:
      "Monitors network security and ensures data protection across digital systems.",
    skills: ["Network Security", "Firewalls", "Ethical Hacking"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB9Blk3Ns9qMQSZ0gJeQIlPWOvxOUjS0It9Q&s",
    available: false,
  },
  {
    name: "Sara Imtiaz",
    class: "Fall 2022",
    major: "Media Studies",
    role: "Content Producer",
    company: "ARY Digital Network",
    location: "Karachi, Pakistan",
    description:
      "Creates engaging multimedia content for broadcast and social platforms.",
    skills: ["Video Editing", "Storytelling", "Script Writing"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYkhzMLqO2CsDLzObPL6MIP0njxkO18ipYNx8ewgNnNdNf5mv6RiJJFgtTsYuEeP91jc&usqp=CAU",
    available: true,
  },
  {
    name: "Areeba Saleem",
    class: "Fall 2022",
    major: "Business Administration",
    role: "Marketing Coordinator",
    company: "Jazz Pakistan",
    location: "Rawalpindi, Pakistan",
    description:
      "Handles campaigns and brand strategy for digital marketing initiatives.",
    skills: ["SEO", "Digital Marketing", "Communication"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa05JFli7CvbqnLOI1HIOWbp-LSXoYCGrOaw&s",
    available: false,
  },
  // 🟡 add the rest of your static alumni here
];

// 🔹 clear existing data & insert new
const seedData = async () => {
  try {
    await Alumni.deleteMany(); // remove old records (optional)
    await Alumni.insertMany(alumniData);
    console.log("🎉 Alumni data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

seedData();
