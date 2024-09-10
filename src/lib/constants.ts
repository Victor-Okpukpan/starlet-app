export const navLinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Notifications",
    link: "#",
  },
  {
    label: "Community",
    link: "#",
  },
  {
    label: "My Courses",
    link: "/my-courses",
  },
];

export const adminNavLinks = [
  {
    label: "My Page",
    link: "/creator/",
  },
  {
    label: "Insights",
    link: "#",
  },
  {
    label: "Notifications",
    link: "#",
  },
  {
    label: "Community",
    link: "#",
  },
];

export const creators = [
  {
    color: "#60D8F4",
    name: "Emma Etim",
    link: "/creator/emma",
  },
  
];

export const courses = [
  {
    _id: "66ca6b49648d4ec816c9882b",
    title: "Introduction to Data Science",
    description:
      "A comprehensive course on data science including data analysis, machine learning, and data visualization.",
    image: "https://example.com/images/data-science.jpg",
    courseContent: [
      {
        chapterTitle: "Chapter 1: Basics of Data Science",
        topics: [
          "Introduction to Data Science",
          "Data Science Workflow",
          "Python for Data Science",
        ],
        _id: "66ca6b49648d4ec816c9882c",
      },
      {
        chapterTitle: "Chapter 2: Data Analysis",
        topics: [
          "Data Cleaning",
          "Exploratory Data Analysis",
          "Statistical Analysis",
        ],
        _id: "66ca6b49648d4ec816c9882d",
      },
      {
        chapterTitle: "Chapter 3: Machine Learning",
        topics: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
        ],
        _id: "66ca6b49648d4ec816c9882e",
      },
    ],
    price: 99.99,
    downloadableContent: [
      "https://example.com/resources/data-science-overview.pdf",
      "https://example.com/resources/machine-learning-basics.pdf",
    ],
    createdAt: "2024-08-24T23:22:50.634Z",
    updatedAt: "2024-08-24T23:22:50.634Z",
    __v: 0,
  },
  {
    _id: "66ca6ca14202db8154a8398e",
    title: "Introduction to Cybersecurity",
    description:
      "Gain foundational knowledge in cybersecurity, including network security, encryption, and threat analysis.",
    image: "https://example.com/images/cybersecurity.jpg",
    courseContent: [
      {
        chapterTitle: "Chapter 1: Basics of Cybersecurity",
        topics: [
          "Cyber Threats",
          "Security Principles",
          "Network Security Basics",
        ],
        _id: "66ca6ca14202db8154a8398f",
      },
      {
        chapterTitle: "Chapter 2: Encryption and Cryptography",
        topics: [
          "Symmetric Encryption",
          "Asymmetric Encryption",
          "Hash Functions",
        ],
        _id: "66ca6ca14202db8154a83990",
      },
      {
        chapterTitle: "Chapter 3: Threats and Vulnerabilities",
        topics: ["Malware", "Phishing", "Vulnerability Management"],
        _id: "66ca6ca14202db8154a83991",
      },
    ],
    price: 89.99,
    downloadableContent: [
      "https://example.com/resources/cybersecurity-basics.pdf",
      "https://example.com/resources/encryption-guide.pdf",
    ],
    createdAt: "2024-08-24T23:28:33.017Z",
    updatedAt: "2024-08-24T23:28:33.017Z",
    __v: 0,
  },
  {
    _id: "66ca6cc54202db8154a83993",
    title: "Machine Learning with Python",
    description:
      "Explore machine learning algorithms and models using Python and popular libraries like scikit-learn and TensorFlow.",
    image: "https://example.com/images/ml-python.jpg",
    courseContent: [
      {
        chapterTitle: "Chapter 1: Introduction to Machine Learning",
        topics: [
          "Types of Learning",
          "Machine Learning Workflow",
          "Python Libraries",
        ],
        _id: "66ca6cc54202db8154a83994",
      },
      {
        chapterTitle: "Chapter 2: Supervised Learning",
        topics: ["Regression", "Classification", "Model Evaluation"],
        _id: "66ca6cc54202db8154a83995",
      },
      {
        chapterTitle: "Chapter 3: Unsupervised Learning",
        topics: ["Clustering", "Dimensionality Reduction", "Anomaly Detection"],
        _id: "66ca6cc54202db8154a83996",
      },
    ],
    price: 149.99,
    downloadableContent: [
      "https://example.com/resources/ml-intro.pdf",
      "https://example.com/resources/supervised-learning.pdf",
    ],
    createdAt: "2024-08-24T23:29:09.898Z",
    updatedAt: "2024-08-24T23:29:09.898Z",
    __v: 0,
  },
];

export const myCourses = [
  {
    image: "/courses/1.svg",
    title: "Introduction to UI/UX Design",
    description:
      "Learn the fundamentals of User Interface and User Experience design",
    price: 50,
  },
  {
    image: "/courses/2.svg",
    title: "Become a Visual Designer in 3 Months",
    description:
      "Learn the fundamentals of User Interface and User Experience design",
    price: 25,
  },
  {
    image: "/courses/3.svg",
    title: "Introduction to Data Analytics",
    description: "Learn the fundamentals of Data Analytics",
    price: 90,
  },
];
