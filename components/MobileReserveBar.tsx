import { content } from "@/content";

export default function MobileReserveBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cream/15 bg-ink/95 p-3 backdrop-blur-md md:hidden">
      <a href="#visit" className="btn btn-primary w-full">
        {content.mobileReserve}
      </a>
    </div>
  );
}
