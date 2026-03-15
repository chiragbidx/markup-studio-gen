import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

export const LayoutFooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-600 rounded-lg border border-secondary" />
              <h3 className="text-2xl">Mailvibe</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link href="mailto:hi@chirag.co" className="opacity-60 hover:opacity-100">
                hi@chirag.co
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Product</h3>
            <div>
              <Link href="#features" className="opacity-60 hover:opacity-100">
                Features
              </Link>
            </div>
            <div>
              <Link href="#pricing" className="opacity-60 hover:opacity-100">
                Pricing
              </Link>
            </div>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Help</h3>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>
            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <Link href="https://github.com/dodiyachirag" className="opacity-60 hover:opacity-100" target="_blank">
                GitHub
              </Link>
            </div>
            <div>
              <Link href="https://x.com/dodiyachirag" className="opacity-60 hover:opacity-100" target="_blank">
                X (Twitter)
              </Link>
            </div>
            <div>
              <Link href="https://linkedin.com/in/chiragdodiya" className="opacity-60 hover:opacity-100" target="_blank">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2026 Mailvibe. <Link
              target="_blank"
              href="https://nextjs.org"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >Built on Next.js
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};