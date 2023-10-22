import {
  type Schema,
  type DefaultSchemaKeys
} from 'express-validator/src/middlewares/schema'

const messageRequestValidator: Schema<DefaultSchemaKeys> = {
  title: {
    optional: false,
    isEmpty: false,
    trim: true,
    isString: true,
    isLength: {
      options: {
        max: 128
      }
    },
    errorMessage:
      'Message title must be a non-empty string up to 128 characters long'
  },
  text: {
    optional: false,
    isEmpty: false,
    trim: true,
    isString: true,
    isLength: {
      options: {
        max: 4096
      }
    },
    errorMessage:
      'Message text must be a non-empty string up to 4096 characters long'
  }
}

export default messageRequestValidator
