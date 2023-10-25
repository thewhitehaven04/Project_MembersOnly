import { type Schema } from 'express-validator'
import { type DefaultSchemaKeys } from 'express-validator/src/middlewares/schema'

const userValidator: Schema<DefaultSchemaKeys> = {
  name: {
    trim: true,
    optional: false,
    isEmpty: false,
    isString: true,
    isLength: {
      options: {
        max: 64
      }
    },
    errorMessage: 'Name must be a non-empty string up to 64 characters long'
  },
  lastName: {
    trim: true,
    optional: false,
    isEmpty: false,
    isString: true,
    isLength: {
      options: {
        max: 64
      }
    },
    errorMessage:
      'Last name must be a non-empty string up to 64 characters long'
  },
  username: {
    trim: true,
    optional: false,
    isEmpty: false,
    isString: true,
    isLength: {
      options: {
        max: 64
      }
    },
    errorMessage: 'Username must be a non-empty string up to 64 characters long'
  },
  password: {
    optional: false,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
      },
      errorMessage:
        'Password must contain at least one upper- and lower-case character; at least one number and at least one letter'
    }
  },
  confirm: {
    optional: false,
    custom: {
      options: (value: string, { req }) => value === req.body.password
    },
    errorMessage: 'Password and confirmation do not match'
  },
  adminRights: {
    isIn: {
      options: ['on', 'off']
    }
  }
}

export default userValidator
