import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-profitmax-dark to-profitmax-light">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Profit<span className="text-profitmax-orange">Max</span>
            <sup className="text-sm">®</sup> AI
          </h1>
          <p className="text-gray-300">Crie sua conta</p>
        </div>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
