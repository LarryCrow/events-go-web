/**
 * Item from the list received of suggest method.
 */
export interface SuggestedPlaceDto {
  /** Readable value */
  value: string;
  /** Unrestricted value */
  unrestricted_value: string;
  /** Additional information about place */
  data: {
    /** Latitude */
    geo_lat: string;
    /** Longitude */
    geo_lon: string;
    /** Type of building. */
    house_type: string;
    // There are much more fields but we don't need them.
  };
}

/**
 * Response of suggest method.
 */
export interface AddressSuggestionDto {
  /** List of suggested places. */
  suggestions: SuggestedPlaceDto[];
}
