import Badge from "@/components/ui/Badge";
import Link from "next/link";

function Cart() {
  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-xl border border-divider bg-background-paper/50 hover:bg-primary-main/5 text-text-secondary hover:text-primary-main transition-all duration-300 flex items-center justify-center group hover:shadow-sm"
      aria-label="Shopping Cart"
    >
      <Badge badgeContent={2} color="error">
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </Badge>
    </Link>
  );
}

export default Cart;
