export interface ProfileFeilds {
  label: string;
  placeholder: string;
  options: string[];
  leftSection: string;
}

const fields: ProfileFeilds[] = [
  {
    label: 'Job Title',
    placeholder: 'Enter Job Title',
    options: [
      'Designer',
      'Software Engineer III',
      'Software Engineer',
      'Developer',
      'Product Manager',
      'Marketing Specialist',
      'Data Analyst',
      'Sales Executive',
      'Content Writer',
      'Customer Support',
    ],
    leftSection: 'assets/briefcase.svg',
  },
  {
    label: 'Company',
    placeholder: 'Enter Company Name',
    options: [
      'Google',
      'Microsoft',
      'Meta',
      'Netflix',
      'Adobe',
      'Facebook',
      'Amazon',
      'Apple',
      'Spotify',
    ],
    leftSection: 'assets/briefcase.svg',
  },
  {
    label: 'Location',
    placeholder: 'Enter Job Location',
    options: [
      'New York, United States',
      'Delhi',
      'New York',
      'San Francisco',
      'London',
      'Berlin',
      'Tokyo',
      'Sydney',
      'Toronto',
    ],
    leftSection: 'assets/location.png',
  },
];
export default fields;
