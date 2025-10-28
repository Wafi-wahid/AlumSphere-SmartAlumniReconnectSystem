import React, { useState } from "react";
import AlumniCard from "./AlumniCard";
import SearchBar from "./SearchBar";
import "./AlumniList.css";

const alumniData = [
  { id: "alumni_001", name: "Maria Kiran", class: "Fall 2025", major: "Software Engineering", role: "Senior Web Developer", company: "Microsoft", location: "Islamabad, Pakistan", description: "Passionate about building scalable web applications and mentoring junior developers.", skills: ["React", "Python", "React Native"], email: "maria.kiran@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdLTh97PzuM7QR8Wvu81hw3rplxVpZkTRw-vnNGTm784xphL-aeAQGnID42mTfukG6jcE&usqp=CAU" },
  { id: "alumni_002", name: "Jaweriya Khan", class: "Spring 2021", major: "Software Engineering", role: "Frontend Developer", company: "Systems Limited", location: "Lahore, Pakistan", description: "Passionate about crafting responsive UI/UX and improving user experience.", skills: ["React", "JavaScript", "CSS"], email: "jaweriya.khan098@gmail.com", image: "https://snapynow.com/wp-content/uploads/unique-dp-for-girls_7.webp" },
  { id: "alumni_003", name: "Hassan Raza", class: "Fall 2010", major: "Software Engineering", role: "Full Stack Developer", company: "NETSOL Technologies", location: "Lahore, Pakistan", description: "Works on scalable full-stack web apps and cloud-based systems.", skills: ["React", "MongoDB", "Express"], email: "razahass@gmail.com", image: "https://media.istockphoto.com/id/495700524/photo/concept-for-student-graduation-day.jpg?s=612x612&w=0&k=20&c=auvS1Trtay2SYhONqD-8KJLWLS1iiDt9P4e0qUJYRkU=" },
  { id: "alumni_004", name: "Ume Rubab Malik", class: "Spring 2012", major: "Information Technology", role: "UI/UX Designer", company: "Techlogix", location: "Rawalpindi, Pakistan", description: "Designs clean and accessible interfaces for web and mobile platforms.", skills: ["Figma", "Adobe XD"], email: "umerubab786@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGhkwZU59FduJioGGXWQ6yOjWx-iHXpyMUwQ&s" },
  { id: "alumni_005", name: "Wafi Wahid", class: "Spring 2025", major: "Computer Science", role: "Backend Engineer", company: "10Pearls", location: "Islamabad, Pakistan", description: "Focused on scalable backend systems and API integration using Node.js.", skills: ["Node.js", "MongoDB"], email: "wafi.wahid@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYs1rh_0WCPG8N1Oby0zlpPBfp9G9Ls8Pqww&s" },
  { id: "alumni_006", name: "Arisha Noor", class: "Fall 2018", major: "Data Science", role: "Data Analyst", company: "Careem", location: "Karachi, Pakistan", description: "Analyzing large datasets to drive business insights and optimize performance.", skills: ["Python", "Power BI"], email: "noorarisha11@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt502F01zFHBKGODXAF3DbwYR0ggrYeCQEA&s" },
  { id: "alumni_007", name: "Usman Khalid", class: "Spring 2015", major: "Electrical Engineering", role: "Project Engineer", company: "Siemens Pakistan", location: "Karachi, Pakistan", description: "Manages electrical automation projects and system implementation.", skills: ["AutoCAD", "PLC", "Team Coordination"], email: "usman.khalid@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTmb3DvByna5k-BvH8jjjrMhPmDuuBKOsQyA&s" },
  { id: "alumni_008", name: "Minal Fatima", class: "Spring 2017", major: "Artificial Intelligence", role: "Machine Learning Engineer", company: "VisionX", location: "Multan, Pakistan", description: "Develops predictive models and AI-driven recommendation systems.", skills: ["TensorFlow", "Python", "ML Algorithms"], email: "minal.fatima@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQKYrPAyja79UqRKT8rpWv_sYOQtBNlGepw&s" },
  { id: "alumni_009", name: "Bilal Ahmed", class: "Fall 2016", major: "Computer Science", role: "DevOps Engineer", company: "TPL Corp", location: "Lahore, Pakistan", description: "Automates deployment pipelines and manages cloud infrastructure.", skills: ["Docker", "CI/CD", "Linux"], email: "bilal0085@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-fcas3lPjcLH8J8zqDcyrsFAN-zJuYBIqqg&s" },
  { id: "alumni_010", name: "Laiba Noor", class: "Spring 2023", major: "Cybersecurity", role: "Security Analyst", company: "Inbox Business Technologies", location: "Islamabad, Pakistan", description: "Monitors network security and ensures data protection across digital systems.", skills: ["Network Security", "Firewalls"], email: "laiba.noor@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB9Blk3Ns9qMQSZ0gJeQIlPWOvxOUjS0It9Q&s" },
  { id: "alumni_011", name: "Sara Imtiaz", class: "Fall 2025", major: "Media Studies", role: "Content Producer", company: "ARY Digital Network", location: "Karachi, Pakistan", description: "Creates engaging multimedia content for broadcast and social platforms.", skills: ["Video Editing", "Storytelling"], email: "sara.imtiaz@arydigital.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYkhzMLqO2CsDLzObPL6MIP0njxkO18ipYNx8ewgNnNdNf5mv6RiJJFgtTsYuEeP91jc&usqp=CAU" },
  { id: "alumni_012", name: "Areeba Saleem", class: "Fall 2022", major: "Business Administration", role: "Marketing Coordinator", company: "Jazz Pakistan", location: "Rawalpindi, Pakistan", description: "Handles campaigns and brand strategy for digital marketing initiatives.", skills: ["SEO", "Digital Marketing"], email: "areebaofficial@gmail.com", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa05JFli7CvbqnLOI1HIOWbp-LSXoYCGrOaw&s" }
];

function AlumniList() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Filter by batch and search text
  const filteredAlumni = alumniData.filter((alum) => {
    const year = parseInt(alum.class.split(" ")[1]); // extract year from "Fall 2025"
    const matchesBatch = selectedBatch ? year === selectedBatch : true;
    const matchesSearch = searchText
      ? alum.name.toLowerCase().includes(searchText.toLowerCase()) ||
        alum.major.toLowerCase().includes(searchText.toLowerCase()) ||
        alum.class.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesBatch && matchesSearch;
  });

  return (
    <div>
      <SearchBar
        onFilter={(batch) => setSelectedBatch(batch)}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="alumni-grid">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alum) => <AlumniCard key={alum.id} {...alum} />)
        ) : (
          <p style={{ padding: "20px", color: "#555" }}>No alumni found.</p>
        )}
      </div>
    </div>
  );
}

export default AlumniList;
