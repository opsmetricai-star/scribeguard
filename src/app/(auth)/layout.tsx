import { Logo } from "@/components/marketing/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grad-hero grid min-h-screen grid-rows-[auto_1fr]">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8"><Logo /></div>
      <div className="grid place-items-center px-5 pb-16">{children}</div>
    </div>
  );
}
