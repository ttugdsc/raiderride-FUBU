/**
 * This module contains implementations of different OAuth2 requests for abstraction purposes
 * @module
 */

import axios, {AxiosInstance} from 'axios';
import Config from 'react-native-config';
import qs from 'qs';
import {TokenResponse} from '../App';

/**
 * Used to send various requests to Microsoft OAuth Endpoints
 * @author Jaxcksn
 */
export class AuthHandler {
  /**
   * The axios instance for making requests
   */
  private axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      baseURL: `https://login.microsoftonline.com/${Config.TENANT}/oauth2/v2.0/`,
    });
  }

  /**
   * Sends a request for an accessToken using an access code.
   * @param {string} code The access code returned from initial oAuth2 step
   * @returns {Promise<TokenResponse>} A promise with a token response type.
   * @async
   */
  async getAccessToken(code: string): Promise<TokenResponse> {
    let response = this.axios.post(
      '/token',
      qs.stringify({
        client_id: 'fc0978bf-d586-4d85-8933-5cea1cdd8ecf',
        code: code,
        redirect_uri: 'raiderride://auth',
        scope: 'offline_access https://graph.microsoft.com/User.Read',
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return (await response).data;
  }
}
