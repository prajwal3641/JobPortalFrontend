const searchFields = [
  {
    title: 'Job Title',
    icon: 'assets/search.svg',
    options: [
      'Designer',
      'Developer',
      'Product Manager',
      'Marketing Specialist',
      'Data Analyst',
      'Sales Executive',
      'Content Writer',
      'Customer Support',
    ],
  },
  {
    title: 'Location',
    icon: 'https://img.icons8.com/windows/32/ffbd20/marker.png',
    options: [
      'Delhi',
      'New York',
      'San Francisco',
      'London',
      'Berlin',
      'Tokyo',
      'Sydney',
      'Toronto',
    ],
  },
  {
    title: 'Skills',
    icon: 'https://img.icons8.com/ios/50/ffbd20/admin-settings-male.png',
    options: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Angular',
      'Node.js',
      'Python',
      'Java',
      'Ruby',
      'PHP',
      'SQL',
      'MongoDB',
      'PostgreSQL',
      'Git',
      'API Development',
      'Testing and Debugging',
      'Agile Methodologies',
      'DevOps',
      'AWS',
      'Azure',
      'Google Cloud',
    ],
  },
];

const talents = [
  {
    name: 'Jarrod Wood',
    role: 'Software Engineer',
    company: 'Google',
    topSkills: ['React', 'SpringBoot', 'MongoDB'],
    about:
      'As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.',
    expectedCtc: '₹48 - 60LPA',
    location: 'New York, United States',
    image: 'avatar',
  },
  {
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    company: 'Facebook',
    topSkills: ['React', 'HTML', 'CSS', 'JavaScript'],
    about:
      'As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.',
    expectedCtc: '₹40 - 55LPA',
    location: 'New York, United States',
    image: 'avatar1',
  },
  {
    name: 'Bob Smith',
    role: 'Backend Developer',
    company: 'Amazon',
    topSkills: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
    about:
      'As a Backend Developer at Amazon, I specialize in server-side development and database management. My skills in Node.js and Express allow me to build robust and scalable APIs, while my experience with MySQL ensures efficient data handling and storage. I am passionate about optimizing backend processes to support high-traffic applications and improve system performance. My approach to development emphasizes reliability, security, and the ability to adapt to evolving technological demands.',
    expectedCtc: '₹50 - 65LPA',
    location: 'New York, United States',
    image: 'avatar',
  },
  {
    name: 'Diana Prince',
    role: 'UX/UI Designer',
    company: 'Adobe',
    topSkills: ['Figma', 'Sketch', 'InVision', 'React'],
    about:
      'As a UX/UI Designer at Adobe, I am dedicated to crafting visually compelling and user-centric designs. My expertise in Figma, Sketch, and InVision allows me to create intuitive interfaces that enhance user experience across digital platforms. I am passionate about translating complex ideas into clean and effective designs that align with user needs and business goals. My design process involves thorough research, user testing, and iterative design to ensure the highest quality and user satisfaction.',
    expectedCtc: '₹35 - 50LPA',
    location: 'San Francisco, United States',
    image: 'avatar2',
  },
  {
    name: 'Charlie Brown',
    role: 'Full Stack Developer',
    company: 'Microsoft',
    topSkills: ['React', 'Python', 'Django', 'Node.js'],
    about:
      'As a Full Stack Developer at Microsoft, I work on developing end-to-end solutions for web applications. My expertise in Python and Django for backend development, combined with React for frontend, allows me to create cohesive and high-performing applications. I am adept at managing the entire development lifecycle, from designing intuitive user interfaces to implementing robust server-side logic. My goal is to deliver comprehensive solutions that meet both user needs and business objectives.',
    expectedCtc: '₹45 - 60LPA',
    location: 'New York, United States',
    image: 'avatar',
  },
  {
    name: 'Fiona Gallagher',
    role: 'DevOps Engineer',
    company: 'Netflix',
    topSkills: ['Docker', 'Kubernetes', 'AWS', 'Node.js'],
    about:
      'As a DevOps Engineer at Netflix, I focus on automating infrastructure and optimizing deployment processes to support scalable applications. My expertise in Docker, Kubernetes, and AWS enables me to manage and streamline complex cloud environments efficiently. I am dedicated to improving operational efficiency and reliability through continuous integration and delivery practices. My role involves collaborating with development teams to ensure seamless deployment and maintenance of applications, enhancing overall system performance and resilience.',
    expectedCtc: '₹50 - 65LPA',
    location: 'San Francisco, United States',
    image: 'avatar1',
  },
  {
    name: 'Ethan Hunt',
    role: 'Data Scientist',
    company: 'IBM',
    topSkills: ['Python', 'R', 'Machine Learning', 'AWS'],
    about:
      'As a Data Scientist at IBM, I leverage my skills in Python, R, and machine learning to analyze complex datasets and generate actionable insights. My work involves building predictive models and data-driven solutions to support strategic decision-making and business growth. I am committed to exploring innovative techniques and methodologies to enhance data analysis and drive meaningful outcomes. My goal is to turn data into valuable information that can help organizations solve problems and seize opportunities.',
    expectedCtc: '₹55 - 70LPA',
    location: 'San Francisco, United States',
    image: 'avatar',
  },
  {
    name: 'Helen Mirren',
    role: 'Mobile App Developer',
    company: 'Apple',
    topSkills: ['Swift', 'iOS', 'Xcode', 'React'],
    about:
      "As a Mobile App Developer at Apple, I specialize in creating intuitive and high-performance iOS applications. With expertise in Swift and Xcode, I design and develop apps that offer seamless user experiences and adhere to the highest standards of quality and performance. My role involves collaborating with cross-functional teams to deliver innovative features and ensure smooth integration with Apple's ecosystem. I am passionate about leveraging the latest technologies to build apps that delight users and drive engagement.",
    expectedCtc: '₹55 - 70LPA',
    location: 'San Francisco, United States',
    image: 'avatar2',
  },
  {
    name: 'George Lucas',
    role: 'Cybersecurity Analyst',
    company: 'Cisco',
    topSkills: ['Penetration Testing', 'Network Security', 'AWS'],
    about:
      'As a Cybersecurity Analyst at Cisco, I focus on safeguarding organizations from cyber threats through proactive security measures. My skills in penetration testing, network security, and ethical hacking enable me to identify vulnerabilities and implement effective countermeasures. I am dedicated to protecting sensitive data and ensuring compliance with security standards. My approach involves continuous monitoring, threat analysis, and incident response to maintain robust security posture and mitigate risks in an ever-evolving threat landscape.',
    expectedCtc: '₹60 - 75LPA',
    location: 'San Francisco, United States',
    image: 'avatar',
  },
];

