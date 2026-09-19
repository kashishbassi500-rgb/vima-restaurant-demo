export const restaurant = {
  name: "VIMA",
  cuisine: "Indian",
  address: "ABC Street, Sikar, Rajasthan, India",
  phoneDisplay: "97804 00240",
  phone: "+919780400240",
  opening: "5:30 AM",
  closing: "10:00 PM",
  delivery: true,
  takeaway: true,
  mapQuery: "VIMA, ABC Street, Sikar, Rajasthan, India",
  demo: true
};

export const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapQuery)}`;
export const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("VIMA restaurant Sikar Rajasthan")}`;