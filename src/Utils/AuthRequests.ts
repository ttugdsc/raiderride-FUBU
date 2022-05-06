/**
 * This module contains implementations of different OAuth2 requests for abstraction purposes
 * @module
 */

import {AxiosInstance} from 'axios';

/**
 * Used to send various requests to Microsoft OAuth Endpoints
 * @author Jaxcksn
 */
export class AuthHandler {
  /**
   * The access code from the first step of the auth flow.
   * @private
   */
  private accessCode: string = '';

  /**
   * The axios instance for making requests
   */
  private axios: AxiosInstance;

  public constructor(tenant: string) {}
}
