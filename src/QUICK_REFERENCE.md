# 🚀 Quick Reference Guide - Citizen Components

## 📦 Import All Components

```tsx
import {
  // Dashboard
  DashboardStats,
  QuickActions,
  RecentActivity,
  
  // Connection
  ConnectionCard,
  ConnectionDetails,
  NewConnectionForm,
  
  // Bill
  BillCard,
  
  // Payment
  PaymentForm,
  PaymentReceipt,
  
  // Grievance
  GrievanceForm,
  
  // Meter Reading
  MeterReadingForm
} from '@/components/modules/citizen';
```

---

## 🎯 Component Usage Examples

### 1. DashboardStats

```tsx
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

### 2. QuickActions

```tsx
<QuickActions />
```

### 3. RecentActivity

```tsx
<RecentActivity
  activities={[
    {
      id: '1',
      type: 'payment',
      title: 'Payment Successful',
      description: 'Bill #12345 paid',
      date: '2025-01-15T10:30:00Z',
      status: 'success',
      link: '/citizen/payments/1'
    }
  ]}
  loading={false}
/>
```

### 4. ConnectionCard

```tsx
<ConnectionCard
  connection={connectionData}
  onViewDetails={(conn) => router.push(`/citizen/connections/${conn.id}`)}
/>
```

### 5. ConnectionDetails

```tsx
<ConnectionDetails
  connection={connectionData}
  onEdit={() => setEditMode(true)}
  onDownloadCertificate={() => downloadPDF()}
/>
```

### 6. NewConnectionForm

```tsx
<NewConnectionForm
  onSubmit={async (data) => {
    const result = await apiService.createConnection(data);
    router.push(`/citizen/connections/${result.id}`);
  }}
  loading={isSubmitting}
/>
```

### 7. BillCard

```tsx
<BillCard
  bill={billData}
  onPay={(bill) => router.push(`/citizen/bills/${bill.id}/pay`)}
  onDownload={(bill) => downloadBillPDF(bill)}
/>
```

### 8. PaymentForm

```tsx
<PaymentForm
  bill={billData}
  onSubmit={async (paymentData) => {
    const payment = await processPayment(paymentData);
    router.push(`/citizen/payments/${payment.id}/receipt`);
  }}
  loading={isProcessing}
/>
```

### 9. PaymentReceipt

```tsx
<PaymentReceipt
  payment={paymentData}
  onDownload={() => downloadReceiptPDF()}
  onPrint={() => window.print()}
  onShare={() => shareReceipt()}
/>
```

### 10. GrievanceForm

```tsx
<GrievanceForm
  connections={[
    { value: 'conn1', label: 'Connection #12345' }
  ]}
  onSubmit={async (data) => {
    const grievance = await registerGrievance(data);
    router.push(`/citizen/grievances/${grievance.id}`);
  }}
  loading={isSubmitting}
/>
```

### 11. MeterReadingForm

```tsx
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
  loading={isSubmitting}
/>
```

---

## 📄 Complete Page Examples

### Dashboard Page

```tsx
'use client';

import {
  DashboardStats,
  QuickActions,
  RecentActivity
} from '@/components/modules/citizen';
import { useDashboard } from '@/hooks/useDashboard';

export default function DashboardPage() {
  const { stats, activities, loading } = useDashboard();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="space-y-6">
        <DashboardStats stats={stats} loading={loading} />
        <QuickActions />
        <RecentActivity activities={activities} loading={loading} />
      </div>
    </div>
  );
}
```

### Connections List Page

```tsx
'use client';

import { ConnectionCard } from '@/components/modules/citizen';
import { useConnections } from '@/hooks/useConnections';
import { useRouter } from 'next/navigation';

