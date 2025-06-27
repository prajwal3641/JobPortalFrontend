import { Component, signal, Signal } from '@angular/core';
import { CertificationCardComponent } from '../../profile-page/certification-card/certification-card.component';
import { ExperienceCardComponent } from '../../profile-page/experience-card/experience-card.component';
import { TalentProfile } from '../../talent-profile/profile/profile.model';
import { NgIf } from '@angular/common';
import fields, { ProfileFeilds } from '../../Data/Profile';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { DropdownSearchInputComponent } from '../../shared/dropdown-search-input/dropdown-search-input.component';
import { ProfileInputComponent } from '../profile-input/profile-input.component';
import { FormsModule, NgModel } from '@angular/forms';
import { TagsInputComponent } from '../../shared/tags-input/tags-input.component';
import { ExperienceCardInputComponent } from '../experience-card/experience-card-input/experience-card-input.component';
import { CertificationCardInputComponent } from '../certification-card/certification-card-input/certification-card-input.component';

@Component({
  selector: 'app-profile',
  imports: [
    CertificationCardComponent,
    ExperienceCardComponent,
    NgIf,
    FormsModule,
    ProfileInputComponent,
    TagsInputComponent,
    ExperienceCardInputComponent,
    CertificationCardInputComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  // for about textarea
  about = signal<string>(
    'As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.'
  );
  fields: ProfileFeilds[] = fields;
  profile: TalentProfile = {
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
  };

  edit = signal<boolean[]>([false, false, false, false, false]);

  //  for adding new exp section
  addExp = false;
  toggleAddExp() {
    this.addExp = !this.addExp;
  }

  addCerti = false;
  toggleAddCerti() {
    this.addCerti = !this.addCerti;
  }
  handleEdit(index: any) {
    // if any index comes, toggle the value at that index
    this.edit.update((arr) => {
      const newArr = [...arr];
      newArr[index] = !newArr[index];
      return newArr;
    });
  }
}
