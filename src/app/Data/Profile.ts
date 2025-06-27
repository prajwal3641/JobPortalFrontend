export interface ProfileFeilds {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  leftSection: string;
}

const fields: ProfileFeilds[] = [
  {
    label: 'Job Title',
    placeholder: 'Enter Job Title',
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
    value: 'Software Engineer',
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
    value: 'Google',
    leftSection: 'assets/briefcase.svg',
  },
  {
    label: 'Location',
    placeholder: 'Enter Job Location',
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
    value: 'New York, United States',
    leftSection: 'assets/location.png',
  },
];
export default fields;
