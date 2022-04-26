/**
 * @fileoverview These are all the types used by the Radar API
 */

/**
 * Represents a autocomplete result from the Radar API
 * @type
 */
export type RadarAutocomplete = {
  meta: Meta;
  addresses: RadarAddress[];
};

/**
 * The response code from Radar, which should normally be 200
 * @interface
 */
export interface Meta {
  /**
   * The HTTP status code returned by the radar API
   */
  code: number;
}

/**
 * An address returned by the radar API
 * @interface
 */
export interface RadarAddress {
  /**
   * The latitude of the address
   */
  latitude: number;
  /**
   * The longitude of the address
   */
  longitude: number;
  /**
   * A GeoJSON point of the location
   * @see https://geojson.org/
   */
  geometry: RadarGeometry;
  /**
   * The textual representation of the place.
   */
  placeLabel?: string;
  /**
   * The textual representation of the street address.
   */
  addressLabel: string;
  /**
   * The proper formatted address.
   */
  formattedAddress: string;
  /**
   * The country of the address.
   */
  country: string;
  /**
   * The common country code.
   * @see https://www.iban.com/country-codes
   */
  countryCode: string;
  /**
   * The emoji representation of the country flag.
   * @example 🇺🇸 for the United States
   */
  countryFlag: string;
  /**
   * The state the address is in (if applicable).
   */
  state?: string;
  /**
   * The state code the address is in (if applicable).
   * @see https://www.bls.gov/respondents/mwr/electronic-data-interchange/appendix-d-usps-state-abbreviations-and-fips-codes.htm
   */
  stateCode?: string;
  /**
   * The postal code the address is in.
   * @see https://en.wikipedia.org/wiki/List_of_postal_codes
   */
  postalCode?: string;
  /**
   * The city the address is in.
   */
  city?: string;
  /**
   * The borough the address is in.
   */
  borough?: string;
  /**
   * The countythe address is in.
   */
  county?: string;
  /**
   * The neighborhood the address is in.
   */
  neighborhood?: string;
  /**
   * The house number of the address
   */
  number?: string;
  /**
   * The distance the address is from the request user.
   * @ignore
   */
  distance?: number;
  /**
   * The layer that the address is classified under.
   * @see https://radar.com/documentation/api#autocomplete
   */
  layer: string;
}

export interface RadarGeometry {
  type: string;
  coordinates: number[];
}
