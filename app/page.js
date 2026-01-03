import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Ace Your Interviews with{" "}
            <span className="text-purple-400">AI Mock Interviews</span>
          </h1>

          <p className="mb-8 text-lg text-gray-300">
            Practice real interview scenarios, get instant AI feedback, improve
            confidence, and land your dream job faster.
          </p>

          <Link href="/sign-up">
            <Button
              size="lg"
              className="rounded-xl bg-purple-600 px-8 py-6 text-lg font-semibold hover:bg-purple-700"
            >
              Get Started
            </Button>
          </Link>

          <Link href="/sign-in" className="ml-4">
            <Button
              size="lg"
              className="rounded-xl bg-purple-600 px-8 py-6 text-lg font-semibold hover:bg-purple-700"
            >
              Already a user? Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
