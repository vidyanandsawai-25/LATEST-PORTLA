# Citizen Module Components

Comprehensive collection of citizen-facing components for the Water Tax Management System.

## 📂 Component Structure

```
src/components/modules/citizen/
├── index.ts                    # Central export file
│
├── Dashboard Components
│   ├── DashboardStats.tsx      # ✅ Statistics cards
│   ├── QuickActions.tsx        # ✅ Quick action buttons
│   └── RecentActivity.tsx      # ✅ Activity timeline
│
├── Connection Components
│   ├── ConnectionCard.tsx      # ✅ Connection summary card
│   ├── ConnectionDetails.tsx   # ✅ Full connection details
│   └── NewConnectionForm.tsx   # ✅ Multi-step application form
│
├── Bill Components
│   └── BillCard.tsx            # ✅ Bill summary card
│
├── Payment Components
│   ├── PaymentForm.tsx         # ✅ Payment form with multiple methods
│   └── PaymentReceipt.tsx      # ✅ Payment receipt/success page
│
├── Grievance Components
│   └── GrievanceForm.tsx       # ✅ Grievance registration form
│
└── Meter Reading Components
    └── MeterReadingForm.tsx    # ✅ Meter reading submission form
```

## 🎯 Components Overview

### Dashboard Components

#### DashboardStats
Displays key statistics on the citizen dashboard.

```tsx
import { DashboardStats } from '@/components/modules/citizen';

<DashboardStats
  stats={{
    totalConnections: 2,
    activeConnections: 2,
    pendingBills: 1,
    overdueAmount: 5420
  }}
  loading={false}
/>
```

**Props:**
- `stats`: Statistics data object
- `loading`: Optional loading state

#### QuickActions
Quick action buttons for common tasks.

```tsx
import { QuickActions } from '@/components/modules/citizen';

<QuickActions />
```

**Features:**
- New Connection
- View Bills
- Make Payment
- Register Grievance
- Meter Reading
- Track Status

#### RecentActivity
Display recent activities and notifications.

```tsx
import { RecentActivity } from '@/components/modules/citizen';

<RecentActivity
  activities={[
    {
      id: '1',
      type: 'payment',
      title: 'Payment Successful',
      description: 'Bill payment of ₹1,234 completed',
      date: '2025-01-15T10:30:00Z',
      status: 'success',
      link: '/citizen/payments/1'
    }
  ]}
  loading={false}
/>
```

### Connection Components

#### ConnectionCard
Display water connection summary in a card format.

```tsx
import { ConnectionCard } from '@/components/modules/citizen';

<ConnectionCard
  connection={connectionData}
  onViewDetails={(connection) => router.push(`/citizen/connections/${connection.id}`)}
/>
```

**Features:**
- Status badge
- Address details
- Connection type & pipe size
- Meter number
- View details button

#### ConnectionDetails
Comprehensive view of water connection with timeline.

```tsx
import { ConnectionDetails } from '@/components/modules/citizen';

<ConnectionDetails
  connection={connectionData}
  onEdit={() => setEditMode(true)}
  onDownloadCertificate={() => downloadPDF()}
  loading={false}
/>
```

**Features:**
- Personal information
- Address details
- Connection information
- Application timeline
- Download certificate (for active connections)
- Rejection information (if applicable)

#### NewConnectionForm
Multi-step form for new water connection application.

```tsx
import { NewConnectionForm } from '@/components/modules/citizen';

<NewConnectionForm
  onSubmit={async (data) => {
    await submitApplication(data);
  }}
  loading={false}
/>
```

**Steps:**
1. Personal Details (Name, Mobile, Email, Aadhar)
2. Address Details (Complete address, Ward, Zone)
3. Property Details (Property ID, Type, Connection Type, Pipe Size)
4. Documents (Aadhar, Property Document, Photo)

### Bill Components

#### BillCard
Display water bill summary with payment options.

```tsx
import { BillCard } from '@/components/modules/citizen';

<BillCard
  bill={billData}
  onPay={(bill) => router.push(`/citizen/bills/${bill.id}/pay`)}
  onDownload={(bill) => downloadBillPDF(bill)}
/>
```

**Features:**
- Bill status badge
- Amount summary
- Consumption details
- Due date warnings
- Charges breakdown
- Pay now & download buttons

### Payment Components

#### PaymentForm
Form for making bill payments with multiple payment methods.

```tsx
import { PaymentForm } from '@/components/modules/citizen';

<PaymentForm
  bill={billData}
  onSubmit={async (paymentData) => {
    const result = await processPayment(paymentData);
    router.push(`/citizen/payments/${result.id}/receipt`);
  }}
  loading={false}
/>
```

**Payment Methods:**
- Credit/Debit Card
- UPI
- Net Banking
- Wallet (Paytm, PhonePe, Google Pay, Amazon Pay)

