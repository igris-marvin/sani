# ⚙️ Technical Requirements: *Wave Enterprise*  

## 1. System Overview  
*Wave Enterprise* is an e-commerce CMS web application for furniture retail. It enables customers to browse products, manage accounts, and place orders, while administrators manage product listings and oversee operations. Orders are routed via WhatsApp for direct seller communication.  

---

## 2. Functional Requirements  

### Customer Functions  
- **Account Management**  
  - Register, login, logout, and update profile  
  - Age and gender auto-detected from ID input  

- **Shopping Features**  
  - Browse product catalog  
  - View product details (images, description, price)  
  - Add/remove items from cart  
  - Add/remove items from wishlist  
  - Place orders → sent to seller’s WhatsApp  

### Admin Functions  
- **Admin Account Management**  
  - Create and manage admin accounts  

- **Product Management**  
  - Add, edit, delete, and update products  
  - Manage inventory levels  

- **Order Management**  
  - View customer orders  
  - Track order status  

---

## 3. Non-Functional Requirements  
- **Performance**: Pages must load within 2 seconds under normal traffic.  
- **Scalability**: Support up to 10,000 products and 5,000 concurrent users.  
- **Security**:  
  - Role-based access control (customer vs admin)  
  - Encrypted storage of sensitive data  
- **Reliability**: 99% uptime target.  
- **Usability**: Responsive design for desktop and mobile.  
- **Maintainability**: Modular codebase with clear separation of concerns.  

---

## 4. System Architecture  
- **Frontend**: Thymeleaf templates, HTML, Bootstrap 5.3.3, JavaScript  
- **Backend**: Spring Boot 3 (Java)  
- **Database**: MariaDB  
- **Web Server**: Apache Tomcat  
- **IDE**: Visual Studio Code  

---

## 5. Database Requirements  
- **Entities**:  
  - Customer (ID, name, age, gender, email, password, orders, wishlist)  
  - Admin (ID, name, email, password, role)  
  - Product (ID, name, description, category, price, stock, images)  
  - Cart (customer ID, product IDs, quantities)  
  - Wishlist (customer ID, product IDs)  
  - Order (order ID, customer ID, product IDs, status, timestamp)  

- **Constraints**:  
  - Unique IDs for all entities  
  - Referential integrity between customer, cart, wishlist, and orders  

---

## 6. Integration Requirements  
- **WhatsApp API Integration**: Orders must be sent to seller’s WhatsApp business account.  
- **Future Payment Gateway Integration**: Placeholder for PayPal/Stripe integration.  

---

## 7. User Interface Requirements  
- **Customer UI**:  
  - Simple navigation bar (Home, Catalog, Cart, Wishlist, Account)  
  - Product cards with image, name, price, and “Add to Cart/Wishlist” buttons  
  - Checkout page with WhatsApp order confirmation  

- **Admin UI**:  
  - Dashboard with product and order stats  
  - Product CRUD interface  
  - Order tracking panel  

---

## 8. Security Requirements  
- Passwords stored using hashing (e.g., BCrypt)  
- HTTPS for all communications  
- Session management with JWT or Spring Security  
- Role-based access control (RBAC)  

---

## 9. Deployment Requirements  
- **Server Environment**: Tomcat 10+  
- **Database Environment**: MariaDB 10+  
- **Hosting**: Cloud-based or on-premise server  
- **OS Compatibility**: Windows/Linux  

---

## 10. Testing Requirements  
- **Unit Testing**: JUnit for backend logic  
- **Integration Testing**: Spring Boot Test framework  
- **UI Testing**: Selenium or manual testing  
- **Load Testing**: Simulate 5,000 concurrent users  

---

## 11. Timeline (Technical Milestones)  
- **Week 1–2**: Requirements gathering & architecture design  
- **Week 3–6**: Backend development (Spring Boot, DB schema)  
- **Week 7–9**: Frontend development (Thymeleaf, Bootstrap)  
- **Week 10–11**: Integration (WhatsApp API, cart/wishlist)  
- **Week 12**: Testing & deployment  

---

## 12. Roles & Responsibilities  
- **Frontend Developer**: UI design, Thymeleaf templates, Bootstrap styling  
- **Backend Developer**: Spring Boot services, DB integration, API endpoints  
- **Database Admin**: Schema design, optimization, backups  
- **QA Engineer**: Testing (unit, integration, UI, load)  
- **Project Manager**: Timeline tracking, requirement validation  

---

## 13. Limitations  
- No built-in payment gateway (orders via WhatsApp only)  
- Limited personalization (basic ID-based age/gender detection)  
- No advanced recommendation engine yet  
- Scalability beyond 10,000 products requires optimization  

---

## 14. Future Enhancements  
- Payment gateway integration (PayPal, Stripe)  
- AI-powered product recommendations  
- Mobile app version (Android/iOS)  
- Multi-language and multi-currency support  
- Analytics dashboard for admins  

