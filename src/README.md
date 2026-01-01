# Water Tax Management System (WTMS)

A comprehensive, production-ready web application for municipal water tax assessment, collection, and management.

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Client**: Custom Fetch-based client
- **Database**: PostgreSQL
- **Authentication**: OTP-based (Mobile Number / Consumer ID)

## 📁 Project Structure

```
water-tax-system/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── login/
│   │   │   ├── first-connection/
│   │   │   └── first-grievance/
│   │   ├── citizen/            # Citizen portal routes
│   │   │   ├── dashboard/
│   │   │   ├── connections/
│   │   │   ├── bills/
│   │   │   ├── payments/
│   │   │   ├── meter-reading/
│   │   │   └── grievances/
│   │   ├── officer/            # Officer portal routes
│   │   │   ├── dashboard/
│   │   │   ├── applications/
│   │   │   ├── collection/
│   │   │   └── reports/
│   │   ├── field/              # Field officer routes
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   └── inspections/
│   │   ├── admin/              # Admin panel routes
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── masters/
│   │   │   └── settings/
│   │   ├── api/                # API routes (if needed)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── common/             # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Table.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── modules/            # Feature modules
│   │       └── water-tax/
│   │           ├── ConnectionCard.tsx
│   │           ├── BillCard.tsx
│   │           ├── PaymentForm.tsx
│   │           └── ...
│   ├── config/                 # Configuration
│   │   └── app.config.ts
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useAsync.ts
│   │   └── useLoading.ts
│   ├── lib/                    # Utilities
│   │   ├── api/
│   │   │   └── api-client.ts
│   │   ├── constants/
│   │   │   └── routes.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── format.ts
│   ├── services/               # API services
│   │   └── api.service.ts
│   ├── types/                  # TypeScript types
│   │   ├── common.types.ts
│   │   └── service.types.ts
│   └── middleware.ts           # Next.js middleware
├── database/                   # Database
│   ├── schema.sql
│   ├── migrations/
│   └── seeds/
├── public/                     # Static assets
├── .env.example               # Environment variables example
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd water-tax-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Set up the database**
   ```bash
   # Create database
   createdb water_tax_db
   
   # Run schema
   psql water_tax_db < database/schema.sql
   
   # Run migrations (if any)
   npm run migrate
   
   # Seed data (optional)
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏛️ System Architecture

### Frontend (Next.js)

The frontend is built with Next.js 14+ using the App Router pattern. It features:

- **Server-Side Rendering (SSR)** for improved performance
- **Client-Side Navigation** for smooth user experience
- **OTP-based Authentication** without passwords
- **Role-Based Access Control** (Citizen, Officer, Field Officer, Admin)
- **Responsive Design** for mobile and desktop

### Backend API

The backend should be a separate Node.js/Express API server that:

- Handles authentication (OTP generation/verification)
- Manages database operations
- Integrates with payment gateways
- Sends SMS/Email notifications
- Integrates with Property Tax system

### Database (PostgreSQL)

The database schema includes:

- **Users & Authentication**: Users, OTPs
- **Water Connections**: Applications, Active connections
- **Billing**: Bills, Payments, Meter Readings
- **Grievances**: Complaints and tracking
- **Field Operations**: Tasks, Inspections
- **Master Data**: Zones, Wards, Tariffs, RTS Services
- **Admin**: Audit Logs, System Configuration

## 🔐 Authentication Flow

1. **User enters Mobile Number or Consumer ID**
2. **System sends OTP via SMS**
3. **User enters OTP**
4. **System verifies OTP and creates session**
5. **User is redirected to role-based dashboard**

## 👥 User Roles

### Citizen
- Apply for new water connection
- View connections and bills
- Make payments
- Submit meter readings
- File grievances
- Track application status

### Officer
- Review and approve applications
- Manage billing
- Handle grievance resolution
- View reports and analytics
- Manage collections

### Field Officer
- Complete field inspections
- Verify meter readings
- Install meters
- Complete assigned tasks

### Admin
- Manage users
- Configure system settings
- Manage master data (zones, wards, tariffs)
- View audit logs
- Generate reports

## 📊 Key Features

### 1. Water Connection Management
- New connection applications
- Property tax integration
- Document upload
- Application tracking
- RTS (Right to Service) compliance

### 2. Billing & Payments
- Automated bill generation
- Slab-based tariff calculation
- Multiple payment modes (Online, Cash, Cheque, UPI)
- Payment receipts
- Rebates and penalties

### 3. Meter Reading
- Self-submission by citizens
- Photo upload
- Field officer verification
- Consumption tracking

### 4. Grievance Management
- Multi-category grievances
- Priority-based handling
- Assignment to officers
- RTS timeline tracking
- Status updates

### 5. Field Operations
- Task assignment
- GPS tracking
- Photo documentation
- Completion reports

### 6. Reports & Analytics
- Collection reports
- Connection reports
- RTS compliance reports
- Ward-wise reports
- Outstanding reports

## 🔗 API Integration

### Property Tax Integration

The system integrates with the Property Tax department to:
- Fetch property owner details
- Verify property ownership
- Link water connection to property
- Sync address information

### Payment Gateway Integration

Supports integration with:
- Razorpay
- PayU
- CCAvenue
- Government payment portals

### SMS Gateway Integration

For sending:
- OTP for authentication
- Bill generation notifications
- Payment confirmations
- Grievance updates

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/logout` - Logout

### Connections
- `GET /api/connections` - List connections
- `POST /api/connections` - Create connection
- `GET /api/connections/:id` - Get connection details
- `PUT /api/connections/:id` - Update connection

### Bills
- `GET /api/bills` - List bills
- `POST /api/bills/generate` - Generate bill
- `GET /api/bills/:id` - Get bill details

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment details
- `GET /api/payments/:id/receipt` - Download receipt

### Grievances
- `GET /api/grievances` - List grievances
- `POST /api/grievances` - Create grievance
- `PUT /api/grievances/:id` - Update grievance

## 🔒 Security

- OTP-based authentication (no passwords)
- JWT tokens for session management
- Role-based access control
- API rate limiting
- SQL injection prevention
- XSS protection
- HTTPS only in production
- Audit logging

## 📝 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `SMS_GATEWAY_API_KEY` - SMS provider API key
- `PAYMENT_GATEWAY_KEY_ID` - Payment gateway credentials
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed for use by municipal corporations and government entities.

## 📧 Support

For support and queries:
- Email: watertax@municipality.gov.in
- Helpline: 1800-XXX-XXXX

## 🙏 Acknowledgments

- Municipal Corporation IT Department
- Water Tax Department Officials
- Citizens for feedback and testing
