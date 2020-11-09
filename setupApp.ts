import validate from 'validate.js';

const customValidators = {
  containsUppercase: (value = '', options: any, key: any, attributes: any) => {
    if ((value.match(/[A-Z]/g) || []).length === 0) {
      return 'must contain uppercase letter';
    }
  },

  containsLowercase: (value = '', options: any, key: any, attributes: any) => {
    if ((value.match(/[a-z]/g) || []).length === 0) {
      return 'must contain lowercase letter';
    }
  },

  containsNumber: (value = '', options: any, key: any, attributes: any) => {
    if ((value.match(/[0-9]/g) || []).length === 0) {
      return 'must contain number';
    }
  },
};

validate.validators = { ...validate.validators, ...customValidators };

export default validate;
