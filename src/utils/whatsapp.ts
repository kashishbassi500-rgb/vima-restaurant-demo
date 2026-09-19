import { restaurant } from "../data/restaurant";
export const whatsappUrl = (message: string) =>
  `https://wa.me/${restaurant.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const bookingMessage = (data: {name:string; phone:string; date:string; time:string; guests:string; notes:string}) =>
  `Hello VIMA (demo), I'd like to request a table.\\nName: ${data.name}\\nPhone: ${data.phone}\\nDate: ${data.date}\\nTime: ${data.time}\\nGuests: ${data.guests}\\nSpecial requests: ${data.notes || "None"}\\nPlease note: this is a demo request and is not confirmed.`;

export const generalMessage = "Hello VIMA (demo), I have a general enquiry. Please note this is a demonstration website.";
