"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from 'lucide-react';

export default function CreditsPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Credits card */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6 space-y-6">

        {/* Developer */}
        <CreditGroup title="Developer">
          <CreditItem
            name="Szymon Krupienczyk"
            description="Main developer and designer of the app"
          />
        </CreditGroup>

        {/* Audio */}
        <CreditGroup title="Audio">
          <CreditItem
            name="Maciej Nikolak"
            description="Voice actor"
          />
          <CreditItem
            name="Szymon Krupienczyk"
            description="Voice actor"
          />
        </CreditGroup>

        {/* Icons */}
        <CreditGroup title="Icons">
          <CreditItem
            name="Szymon Krupienczyk"
            description="Interface icons"
          />
        </CreditGroup>

        {/* Characters */}
        <CreditGroup title="Mascot">
          <CreditItem
            name="Ellie Hassel"
            description="Mascot design"
          />
        </CreditGroup>

        <CreditGroup title="Characters">
          <CreditItem
            name="Nara/Cemento"
            description="Characters design"
          />
          <Link href="https://www.instagram.com/cemento.cemento/" className="ml-2">
            <Button size="sm" variant="secondary">
              <Instagram />
            </Button>
          </Link>
        </CreditGroup>

        {/* Framework */}
        <CreditGroup title="Framework">
          <CreditItem
            name="Next.js"
            description="App framework"
          />
        </CreditGroup>

        {/* Styling */}
        <CreditGroup title="Styling">
          <CreditItem
            name="TailwindCSS"
            description="Styling and layout"
          />
        </CreditGroup>

      </div>

      <Link href="/">
        <Button variant="secondary" size="lg" className="w-full">
          Back
        </Button>
      </Link>

    </div>
  );
}

function CreditGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase font-bold text-[#9B6DFF] tracking-wide">
        {title}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function CreditItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-bold text-slate-700">
        {name}
      </span>
      <span className="text-sm text-slate-500">
        {description}
      </span>
    </div>
  );
}