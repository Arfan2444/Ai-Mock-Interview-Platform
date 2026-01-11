import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Upgrade Your Experience
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Unlock unlimited interviews, premium insights, and priority support.
            Choose the plan that fits your growth.
          </p>
        </div>

        {/* Pricing Wrapper */}
        <div className="relative rounded-2xl border border-black/10 bg-gray-50 p-6 md:p-10 shadow-sm">
          <PricingTable />

          {/* Card watermark */}
          <div className="absolute bottom-4 right-6 text-[10px] text-gray-400 opacity-50 select-none">
            Made by Arfan Pathan
          </div>
        </div>

        {/* Trust Text */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Cancel anytime • No hidden charges • Secure payments
        </div>
      </div>

      {/* Page Watermark */}
      <div className="fixed bottom-4 right-6 text-xs text-gray-500 select-none">
        Made By{" "}
        <span className="font-medium text-gray-700">
          Arfan Pathan
        </span>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/arfanpathan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/Arfan2444"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
