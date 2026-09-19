import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock, MapPin, Menu as MenuIcon, Minus, Plus, ShoppingBag, Star, Utensils, X, MessageCircle, Phone, Search, Trash2, Leaf } from "lucide-react";
import { menu, type MenuItem } from "./data/menu";
import { gallery } from "./data/gallery";
import { restaurant, mapSearchUrl, googleSearchUrl } from "./data/restaurant";
import { inr } from "./utils/currency";
import { whatsappUrl, bookingMessage, generalMessage } from "./utils/whatsapp";

type CartLine = { item: MenuItem; qty: number };
const categories = ["All", "Breakfast", "Starters", "Main Course", "Breads", "Rice & Biryani", "Desserts", "Beverages"];

function DemoTag() { return <span className="demo-tag">DEMO WEBSITE</span>; }
function SectionTitle({eyebrow,title,desc}:{eyebrow:string;title:string;desc?:string}) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
}
function App() {
  const [mobileOpen,setMobileOpen] = useState(false);
  const [activeCategory,setActiveCategory] = useState("All");
  const [search,setSearch] = useState("");
  const [cart,setCart] = useState<CartLine[]>([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [checkoutOpen,setCheckoutOpen] = useState(false);
  const [orderStatus,setOrderStatus] = useState("");
  const [lightbox,setLightbox] = useState<number|null>(null);
  const [reservationStatus,setReservationStatus] = useState("");
  const [reservation,setReservation] = useState({name:"",phone:"",date:"",time:"",guests:"2",notes:""});
  const [order,setOrder] = useState({name:"",phone:"",type:"Delivery",address:"",notes:""});
  const [payment,setPayment] = useState("mock");
  const [paymentState,setPaymentState] = useState("");

  const filtered = useMemo(() => menu.filter(item =>
    (activeCategory === "All" || item.category === activeCategory) &&
    `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
  ),[activeCategory,search]);
  const subtotal = cart.reduce((sum,line)=>sum+line.item.price*line.qty,0);
  const totalItems = cart.reduce((sum,line)=>sum+line.qty,0);
  const updateQty = (id:string,delta:number) => setCart(old => old.map(line => line.item.id===id ? {...line,qty:line.qty+delta} : line).filter(line=>line.qty>0));
  const addToCart = (item:MenuItem) => {
    setCart(old => old.some(line=>line.item.id===item.id)
      ? old.map(line=>line.item.id===item.id?{...line,qty:line.qty+1}:line)
      : [...old,{item,qty:1}]);
    setCartOpen(true);
  };
  const openWhatsApp = (message:string) => window.open(whatsappUrl(message),"_blank","noopener,noreferrer");
  const submitReservation = (e:React.FormEvent) => {
    e.preventDefault();
    setReservationStatus("Demo request prepared. No real reservation has been created or confirmed.");
  };
  const submitOrder = (e:React.FormEvent) => {
    e.preventDefault();
    setOrderStatus("");
    setPaymentState("");
    setCheckoutOpen(false);
    setCartOpen(false);
    setOrderStatus("Demo order submitted locally only. It has not been sent to VIMA or accepted.");
  };
  const navLinks = ["About","Menu","Order","Reservations","Gallery","Reviews","Contact"];
  const scrollTo = (id:string) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMobileOpen(false); };

  return <div className="site-shell">
    <div className="demo-banner"><span><strong>DEMO PROJECT</strong> · Sample details, menu, prices, reviews and interactions are illustrative only.</span><button onClick={()=>scrollTo("demo-note")}>What’s simulated? <ArrowRight size={14}/></button></div>
    <header className="navbar">
      <a className="brand" href="#home" aria-label="VIMA home"><span className="brand-mark">V</span><span><b>VIMA</b><small>INDIAN DINING · DEMO</small></span></a>
      <nav className={mobileOpen?"nav-links open":"nav-links"} aria-label="Main navigation">
        {navLinks.map(link=><button key={link} onClick={()=>scrollTo(link.toLowerCase())}>{link}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="btn btn-outline btn-small desktop-only" onClick={()=>scrollTo("reservations")}>Reserve a Table</button>
        <button className="btn btn-gold btn-small" onClick={()=>scrollTo("order")}>Order Online <ArrowRight size={15}/></button>
        <button className="icon-button mobile-menu" aria-label={mobileOpen?"Close menu":"Open menu"} onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X/>:<MenuIcon/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" role="img" aria-label="Illustrative Indian restaurant ambience"></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <span className="eyebrow eyebrow-light"><span className="gold-line"></span> A TASTE OF INDIAN HERITAGE</span>
          <h1>Where Indian Tradition Meets <em>Memorable Dining</em></h1>
          <p>Discover familiar Indian flavours, warm hospitality, and a welcoming dining experience — imagined for this VIMA website demo.</p>
          <div className="hero-buttons">
            <button className="btn btn-gold" onClick={()=>scrollTo("menu")}>Explore Menu <ArrowRight size={17}/></button>
            <button className="btn btn-light-outline" onClick={()=>scrollTo("reservations")}>Reserve a Table</button>
          </div>
          <div className="hero-quick">
            <button onClick={()=>scrollTo("order")}><ShoppingBag size={17}/> Order Online</button>
            <button onClick={()=>openWhatsApp(generalMessage)}><MessageCircle size={17}/> WhatsApp Enquiry</button>
          </div>
        </div>
        <div className="hero-stamp"><span>स्वाद</span><small>Tradition<br/>on every plate</small></div>
        <div className="hero-bottom"><span><MapPin size={14}/> Sikar, Rajasthan · Demo location</span><span><Clock size={14}/> 5:30 AM – 10:00 PM · Demo hours</span></div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="intro-image-wrap"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85" alt="Warm restaurant dining room, illustrative demo image" loading="lazy"/><div className="image-caption"><span>VIMA</span><small>A welcoming dining concept</small></div></div>
        <div className="intro-copy">
          <span className="eyebrow">WELCOME TO VIMA</span><h2>A little tradition.<br/><em>A lot of heart.</em></h2>
          <p className="lead">A restaurant concept inspired by the generous flavours and shared-table spirit of Indian dining.</p>
          <p className="muted">This sample introduction demonstrates how VIMA could tell its story. It is demo copy, not a verified restaurant history. No real owner, founding date, or heritage claims are being made.</p>
          <div className="intro-features"><span><Leaf/> Vegetarian-friendly sample menu</span><span><Utensils/> Dine-in inspired experience</span></div>
          <button className="text-link" onClick={()=>scrollTo("menu")}>Discover the menu <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="menu-section section-wrap" id="menu">
        <SectionTitle eyebrow="MADE FOR SHARING" title="A menu full of favourites" desc="Explore an illustrative menu of Indian classics. All dishes and prices are demo content and can be edited."/>
        <div className="menu-tools">
          <div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes..." aria-label="Search menu"/></div>
          <div className="category-row" role="group" aria-label="Filter menu by category">
            {categories.map(cat=><button key={cat} className={activeCategory===cat?"category active":"category"} onClick={()=>setActiveCategory(cat)}>{cat}</button>)}
          </div>
        </div>
        <div className="menu-grid">
          {filtered.map(item=><article className="menu-card" key={item.id}>
            <div className="menu-photo"><img src={item.image} alt={`${item.name}, illustrative demo food image`} loading="lazy"/>{item.featured&&<span className="photo-label">VIMA PICK · DEMO</span>}</div>
            <div className="menu-card-body"><div className="menu-meta"><span>{item.category}</span><span className="veg"><i/> Vegetarian</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="menu-card-bottom"><b>{inr(item.price)} <small>demo</small></b><button className="add-btn" onClick={()=>addToCart(item)} aria-label={`Add ${item.name} to demo cart`}><Plus size={17}/> Add</button></div></div>
          </article>)}
        </div>
        {filtered.length===0&&<div className="empty-state"><Search/><h3>No dishes found</h3><p>Try another dish name or choose a different category.</p><button className="btn btn-outline" onClick={()=>{setSearch("");setActiveCategory("All")}}>Clear filters</button></div>}
        <p className="demo-footnote"><span>ⓘ</span> Demo menu and illustrative prices only. Confirm actual availability, ingredients, and pricing directly with the restaurant before launch.</p>
      </section>

      <section className="order-section" id="order">
        <div className="order-inner section-wrap">
          <div className="order-copy"><span className="eyebrow eyebrow-light">YOUR FAVOURITES, YOUR WAY</span><h2>Order a little<br/><em>comfort.</em></h2><p>Build a sample basket, choose delivery or takeaway, and experience the demo checkout.</p><div className="order-benefits"><span><Check/> Demo cart calculations</span><span><Check/> Delivery or takeaway selection</span><span><Check/> Mock payment step</span></div><button className="btn btn-gold" onClick={()=>{setCartOpen(true);scrollTo("order")}}>Open Demo Cart <ShoppingBag size={17}/></button></div>
          <div className="order-art"><img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85" alt="Indian meal served in a bowl, illustrative demo image" loading="lazy"/><div className="art-note"><span>THE VIMA TABLE</span><small>Sample dishes · Sample prices</small></div></div>
        </div>
      </section>

      <section className="reservation-section section-wrap" id="reservations">
        <div className="reservation-aside"><span className="eyebrow">MAKE IT A MOMENT</span><h2>Let’s save you<br/><em>a seat.</em></h2><p>Send a reservation request for this demo. It is not connected to live tables or availability.</p><div className="hours-card"><Clock/><div><b>Demo opening hours</b><span>Every day · 5:30 AM – 10:00 PM</span><small>Weekly closing day not specified.</small></div></div><div className="ornament">❦</div></div>
        <form className="reservation-form" onSubmit={submitReservation}>
          <h3>Reservation request</h3><p>Fields marked * are required.</p>
          <div className="form-grid">
            <label>Full name *<input required value={reservation.name} onChange={e=>setReservation({...reservation,name:e.target.value})} placeholder="Your name"/></label>
            <label>Phone number *<input required type="tel" pattern="[0-9+\s()-]{8,18}" value={reservation.phone} onChange={e=>setReservation({...reservation,phone:e.target.value})} placeholder="Your phone"/></label>
            <label>Date *<input required type="date" min={new Date().toISOString().slice(0,10)} value={reservation.date} onChange={e=>setReservation({...reservation,date:e.target.value})}/></label>
            <label>Preferred time *<input required type="time" min="05:30" max="22:00" value={reservation.time} onChange={e=>setReservation({...reservation,time:e.target.value})}/></label>
            <label>Number of guests *<select required value={reservation.guests} onChange={e=>setReservation({...reservation,guests:e.target.value})}>{["1","2","3","4","5","6","7","8","9","10"].map(n=><option key={n} value={n}>{n} {n==="1"?"guest":"guests"}</option>)}</select></label>
            <label className="full">Special requests<textarea value={reservation.notes} onChange={e=>setReservation({...reservation,notes:e.target.value})} placeholder="Any requests? (optional)"/></label>
          </div>
          <button className="btn btn-maroon full-btn" type="submit">Prepare Demo Request <CalendarDays size={17}/></button>
          <button type="button" className="btn btn-outline full-btn" onClick={()=>openWhatsApp(bookingMessage(reservation))}><MessageCircle size={17}/> Continue via WhatsApp</button>
          {reservationStatus&&<div className="status-message" role="status"><Check size={18}/>{reservationStatus}</div>}
          <small className="form-disclaimer">WhatsApp opens only when clicked. Sending a message does not confirm a booking.</small>
        </form>
      </section>

      <section className="gallery-section section-wrap" id="gallery">
        <SectionTitle eyebrow="A FEAST FOR THE EYES" title="A glimpse of the VIMA mood" desc="Illustrative demo visuals of Indian food and dining ambience."/>
        <div className="gallery-grid">{gallery.map((img,i)=><button key={img.src} className={`gallery-tile tile-${i+1}`} onClick={()=>setLightbox(i)} aria-label={`Open gallery image ${i+1}`}><img src={img.src} alt={img.alt} loading="lazy"/><span>View image <ArrowRight size={15}/></span></button>)}</div>
        <p className="demo-footnote centered">All gallery visuals are illustrative and are not photographs of verified VIMA premises or dishes.</p>
      </section>

      <section className="reviews-section" id="reviews"><div className="section-wrap">
        <SectionTitle eyebrow="KIND WORDS, IMAGINED" title="DEMO REVIEWS — NOT REAL CUSTOMER TESTIMONIALS" desc="These sample cards demonstrate a review layout only. They are fictional and do not represent actual customers, Google reviews, ratings, or review counts."/>
        <div className="review-grid">
          {[["“A lovely concept with comforting flavours and a warm, welcoming feel.”","Demo guest"],["“The menu layout makes it easy to discover familiar Indian favourites.”","Demo visitor"],["“A beautiful dining mood with thoughtful details throughout.”","Demo guest"]].map(([quote,name],i)=><article className="review-card" key={i}><div className="stars" aria-label="Decorative sample stars">{[1,2,3,4,5].map(n=><Star key={n} size={15} fill="currentColor"/>)}</div><blockquote>{quote}</blockquote><div className="review-author"><span className="avatar">{name[0]}</span><span><b>{name}</b><small>Illustrative sample · not verified</small></span></div></article>)}
        </div>
        <div className="review-actions"><a className="btn btn-outline" href={googleSearchUrl} target="_blank" rel="noreferrer">Search VIMA on Google Maps <ArrowRight size={16}/></a><small>This is a search link, not a verified business listing or review URL.</small></div>
      </div></section>

      <section className="location-section section-wrap" id="contact">
        <div className="location-copy"><span className="eyebrow">COME SAY NAMASTE</span><h2>Find your way<br/><em>to VIMA.</em></h2><p className="muted">The location below is demo information and may not identify actual restaurant premises.</p>
          <div className="contact-list"><div><span className="contact-icon"><MapPin/></span><span><b>Demo address</b><small>{restaurant.address}</small></span></div><div><span className="contact-icon"><Phone/></span><span><b>Phone</b><small>{restaurant.phoneDisplay}</small></span></div><div><span className="contact-icon"><Clock/></span><span><b>Demo hours</b><small>{restaurant.opening} – {restaurant.closing}; weekly closing day not specified</small></span></div><div><span className="contact-icon"><ShoppingBag/></span><span><b>Service options</b><small>Delivery and takeaway available in this demo</small></span></div></div>
          <div className="contact-buttons"><a className="btn btn-maroon" href={`tel:${restaurant.phone}`}><Phone size={16}/> Call Now</a><button className="btn btn-outline" onClick={()=>openWhatsApp(generalMessage)}><MessageCircle size={16}/> WhatsApp</button><a className="btn btn-outline" href={mapSearchUrl} target="_blank" rel="noreferrer"><MapPin size={16}/> Get Directions</a></div>
          <div className="social-placeholder"><span>Social links: demo placeholders</span><button onClick={()=>alert("Demo only: replace with verified VIMA social profiles.")}>Instagram</button><button onClick={()=>alert("Demo only: replace with verified VIMA social profiles.")}>Facebook</button></div>
        </div>
        <div className="map-card"><iframe title="Google Maps search for demo VIMA address" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.mapQuery)}&output=embed`} referrerPolicy="no-referrer-when-downgrade"></iframe><div className="map-caption"><MapPin/><span><b>VIMA · Demo location</b><small>ABC Street, Sikar, Rajasthan, India</small></span><a href={mapSearchUrl} target="_blank" rel="noreferrer" aria-label="Open demo location in Google Maps"><ArrowRight/></a></div></div>
      </section>

      <section className="demo-note section-wrap" id="demo-note"><div className="note-symbol">!</div><div><span className="eyebrow">BEFORE YOU LAUNCH</span><h3>This is a demonstration website</h3><p>Menu, prices, location, hours, sample reviews, social links, order status and reservation status are not verified live business information. Checkout and payment are simulated in your browser. Replace demo content, connect a secure backend, and verify all business details before production.</p></div></section>
    </main>

    <footer className="footer"><div className="footer-main section-wrap"><div className="footer-brand"><a className="brand brand-light" href="#home"><span className="brand-mark">V</span><span><b>VIMA</b><small>INDIAN DINING · DEMO</small></span></a><p>Where Indian Tradition Meets Memorable Dining.</p><span className="footer-note">A restaurant website demo concept.</span></div><div><h4>Explore</h4>{["About","Menu","Order","Reservations","Gallery"].map(x=><button key={x} onClick={()=>scrollTo(x.toLowerCase())}>{x}</button>)}</div><div><h4>Visit</h4><p>{restaurant.address}</p><p>{restaurant.opening} – {restaurant.closing}</p><a href={mapSearchUrl} target="_blank" rel="noreferrer">Directions <ArrowRight size={14}/></a></div><div><h4>Contact</h4><a href={`tel:${restaurant.phone}`}>{restaurant.phoneDisplay}</a><button onClick={()=>openWhatsApp(generalMessage)}>WhatsApp enquiry</button><small>Social and email links not configured.</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VIMA Demo. Illustrative project only.</span><span>Made with warmth & a little tradition <span className="gold">✦</span></span></div></footer>

    <button className="floating-whatsapp" aria-label="WhatsApp general enquiry" onClick={()=>openWhatsApp(generalMessage)}><MessageCircle/><span>Chat with us</span></button>
    <button className="floating-cart" aria-label={`Open demo cart, ${totalItems} items`} onClick={()=>setCartOpen(true)}><ShoppingBag/><span>Cart</span>{totalItems>0&&<b>{totalItems}</b>}</button>

    {cartOpen&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="side-drawer" role="dialog" aria-modal="true" aria-label="Demo cart"><div className="drawer-head"><div><span className="eyebrow">VIMA DEMO</span><h2>Your basket <small>({totalItems})</small></h2></div><button className="icon-button" onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div>
      {cart.length===0?<div className="empty-state"><ShoppingBag/><h3>Your basket is empty</h3><p>Add a few sample favourites from the menu.</p><button className="btn btn-maroon" onClick={()=>{setCartOpen(false);scrollTo("menu")}}>Browse Menu</button></div>:<>
        <div className="cart-lines">{cart.map(line=><div className="cart-line" key={line.item.id}><img src={line.item.image} alt=""/><div className="cart-line-info"><b>{line.item.name}</b><small>{inr(line.item.price)} each · demo</small><div className="qty-control"><button onClick={()=>updateQty(line.item.id,-1)} aria-label={`Decrease ${line.item.name}`}><Minus size={14}/></button><span>{line.qty}</span><button onClick={()=>updateQty(line.item.id,1)} aria-label={`Increase ${line.item.name}`}><Plus size={14}/></button></div></div><strong>{inr(line.item.price*line.qty)}</strong><button className="remove-btn" onClick={()=>setCart(old=>old.filter(x=>x.item.id!==line.item.id))} aria-label={`Remove ${line.item.name}`}><Trash2 size={16}/></button></div>)}</div>
        <div className="cart-total"><span>Subtotal <small>(demo)</small></span><b>{inr(subtotal)}</b></div><div className="cart-total subdued"><span>Delivery/tax</span><span>Not configured · ₹0</span></div><div className="cart-total grand"><span>Demo total</span><b>{inr(subtotal)}</b></div><p className="cart-disclaimer">No delivery fee, tax, or minimum order has been added. This is not a live order.</p><button className="btn btn-maroon full-btn" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>Continue to Demo Checkout <ArrowRight size={16}/></button><button className="btn btn-outline full-btn" onClick={()=>openWhatsApp(`Hello VIMA (demo), I'd like to enquire about this sample order:\\n${cart.map(l=>`${l.qty} × ${l.item.name} (${inr(l.item.price*l.qty)})`).join("\\n")}\\nSubtotal: ${inr(subtotal)}\\nThis is a demo request; please do not treat it as a confirmed order.`)}><MessageCircle size={16}/> Prepare WhatsApp Order</button>
      </>}
    </aside></div>}

    {checkoutOpen&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setCheckoutOpen(false)}}><section className="checkout-modal" role="dialog" aria-modal="true" aria-label="Demo checkout"><div className="drawer-head"><div><span className="eyebrow">DEMO CHECKOUT</span><h2>Complete your sample order</h2></div><button className="icon-button" onClick={()=>setCheckoutOpen(false)} aria-label="Close checkout"><X/></button></div>
      <div className="payment-alert"><strong>DEMO / TEST PAYMENT — NO REAL MONEY WILL BE CHARGED.</strong><span>This frontend mock does not contact a payment provider and never collects card details.</span></div>
      <form onSubmit={submitOrder}><div className="form-grid"><label>Full name *<input required value={order.name} onChange={e=>setOrder({...order,name:e.target.value})} placeholder="Your name"/></label><label>Phone number *<input required type="tel" pattern="[0-9+\s()-]{8,18}" value={order.phone} onChange={e=>setOrder({...order,phone:e.target.value})} placeholder="Your phone"/></label><label className="full">Order type *<select value={order.type} onChange={e=>setOrder({...order,type:e.target.value})}><option>Delivery</option><option>Takeaway</option></select></label>{order.type==="Delivery"&&<label className="full">Delivery address *<textarea required value={order.address} onChange={e=>setOrder({...order,address:e.target.value})} placeholder="Enter delivery address"/></label>}<label className="full">Special instructions<textarea value={order.notes} onChange={e=>setOrder({...order,notes:e.target.value})} placeholder="Optional"/></label></div>
      <div className="checkout-summary"><h4>Order summary</h4>{cart.map(l=><div key={l.item.id}><span>{l.qty} × {l.item.name}</span><b>{inr(l.item.price*l.qty)}</b></div>)}<div className="summary-total"><span>Total (demo)</span><b>{inr(subtotal)}</b></div></div>
      <label className="payment-choice">Payment demonstration<select value={payment} onChange={e=>setPayment(e.target.value)}><option value="mock">Mock payment — simulated success</option><option value="pending">Mock payment — pending</option><option value="failed">Mock payment — failed</option></select></label>
      <button className="btn btn-maroon full-btn" type="submit">Run Demo Checkout <ArrowRight size={16}/></button>
      <button type="button" className="btn btn-outline full-btn" onClick={()=>openWhatsApp(`Hello VIMA (demo), please note this sample order request.\\nName: ${order.name}\\nPhone: ${order.phone}\\nType: ${order.type}\\n${order.type==="Delivery"?"Address: "+order.address+"\\n":""}Items:\\n${cart.map(l=>`${l.qty} × ${l.item.name}`).join("\\n")}\\nDemo total: ${inr(subtotal)}\\nInstructions: ${order.notes||"None"}\\nThis message is not a confirmed order.`)}><MessageCircle size={16}/> Prepare WhatsApp Order</button>
      </form>
    </section></div>}

    {orderStatus&&<div className="toast" role="status"><Check/>{orderStatus}<button onClick={()=>setOrderStatus("")} aria-label="Dismiss"><X size={16}/></button></div>}
    {lightbox!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={()=>setLightbox(null)}><button className="lightbox-close" onClick={()=>setLightbox(null)} aria-label="Close gallery"><X/></button><button className="lightbox-prev" onClick={e=>{e.stopPropagation();setLightbox((lightbox+gallery.length-1)%gallery.length)}} aria-label="Previous image">‹</button><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} onClick={e=>e.stopPropagation()}/><button className="lightbox-next" onClick={e=>{e.stopPropagation();setLightbox((lightbox+1)%gallery.length)}} aria-label="Next image">›</button><p>{gallery[lightbox].alt}</p></div>}
  </div>;
}
export default App;