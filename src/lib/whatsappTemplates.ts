const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917760161401';

export interface ClientQueryTemplateData {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface BulkOrderRequestTemplateData {
  company: string;
  contact: string;
  phone: string;
  quantity: string;
  requirements?: string;
}

export interface OrderLineItemTemplateData {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderConfirmationTemplateData {
  items: OrderLineItemTemplateData[];
  totalPrice: number;
  customer: {
    firstName: string;
    lastName?: string;
    phone: string;
    email?: string;
  };
  delivery: {
    address: string;
    city: string;
    pincode: string;
    latitude?: string;
    longitude?: string;
  };
  notes?: string;
  transactionId: string;
}

const formatFullName = (firstName: string, lastName?: string): string =>
  `${firstName} ${lastName || ''}`.trim();

export const buildWhatsAppUrl = (message: string, phoneNumber = DEFAULT_WHATSAPP_NUMBER): string => {
  const normalizedPhone = phoneNumber.replace(/\D/g, '') || DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

export const buildClientQueryMessage = ({
  firstName,
  lastName,
  email,
  inquiryType,
  message,
}: ClientQueryTemplateData): string =>
  [
    '*New Inquiry from SAVI Website*',
    '',
    `*Name:* ${formatFullName(firstName, lastName)}`,
    `*Email:* ${email.trim()}`,
    `*Inquiry Type:* ${inquiryType.trim()}`,
    `*Message:* ${message.trim()}`,
  ].join('\n');

export const buildBulkOrderRequestMessage = ({
  company,
  contact,
  phone,
  quantity,
  requirements,
}: BulkOrderRequestTemplateData): string =>
  [
    '*Bulk Quote Request from SAVI Website*',
    '',
    `*Company:* ${company.trim()}`,
    `*Contact:* ${contact.trim()}`,
    `*Phone:* ${phone.trim()}`,
    `*Monthly Quantity:* ${quantity.trim()}`,
    `*Requirements:* ${(requirements || '').trim() || 'None'}`,
  ].join('\n');

export const buildOrderConfirmationMessage = ({
  items,
  totalPrice,
  customer,
  delivery,
  notes,
  transactionId,
}: OrderConfirmationTemplateData): string => {
  const orderItems = items
    .map(
      (item) =>
        `- ${item.name} (${item.size}) x ${item.quantity} = INR ${(item.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const hasLocation = Boolean(delivery.latitude && delivery.longitude);
  const locationLines = hasLocation
    ? [
      '',
      '*Location Coordinates:*',
      `Lat: ${delivery.latitude}, Lng: ${delivery.longitude}`,
      `Google Maps: https://maps.google.com/?q=${delivery.latitude},${delivery.longitude}`,
    ]
    : [];

  const notesLine = notes?.trim() ? ['', `*Notes:* ${notes.trim()}`] : [];

  return [
    '*New Order from SAVI Website*',
    '',
    '*Order Details:*',
    orderItems,
    '',
    `*Total:* INR ${totalPrice.toLocaleString()}`,
    '',
    '*Customer Details:*',
    `Name: ${formatFullName(customer.firstName, customer.lastName)}`,
    `Phone: ${customer.phone.trim()}`,
    `Email: ${(customer.email || '').trim() || 'Not provided'}`,
    '',
    '*Delivery Address:*',
    delivery.address.trim(),
    `${delivery.city.trim()} - ${delivery.pincode.trim()}`,
    ...locationLines,
    ...notesLine,
    '',
    '*Payment Details:*',
    `Transaction ID: ${transactionId.trim()}`,
    'Payment confirmed via PhonePe',
  ].join('\n');
};
