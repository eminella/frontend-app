import CustomerHeader from '@/components/CustomerHeader';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
