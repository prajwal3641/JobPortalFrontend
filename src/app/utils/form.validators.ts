export class FormValidators {
  static validateField(
    name: string,
    value: string,
    relatedValues?: any
  ): string {
    switch (name) {
      case 'email':
        if (!this.validateRequired(value)) return 'Email is required';
        if (!this.validateEmail(value)) return 'Invalid email';
        return '';

      case 'password':
        if (!this.validateRequired(value)) return 'Password is required';
        if (!this.validatePassword(value)) {
          return 'Password must be 8–15 chars, with upper, lower, number & symbol';
        }
        if (
          relatedValues &&
          relatedValues?.confirmPassword !== '' &&
          value !== relatedValues?.confirmPassword
        ) {
          return 'Password do not match';
        }

        return '';

      case 'confirmPassword':
        if (!this.validateRequired(value))
          return 'Please confirm your password';
        if (!this.validateRequired(relatedValues?.password))
          return 'Please enter your password first !';
        if (value !== relatedValues?.password) return 'Passwords do not match';
        return '';

      case 'name':
        if (!this.validateRequired(value)) return 'Name is required';
        return '';

      default:
        return '';
    }
  }

  static validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  static validatePassword(password: string): boolean {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return pattern.test(password);
  }

  static validateRequired(value: any): boolean {
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  static validateMatch(value1: string, value2: string): boolean {
    return value1 === value2;
  }
}
