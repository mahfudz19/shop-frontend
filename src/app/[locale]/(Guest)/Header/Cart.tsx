import Badge from "@/components/ui/Badge";
import Link from "next/link";

function Cart() {
  return (
    <Link
      href="/cart"
      className="relative p-1.5 md:p-2 rounded-full border border-divider hover:bg-primary-main/10 text-text-secondary hover:text-primary-main transition-colors flex items-center justify-center group"
      aria-label="Shopping Cart"
    >
      <Badge badgeContent={undefined} color="error">
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </Badge>
    </Link>
  );
}

export default Cart;
