import { Anchor, AtSign, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05050c]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                <Anchor className="h-4 w-4 text-white" />
              </span>
              <span className="font-bold text-white">
                Link<span className="gradient-text-static">Dock</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              One link for everything you are. Built for creators, run on zero
              commission — forever.
            </p>
          </div>

          {[
            { title: "Product", items: ["Features", "Pricing", "Templates", "Analytics"] },
            { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
            { title: "Resources", items: ["Help center", "API docs", "Brand kit", "Status"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} LinkDock. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-zinc-500 transition-colors hover:text-white">
              <AtSign className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-zinc-500 transition-colors hover:text-white">
              <Globe className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