#### PaymentReceipt
Display and print payment receipt.

```tsx
import { PaymentReceipt } from '@/components/modules/citizen';

<PaymentReceipt
  payment={paymentData}
  onDownload={() => downloadReceiptPDF()}
  onPrint={() => window.print()}
  onShare={() => shareReceipt()}
/>
```

**Features:**
- Success message
- Formatted receipt
- Payment details
- Bill details
- Amount breakdown
- Download PDF, Print, Share options

### Grievance Components

#### GrievanceForm
Form for registering new grievances.

```tsx
import { GrievanceForm } from '@/components/modules/citizen';

<GrievanceForm
  connections={[
    { value: 'conn1', label: 'Connection #12345' }
  ]}
  onSubmit={async (data) => {
    const grievance = await registerGrievance(data);
    router.push(`/citizen/grievances/${grievance.id}`);
  }}
  loading={false}
/>
```

**Categories:**
- Billing Issues
- Water Supply
- Connection Issues
- Service Request

**Features:**
- Connection selection
- Category/Sub-category selection
- Priority selection
- File attachments (up to 3 files)
- Contact information

### Meter Reading Components

#### MeterReadingForm
Form for submitting meter readings.

```tsx
import { MeterReadingForm } from '@/components/modules/citizen';

<MeterReadingForm
  connections={[
    {
      value: 'conn1',
      label: 'Connection #12345',
      meterNumber: 'MTR123456',
      previousReading: 125.5
    }
  ]}
  onSubmit={async (data) => {
    await submitMeterReading(data);
    router.push('/citizen/meter-reading/success');
  }}
  loading={false}
/>
```

**Features:**
- Connection selection
- Previous reading display
- Current reading input
- Automatic consumption calculation
- Meter photo upload (required)
- Camera capture or file upload
- Remarks field

## 🎨 Design Features

### Consistent Styling
- Tailwind CSS for styling
- Responsive design (mobile-first)
- Professional color scheme
- Smooth transitions (CSS only, no Framer Motion)

### User Experience
- Loading states
- Error handling
- Form validation
- Success feedback
- Empty states
- Skeleton loaders

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## 📱 Responsive Design

All components are fully responsive:
- **Mobile** (< 768px): Single column, touch-friendly
- **Tablet** (768px - 1024px): 2-column grid where appropriate
- **Desktop** (> 1024px): Full layout with sidebar

## 🔧 Usage Examples

### Complete Dashboard Page

```tsx
import {
  DashboardStats,
  QuickActions,
  RecentActivity
} from '@/components/modules/citizen';

export default function DashboardPage() {
  const { stats, activities, loading } = useDashboardData();

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>
      
      <DashboardStats stats={stats} loading={loading} />
      
      <QuickActions />
      
      <RecentActivity activities={activities} loading={loading} />
    </div>
  );
}
```

### Connection List Page

```tsx
import { ConnectionCard } from '@/components/modules/citizen';

export default function ConnectionsPage() {
  const { connections, loading } = useConnections();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {connections.map(connection => (
        <ConnectionCard
          key={connection.id}
          connection={connection}
          onViewDetails={(conn) => router.push(`/citizen/connections/${conn.id}`)}
        />
      ))}
    </div>
  );
}
```

## 🚀 Features

✅ **11 Production-Ready Components**
✅ **Zero Dependencies on Framer Motion**
✅ **Fully TypeScript Typed**
✅ **Responsive & Mobile-Friendly**
✅ **Form Validation**
✅ **Loading States**
✅ **Error Handling**
✅ **Accessibility Compliant**
✅ **Clean Code Architecture**
✅ **Reusable & Composable**

## 📋 Next Steps

To use these components in your pages:

1. **Import the component:**
   ```tsx
   import { ComponentName } from '@/components/modules/citizen';
   ```

2. **Pass required props:**
   ```tsx
   <ComponentName prop1={value1} prop2={value2} />
   ```

3. **Handle callbacks:**
   ```tsx
   onSubmit={async (data) => {
     // Process data
     await apiService.create(data);
   }}
   ```

## 🎯 Integration with Next.js Pages

These components are designed to work seamlessly with Next.js 14+ App Router:

```tsx
// app/citizen/dashboard/page.tsx
import { DashboardStats, QuickActions } from '@/components/modules/citizen';

export default async function DashboardPage() {
  // Server-side data fetching
  const stats = await getStats();
  
  return (
    <main>
      <DashboardStats stats={stats} />
      <QuickActions />
    </main>
  );
}
```

## 📞 Support

For questions or issues, refer to:
- Main documentation: `/README.md`
- Type definitions: `/src/types/common.types.ts`
- API services: `/src/services/api.service.ts`
