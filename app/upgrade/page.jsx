import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Upgrade Your Experience
          </h1>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            Unlock unlimited interviews, premium features, and priority support.
            Choose the plan that fits your growth.
          </p>
        </div>

        {/* Pricing Card Wrapper */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-10">
          <PricingTable />
        </div>

        {/* Footer Trust Text */}
        <div className="mt-10 text-center text-sm text-neutral-500">
          Cancel anytime • No hidden charges • Secure payments
        </div>
      </div>
    </div>
  );
}
