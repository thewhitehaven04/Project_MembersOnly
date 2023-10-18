import { type Response } from 'express'
import { type ValidationError } from 'express-validator'

interface ViewRenderOptions {
  errors?: ValidationError[]
}

type ViewResponseCallback = (err: Error, html: string) => void

export default interface ViewResponse<T> extends Response {
  render: ((view: string, options?: ViewRenderOptions & T) => void) &
    ((
      view: string,
      options?: ViewRenderOptions & T,
      callback?: ViewResponseCallback
    ) => void) &
    ((view: string, callback?: ViewResponseCallback) => void)
}