export default function ConnectionsPage() {
  const router = useRouter();
  const { connections, loading } = useConnections();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Connections</h1>
        <button onClick={() => router.push('/citizen/connections/new')}>
          New Connection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map(connection => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onViewDetails={(conn) => router.push(`/citizen/connections/${conn.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Connection Details Page

```tsx
'use client';

import { ConnectionDetails } from '@/components/modules/citizen';
import { useConnection } from '@/hooks/useConnection';

export default function ConnectionDetailsPage({ params }: { params: { id: string } }) {
  const { connection, loading } = useConnection(params.id);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <ConnectionDetails
        connection={connection}
        onEdit={() => router.push(`/citizen/connections/${params.id}/edit`)}
        onDownloadCertificate={() => downloadCertificate(params.id)}
      />
    </div>
  );
}
```

### New Connection Page

```tsx
'use client';

import { NewConnectionForm } from '@/components/modules/citizen';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api.service';
import { toast } from 'sonner@2.0.3';

export default function NewConnectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await apiService.createConnection(data);
      toast.success('Application submitted successfully!');
      router.push(`/citizen/connections/${result.id}`);
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">New Water Connection</h1>
      <NewConnectionForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
```

### Bills Page

```tsx
'use client';

import { BillCard } from '@/components/modules/citizen';
import { useBills } from '@/hooks/useBills';
import { useRouter } from 'next/navigation';

export default function BillsPage() {
  const router = useRouter();
  const { bills, loading } = useBills();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Bills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map(bill => (
          <BillCard
            key={bill.id}
            bill={bill}
            onPay={(bill) => router.push(`/citizen/bills/${bill.id}/pay`)}
            onDownload={(bill) => downloadBill(bill)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Payment Page

```tsx
'use client';

import { PaymentForm } from '@/components/modules/citizen';
import { useBill } from '@/hooks/useBill';
import { useRouter } from 'next/navigation';

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { bill, loading } = useBill(params.id);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (paymentData: PaymentData) => {
    setProcessing(true);
    try {
      const payment = await processPayment(paymentData);
      router.push(`/citizen/payments/${payment.id}/receipt`);
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Pay Bill</h1>
      <PaymentForm bill={bill} onSubmit={handleSubmit} loading={processing} />
    </div>
  );
}
```

### Payment Receipt Page

```tsx
'use client';

import { PaymentReceipt } from '@/components/modules/citizen';
import { usePayment } from '@/hooks/usePayment';

export default function ReceiptPage({ params }: { params: { id: string } }) {
  const { payment, loading } = usePayment(params.id);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <PaymentReceipt
        payment={payment}
        onDownload={() => downloadReceiptPDF(payment)}
        onPrint={() => window.print()}
        onShare={() => shareReceipt(payment)}
      />
    </div>
  );
}
```

### New Grievance Page

```tsx
'use client';

import { GrievanceForm } from '@/components/modules/citizen';
import { useConnections } from '@/hooks/useConnections';
import { useRouter } from 'next/navigation';

export default function NewGrievancePage() {
  const router = useRouter();
  const { connections } = useConnections();
  const [loading, setLoading] = useState(false);

  const connectionOptions = connections.map(conn => ({
    value: conn.id,
    label: `${conn.consumerId} - ${conn.address}`
  }));

  const handleSubmit = async (data: GrievanceFormData) => {
    setLoading(true);
    try {
      const grievance = await registerGrievance(data);
      toast.success('Grievance registered successfully!');
      router.push(`/citizen/grievances/${grievance.id}`);
    } catch (error) {
      toast.error('Failed to register grievance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Register Grievance</h1>
      <GrievanceForm
        connections={connectionOptions}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
```

### Meter Reading Page

```tsx
'use client';

import { MeterReadingForm } from '@/components/modules/citizen';
import { useConnections } from '@/hooks/useConnections';
import { useRouter } from 'next/navigation';

export default function MeterReadingPage() {
  const router = useRouter();
  const { connections } = useConnections();
  const [loading, setLoading] = useState(false);

  const connectionOptions = connections
    .filter(conn => conn.meterNumber)
    .map(conn => ({
      value: conn.id,
      label: `${conn.consumerId} - ${conn.address}`,
      meterNumber: conn.meterNumber!,
      previousReading: conn.previousReading || 0
    }));

  const handleSubmit = async (data: MeterReadingData) => {
    setLoading(true);
    try {
      await submitMeterReading(data);
      toast.success('Meter reading submitted successfully!');
      router.push('/citizen/meter-reading/success');
    } catch (error) {
      toast.error('Failed to submit reading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Submit Meter Reading</h1>
      <MeterReadingForm
        connections={connectionOptions}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
```

---

## 🎨 Common Patterns

### With Loading State

```tsx
const { data, loading } = useData();

if (loading) {
  return <ComponentName loading={true} />;
}

return <ComponentName data={data} />;
```

### With Error Handling

```tsx
const handleSubmit = async (data) => {
  try {
    await apiService.create(data);
    toast.success('Success!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### With Router Navigation

```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();

// Navigate after success
router.push('/success-page');

// Go back
router.back();
```

---

## 📚 Helpful Utilities

### Format Functions

```tsx
import { formatDate, formatCurrency, isOverdue, daysRemaining } from '@/lib/utils/format';

// Format date
formatDate('2025-01-15T10:30:00Z') // "Jan 15, 2025"

// Format currency
formatCurrency(1234.56) // "₹1,234.56"

// Check if overdue
isOverdue('2025-01-10') // true/false

// Days remaining
daysRemaining('2025-01-20') // 5
```

### API Service

```tsx
import { apiService } from '@/services/api.service';

// Create connection
await apiService.createConnection(data);

// Get bills
await apiService.getBills(consumerId);

// Process payment
await apiService.processPayment(paymentData);

// Register grievance
await apiService.registerGrievance(data);

// Submit meter reading
await apiService.submitMeterReading(data);
```

---

## 🎯 TypeScript Types

```tsx
import type {
  WaterConnection,
  WaterBill,
  Payment,
  Grievance,
  MeterReading
} from '@/types/common.types';
```

---

## 📱 Responsive Classes

```tsx
// Mobile first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="block md:hidden"

// Spacing
className="space-y-4 md:space-y-6 lg:space-y-8"

// Padding
className="px-4 md:px-6 lg:px-8"
```

---

## 🎉 You're All Set!

All citizen components are ready to use. Just:
1. Import the component
2. Pass the required props
3. Handle callbacks
4. Done! 🚀
