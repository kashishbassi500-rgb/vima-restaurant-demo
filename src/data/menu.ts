export type MenuItem = {
  id: string; name: string; category: string; description: string; price: number;
  vegetarian: boolean; image: string; featured?: boolean;
};

// All items and prices are illustrative demo content. Edit before any real launch.
export const menu: MenuItem[] = [
  { id:"breakfast-aloo", name:"Aloo Paratha", category:"Breakfast", description:"Whole-wheat flatbread filled with spiced potato, served with a demo accompaniment.", price:90, vegetarian:true, image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", featured:true },
  { id:"breakfast-poha", name:"Indori Poha", category:"Breakfast", description:"Light flattened rice with herbs, peanuts and a bright lemon finish.", price:110, vegetarian:true, image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80" },
  { id:"starter-paneer", name:"Paneer Tikka", category:"Starters", description:"Charred paneer with aromatic spices and mint chutney.", price:240, vegetarian:true, image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80", featured:true },
  { id:"starter-samosa", name:"Punjabi Samosa", category:"Starters", description:"Crisp pastry with a warmly spiced potato and pea filling.", price:80, vegetarian:true, image:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80" },
  { id:"main-dal", name:"Dal Makhani", category:"Main Course", description:"Slow-style black lentils in a creamy tomato-based gravy (demo description).", price:220, vegetarian:true, image:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80", featured:true },
  { id:"main-shahi", name:"Shahi Paneer", category:"Main Course", description:"Paneer in a mellow, rich cashew-inspired curry.", price:260, vegetarian:true, image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80" },
  { id:"bread-naan", name:"Butter Naan", category:"Breads", description:"Soft tandoor-style naan finished with butter.", price:60, vegetarian:true, image:"https://images.unsplash.com/photo-1600628422019-6a3e6e6f5f7c?auto=format&fit=crop&w=900&q=80" },
  { id:"bread-roti", name:"Tandoori Roti", category:"Breads", description:"Rustic whole-wheat flatbread, a classic curry companion.", price:35, vegetarian:true, image:"https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=80" },
  { id:"rice-biryani", name:"Veg Biryani", category:"Rice & Biryani", description:"Fragrant basmati rice layered with vegetables and whole spices.", price:200, vegetarian:true, image:"https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80", featured:true },
  { id:"rice-jeera", name:"Jeera Rice", category:"Rice & Biryani", description:"Fluffy basmati rice tempered with cumin.", price:140, vegetarian:true, image:"https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80" },
  { id:"dessert-gulab", name:"Gulab Jamun", category:"Desserts", description:"Soft syrup-soaked milk dumplings, served as a sweet finish.", price:80, vegetarian:true, image:"https://images.unsplash.com/photo-1666190092159-8a7f1b2d0c6b?auto=format&fit=crop&w=900&q=80" },
  { id:"dessert-kheer", name:"Kesar Kheer", category:"Desserts", description:"Creamy rice pudding with a gentle saffron-inspired note.", price:100, vegetarian:true, image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80" },
  { id:"drink-chai", name:"Masala Chai", category:"Beverages", description:"Indian tea simmered with warming spices.", price:40, vegetarian:true, image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80", featured:true },
  { id:"drink-lassi", name:"Sweet Lassi", category:"Beverages", description:"A chilled yogurt drink with a lightly sweet finish.", price:90, vegetarian:true, image:"https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80" }
];