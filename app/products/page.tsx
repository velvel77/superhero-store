import Link from "next/link";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ShopHeader from "@/components/ui/shop-header";
import { getProducts, getProductsCount } from "@/lib/queries/products";

type RarityFilter = "" | "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
type StatusFilter = "" | "out" | "low" | "in";

export const metadata = {
  title: "Superhero Store - Gear and products",
  description: "Browse our selecion of gear and products.",
};

type SearchParams = Promise<{
  page?: string;
  q?: string;
  rarity?: RarityFilter;
  status?: StatusFilter;
}>;

const PAGE_SIZE = 12;

function formatPrice(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getStockLabel(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock < 10) return "Low stock";
  return "In stock";
}

function getStockClasses(stock: number) {
  if (stock === 0) return "text-secondary-500";
  if (stock < 10) return "text-primary-500";
  return "text-rarity-uncommon";
}

function getRarityClasses(rarity: RarityFilter) {
  switch (rarity) {
    case "LEGENDARY":
      return "bg-primary-500 text-black";
    case "EPIC":
      return "bg-rarity-epic text-white";
    case "RARE":
      return "bg-rarity-rare text-white";
    case "COMMON":
    default:
      return "bg-basic-300 text-black";
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // const session = await getServerSession();

  // if (!session) {
  // 	redirect("/login");
  // }

  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const q = params.q?.trim() ?? "";
  const rarity = (params.rarity ?? "") as RarityFilter;
  const status = (params.status ?? "") as StatusFilter;

  const [products, totalCount] = await Promise.all([
    getProducts({
      page,
      limit: PAGE_SIZE,
      q,
      rarity,
      status,
    }),
    getProductsCount({
      q,
      rarity,
      status,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const makeHref = (nextPage: number) => {
    const qs = new URLSearchParams();

    if (nextPage > 1) qs.set("page", String(nextPage));
    if (q) qs.set("q", q);
    if (rarity) qs.set("rarity", rarity);
    if (status) qs.set("status", status);

    const query = qs.toString();
    return query ? `/products?${query}` : "/products";
  };

  return (
    <div className="min-h-screen bg-basic-900 text-basic-100">
      <ShopHeader />
      <div className="mx-auto max-w-375 px-6 py-8 xl:px-8">
        <div className="mb-8 flex flex-col gap-4 border border-ui-border bg-basic-800 p-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-secondary-500">
              Inventory dashboard
            </p>
            <h1 className="text-3xl font-black uppercase italic text-basic-100">
              Products
            </h1>
            <p className="mt-2 text-sm text-basic-300">
              Welcome superhero!
              {/* Welcome {session.user?.name} */}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="border border-ui-border bg-basic-700 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
                Total
              </p>
              <p className="mt-1 text-2xl font-black">{totalCount}</p>
            </div>

            <div className="border border-ui-border bg-basic-700 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
                Page
              </p>
              <p className="mt-1 text-2xl font-black">
                {page}/{totalPages}
              </p>
            </div>

            <div className="border border-ui-border bg-basic-700 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
                Showing
              </p>
              <p className="mt-1 text-2xl font-black">{products.length}</p>
            </div>
          </div>
        </div>

        <form
          action="/products"
          method="GET"
          className="mb-8 grid gap-4 border border-ui-border bg-basic-800 p-5 lg:grid-cols-[1fr_180px_180px_auto_auto]"
        >
          <div>
            <label
              htmlFor="q"
              className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
            >
              Search
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Search by name..."
              className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none placeholder:text-basic-400"
            />
          </div>

          <div>
            <label
              htmlFor="rarity"
              className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
            >
              Rarity
            </label>
            <select
              id="rarity"
              name="rarity"
              defaultValue={rarity}
              className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none"
            >
              <option value="">All</option>
              <option value="COMMON">Common</option>
              <option value="RARE">Rare</option>
              <option value="EPIC">Epic</option>
              <option value="LEGENDARY">Legendary</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
            >
              Stock
            </label>
            <select
              id="status"
              name="status"
              defaultValue={status}
              className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none"
            >
              <option value="">All</option>
              <option value="in">In stock</option>
              <option value="low">Low stock</option>
              <option value="out">Out of stock</option>
            </select>
          </div>

          <button
            type="submit"
            className="h-fit self-end border border-ui-border bg-secondary-500 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
          >
            Apply
          </button>

          <Link
            href="/products"
            className="h-fit self-end border border-ui-border bg-basic-700 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-basic-100"
          >
            Reset
          </Link>
        </form>

        {products.length === 0 ? (
          <div className="border border-ui-border bg-basic-800 px-6 py-16 text-center">
            <h2 className="text-2xl font-black uppercase">No products found</h2>
            <p className="mt-2 text-basic-300">
              Try a different search or clear the filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="catalog-hover overflow-hidden border border-ui-border bg-basic-800"
                >
                  <div className="benday-dots relative aspect-[0.82/1] overflow-hidden bg-basic-900">
                    <div className="absolute left-3 top-3 z-10">
                      <span
                        className={`px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${getRarityClasses(
                          product.rarity as RarityFilter,
                        )}`}
                      >
                        {product.rarity}
                      </span>
                    </div>

                    <img
                      src={
                        product.image_url ||
                        "https://placehold.co/700x850/111827/ffffff?text=Product"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h2 className="text-lg font-black uppercase leading-tight text-basic-100">
                        {product.name}
                      </h2>
                      <span className="text-xs text-basic-400">
                        #{product.id}
                      </span>
                    </div>

                    <p className="mb-4 min-h-10 text-sm text-basic-300">
                      {product.description || "No description available."}
                    </p>

                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="border border-ui-border bg-basic-700 p-3">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
                          Price
                        </p>
                        <p className="mt-1 text-lg font-black text-primary-500">
                          {formatPrice(Number(product.price))}
                        </p>
                      </div>

                      <div className="border border-ui-border bg-basic-700 p-3">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
                          Stock
                        </p>
                        <p
                          className={`mt-1 text-sm font-black uppercase ${getStockClasses(
                            product.stock,
                          )}`}
                        >
                          {getStockLabel(product.stock)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-basic-400">
                        Quantity:{" "}
                        <span className="font-bold text-basic-100">
                          {product.stock}
                        </span>
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="border border-ui-border bg-basic-700 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-basic-100"
                        >
                          View
                        </Link>
                        <Link
                          href={`/products/${product.id}/edit`}
                          className="border border-ui-border bg-basic-700 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-basic-100"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Link
                href={makeHref(Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={`min-w-11 border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] ${
                  page === 1
                    ? "pointer-events-none border-ui-border bg-basic-700 text-basic-400 opacity-40"
                    : "border-ui-border bg-basic-700 text-basic-100"
                }`}
              >
                Prev
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={makeHref(pageNumber)}
                    className={`min-w-11 border px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] ${
                      page === pageNumber
                        ? "border-secondary-500 bg-secondary-500/15 text-basic-100"
                        : "border-ui-border bg-basic-700 text-basic-100"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                ),
              )}

              <Link
                href={makeHref(Math.min(totalPages, page + 1))}
                aria-disabled={page === totalPages}
                className={`min-w-11 border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] ${
                  page === totalPages
                    ? "pointer-events-none border-ui-border bg-basic-700 text-basic-400 opacity-40"
                    : "border-ui-border bg-basic-700 text-basic-100"
                }`}
              >
                Next
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