const profiles = [
  {
    name: 'Jarrod Wood',
    role: 'Software Engineer',
    company: 'Google',
    location: 'New York, United States',
    about:
      'As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.',
    skills: [
      'React',
      'SpringBoot',
      'MongoDB',
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express',
      'MySQL',
      'Python',
      'Django',
      'Figma',
      'Sketch',
      'Docker',
      'AWS',
    ],
    experience: [
      {
        title: 'Software Engineer III',
        company: 'Google',
        location: 'New York, United States',
        startDate: 'Apr 2022',
        endDate: 'Present',
        description:
          'As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.',
      },
      {
        title: 'Software Engineer',
        company: 'Microsoft',
        location: 'Seattle, United States',
        startDate: 'Jun 2018',
        endDate: 'Mar 2022',
        description:
          'At Microsoft, I worked on developing and optimizing cloud-based applications, focusing on enhancing performance and scalability. I collaborated with product managers and designers to create innovative features that improved user engagement. My responsibilities included writing clean, maintainable code, performing code reviews, and mentoring junior developers. I played a key role in migrating legacy applications to modern cloud infrastructure, resulting in significant cost savings and improved efficiency.',
      },
    ],
    certifications: [
      {
        name: 'Google Professional Cloud Architect',
        issuer: 'Google',
        issueDate: 'Aug 2023',
        certificateId: 'CB72982GG',
      },
      {
        name: 'Microsoft Certified: Azure Solutions Architect Expert',
        issuer: 'Microsoft',
        issueDate: 'May 2022',
        certificateId: 'MS12345AZ',
      },
    ],
  },
  {
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    company: 'Facebook',
    location: 'New York, United States',
    about:
      'As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.',
    skills: [
      'React',
      'HTML',
      'CSS',
      'JavaScript',
      'Figma',
      'Sketch',
      'Node.js',
    ],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Facebook',
        location: 'New York, United States',
        startDate: 'Jan 2021',
        endDate: 'Present',
        description:
          'Developed and maintained user interfaces for Facebook web applications, collaborating with designers and backend engineers to deliver seamless user experiences.',
      },
      {
        title: 'UI Developer',
        company: 'Adobe',
        location: 'San Francisco, United States',
        startDate: 'Jul 2018',
        endDate: 'Dec 2020',
        description:
          'Worked on UI/UX design and implementation for Adobe Creative Cloud web tools, focusing on accessibility and performance.',
      },
    ],
    certifications: [
      {
        name: 'Certified Frontend Developer',
        issuer: 'W3C',
        issueDate: 'Mar 2021',
        certificateId: 'W3C123456',
      },
    ],
  },
  {
    name: 'Bob Smith',
    role: 'Backend Developer',
    company: 'Amazon',
    location: 'New York, United States',
    about:
      'As a Backend Developer at Amazon, I specialize in server-side development and database management. My skills in Node.js and Express allow me to build robust and scalable APIs, while my experience with MySQL ensures efficient data handling and storage. I am passionate about optimizing backend processes to support high-traffic applications and improve system performance. My approach to development emphasizes reliability, security, and the ability to adapt to evolving technological demands.',
    skills: [
      'Node.js',
      'Express',
      'MongoDB',
      'MySQL',
      'AWS',
      'Python',
      'Docker',
    ],
    experience: [
      {
        title: 'Backend Developer',
        company: 'Amazon',
        location: 'New York, United States',
        startDate: 'Feb 2020',
        endDate: 'Present',
        description:
          'Built and maintained scalable backend services for Amazon e-commerce platform, focusing on performance and reliability.',
      },
      {
        title: 'Software Engineer',
        company: 'IBM',
        location: 'San Francisco, United States',
        startDate: 'Jun 2017',
        endDate: 'Jan 2020',
        description:
          'Worked on cloud-based backend solutions and contributed to open-source projects in the IBM Cloud ecosystem.',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon',
        issueDate: 'Sep 2020',
        certificateId: 'AWSDEV123',
      },
    ],
  },
  {
    name: 'Diana Prince',
    role: 'UX/UI Designer',
    company: 'Adobe',
    location: 'San Francisco, United States',
    about:
      'As a UX/UI Designer at Adobe, I am dedicated to crafting visually compelling and user-centric designs. My expertise in Figma, Sketch, and InVision allows me to create intuitive interfaces that enhance user experience across digital platforms. I am passionate about translating complex ideas into clean and effective designs that align with user needs and business goals. My design process involves thorough research, user testing, and iterative design to ensure the highest quality and user satisfaction.',
    skills: [
      'Figma',
      'Sketch',
      'InVision',
      'React',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    experience: [
      {
        title: 'UX/UI Designer',
        company: 'Adobe',
        location: 'San Francisco, United States',
        startDate: 'May 2019',
        endDate: 'Present',
        description:
          'Designed user interfaces for Adobe Creative Cloud applications, focusing on usability and visual appeal.',
      },
      {
        title: 'Product Designer',
        company: 'Facebook',
        location: 'New York, United States',
        startDate: 'Jan 2017',
        endDate: 'Apr 2019',
        description:
          'Worked on product design for Facebook Ads Manager, improving workflow and user engagement.',
      },
    ],
    certifications: [
      {
        name: 'Certified UX Designer',
        issuer: 'Interaction Design Foundation',
        issueDate: 'Nov 2019',
        certificateId: 'UXD12345',
      },
    ],
  },
  {
    name: 'Charlie Brown',
    role: 'Full Stack Developer',
    company: 'Microsoft',
    location: 'New York, United States',
    about:
      'As a Full Stack Developer at Microsoft, I work on developing end-to-end solutions for web applications. My expertise in Python and Django for backend development, combined with React for frontend, allows me to create cohesive and high-performing applications. I am adept at managing the entire development lifecycle, from designing intuitive user interfaces to implementing robust server-side logic. My goal is to deliver comprehensive solutions that meet both user needs and business objectives.',
    skills: [
      'React',
      'Python',
      'Django',
      'Node.js',
      'JavaScript',
      'MongoDB',
      'AWS',
    ],
    experience: [
      {
        title: 'Full Stack Developer',
        company: 'Microsoft',
        location: 'New York, United States',
        startDate: 'Aug 2020',
        endDate: 'Present',
        description:
          'Developed and maintained full stack applications for Microsoft Teams, integrating backend APIs and frontend interfaces.',
      },
      {
        title: 'Software Engineer',
        company: 'Amazon',
        location: 'New York, United States',
        startDate: 'Jun 2017',
        endDate: 'Jul 2020',
        description:
          'Worked on scalable backend services and contributed to frontend features for Amazon Web Services.',
      },
    ],
    certifications: [
      {
        name: 'Microsoft Certified: Azure Developer Associate',
        issuer: 'Microsoft',
        issueDate: 'Dec 2020',
        certificateId: 'AZDEV123',
      },
    ],
  },
  {
    name: 'Fiona Gallagher',
    role: 'DevOps Engineer',
    company: 'Netflix',
    location: 'San Francisco, United States',
    about:
      'As a DevOps Engineer at Netflix, I focus on automating infrastructure and optimizing deployment processes to support scalable applications. My expertise in Docker, Kubernetes, and AWS enables me to manage and streamline complex cloud environments efficiently. I am dedicated to improving operational efficiency and reliability through continuous integration and delivery practices. My role involves collaborating with development teams to ensure seamless deployment and maintenance of applications, enhancing overall system performance and resilience.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Node.js', 'Python', 'DevOps'],
    experience: [
      {
        title: 'DevOps Engineer',
        company: 'Netflix',
        location: 'San Francisco, United States',
        startDate: 'Mar 2019',
        endDate: 'Present',
        description:
          'Automated deployment pipelines and managed cloud infrastructure for Netflix streaming services.',
      },
      {
        title: 'Cloud Engineer',
        company: 'Google',
        location: 'New York, United States',
        startDate: 'Jan 2017',
        endDate: 'Feb 2019',
        description:
          'Worked on Google Cloud Platform, focusing on infrastructure automation and monitoring.',
      },
    ],
    certifications: [
      {
        name: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation',
        issueDate: 'Jul 2021',
        certificateId: 'CKA12345',
      },
    ],
  },
  {
    name: 'Ethan Hunt',
    role: 'Data Scientist',
    company: 'IBM',
    location: 'San Francisco, United States',
    about:
      'As a Data Scientist at IBM, I leverage my skills in Python, R, and machine learning to analyze complex datasets and generate actionable insights. My work involves building predictive models and data-driven solutions to support strategic decision-making and business growth. I am committed to exploring innovative techniques and methodologies to enhance data analysis and drive meaningful outcomes. My goal is to turn data into valuable information that can help organizations solve problems and seize opportunities.',
    skills: ['Python', 'R', 'Machine Learning', 'AWS', 'SQL', 'Data Analysis'],
    experience: [
      {
        title: 'Data Scientist',
        company: 'IBM',
        location: 'San Francisco, United States',
        startDate: 'Apr 2018',
        endDate: 'Present',
        description:
          'Developed machine learning models and data pipelines for IBM Watson and enterprise analytics products.',
      },
      {
        title: 'Data Analyst',
        company: 'Google',
        location: 'New York, United States',
        startDate: 'Jan 2016',
        endDate: 'Mar 2018',
        description:
          'Analyzed large datasets and provided actionable insights for Google Ads and Search teams.',
      },
    ],
    certifications: [
      {
        name: 'Certified Data Scientist',
        issuer: 'Data Science Council of America',
        issueDate: 'Oct 2019',
        certificateId: 'DSCA12345',
      },
    ],
  },
  {
    name: 'Helen Mirren',
    role: 'Mobile App Developer',
    company: 'Apple',
    location: 'San Francisco, United States',
    about:
      "As a Mobile App Developer at Apple, I specialize in creating intuitive and high-performance iOS applications. With expertise in Swift and Xcode, I design and develop apps that offer seamless user experiences and adhere to the highest standards of quality and performance. My role involves collaborating with cross-functional teams to deliver innovative features and ensure smooth integration with Apple's ecosystem. I am passionate about leveraging the latest technologies to build apps that delight users and drive engagement.",
    skills: ['Swift', 'iOS', 'Xcode', 'React', 'JavaScript', 'Figma'],
    experience: [
      {
        title: 'Mobile App Developer',
        company: 'Apple',
        location: 'San Francisco, United States',
        startDate: 'May 2019',
        endDate: 'Present',
        description:
          'Developed and maintained iOS applications for Apple App Store, focusing on performance and user experience.',
      },
      {
        title: 'iOS Developer',
        company: 'Facebook',
        location: 'New York, United States',
        startDate: 'Feb 2017',
        endDate: 'Apr 2019',
        description:
          'Worked on Facebook mobile apps, implementing new features and optimizing for iOS devices.',
      },
    ],
    certifications: [
      {
        name: 'Apple Certified iOS Developer',
        issuer: 'Apple',
        issueDate: 'Aug 2020',
        certificateId: 'IOSDEV123',
      },
    ],
  },
  {
    name: 'George Lucas',
    role: 'Cybersecurity Analyst',
    company: 'Cisco',
    location: 'San Francisco, United States',
    about:
      'As a Cybersecurity Analyst at Cisco, I focus on safeguarding organizations from cyber threats through proactive security measures. My skills in penetration testing, network security, and ethical hacking enable me to identify vulnerabilities and implement effective countermeasures. I am dedicated to protecting sensitive data and ensuring compliance with security standards. My approach involves continuous monitoring, threat analysis, and incident response to maintain robust security posture and mitigate risks in an ever-evolving threat landscape.',
    skills: [
      'Penetration Testing',
      'Network Security',
      'AWS',
      'Python',
      'DevOps',
    ],
    experience: [
      {
        title: 'Cybersecurity Analyst',
        company: 'Cisco',
        location: 'San Francisco, United States',
        startDate: 'Jun 2018',
        endDate: 'Present',
        description:
          'Conducted penetration testing and implemented network security protocols for Cisco enterprise clients.',
      },
      {
        title: 'Security Engineer',
        company: 'Amazon',
        location: 'New York, United States',
        startDate: 'Jan 2016',
        endDate: 'May 2018',
        description:
          'Worked on cloud security and compliance for Amazon Web Services, focusing on threat detection and incident response.',
      },
    ],
    certifications: [
      {
        name: 'Certified Ethical Hacker',
        issuer: 'EC-Council',
        issueDate: 'Feb 2019',
        certificateId: 'CEH12345',
      },
    ],
  },
];

export { searchFields, talents, profiles };
