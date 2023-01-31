import * as log4js from "log4js"
import jwt_decode from "jwt-decode"
import * as jwt from 'jsonwebtoken';

export const SCOPE_ADMIN = "admin"
export const SCOPE_USER = "user"

export class ControllerUtils {
  private log = log4js.getLogger("ControllerUtils")
}
