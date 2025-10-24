import React, { useState } from "react";
import AlumniCard from "./AlumniCard";
import RequestForm from "./RequestForm";
import "./AlumniList.css";
import "./RequestForm.css"; // Import RequestForm.css for notification styles

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
  },
];

function AlumniList() {
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [mentorNameForNotification, setMentorNameForNotification] = useState(null); // New state to store mentor name

  const handleRequestMentorship = (alumni) => {
    setSelectedAlumni(alumni);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAlumni(null);
  };

  const handleSubmitSuccess = () => {
    setMentorNameForNotification(selectedAlumni?.name); // Store the mentor's name before closing
    setShowForm(false); // Close the form modal
    setShowNotification(true); // Show the success notification
    // Auto-close notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
      setSelectedAlumni(null);
      setMentorNameForNotification(null); // Clear the stored name
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setSelectedAlumni(null);
    setMentorNameForNotification(null); // Clear the stored name
  };

  return (
    <div className="alumni-list-container">
      <div className="alumni-grid">
        {alumniData.map((alum, index) => (
          <AlumniCard 
            key={index} 
            {...alum} 
            onRequestMentorship={() => handleRequestMentorship(alum)}
          />
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="form-modal-overlay">
          <div className="form-modal-content">
            <button className="close-modal-btn" onClick={handleCloseForm}>×</button>
            <RequestForm 
              mentorName={selectedAlumni?.name}
              onClose={handleCloseForm}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="success-notification-right">
          <div className="success-content">
            <span className="success-icon">💬</span>
            <div className="success-text">
              <p className="success-title">Request Sent Successfully!</p>
              <p className="success-message">Your mentorship request has been sent to {mentorNameForNotification || selectedAlumni?.name}</p>
            </div>
            <button className="close-notification-btn" onClick={handleCloseNotification}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumniList;