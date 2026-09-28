/**
 * Delivery Zone Configuration & Validation
 * Currently serving areas with pincode 586109*
 */

export const ALLOWED_PINCODE_PREFIXES = ['586109'] as const;
export const PRIMARY_DELIVERY_PINCODE = '586109';
export const SERVICE_AREA_NAME = 'Vijayapura (586109)';

export interface PincodeValidationResult {
  isValidFormat: boolean;
  isDeliverable: boolean;
  cleanPincode: string;
  message?: string;
  status: 'empty' | 'incomplete' | 'available' | 'unavailable';
}

export function validatePincode(pincode: string): PincodeValidationResult {
  const clean = (pincode || '').replace(/\D/g, '').trim();

  if (!clean) {
    return {
      isValidFormat: false,
      isDeliverable: false,
      cleanPincode: '',
      status: 'empty',
    };
  }

  if (clean.length < 6) {
    return {
      isValidFormat: false,
      isDeliverable: false,
      cleanPincode: clean,
      status: 'incomplete',
      message: 'Please enter a valid 6-digit pincode',
    };
  }

  const isDeliverable = ALLOWED_PINCODE_PREFIXES.some((prefix) => clean.startsWith(prefix));

  if (isDeliverable) {
    return {
      isValidFormat: true,
      isDeliverable: true,
      cleanPincode: clean,
      status: 'available',
      message: `Delivery available in your area (${clean})`,
    };
  }

  return {
    isValidFormat: true,
    isDeliverable: false,
    cleanPincode: clean,
    status: 'unavailable',
    message: `Service unavailable for pincode ${clean}. We currently deliver exclusively to ${PRIMARY_DELIVERY_PINCODE}. Service coming soon to your area!`,
  };
}

export function isDeliverablePincode(pincode: string): boolean {
  return validatePincode(pincode).isDeliverable;
}
