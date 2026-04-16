"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ShopProduct } from "@/lib/queries/products";
import CartButton from "./cart-button";

type Superhero = {
  id: number;
  name: string;
  price: number | null;
  description: string | null;
  superpowers: string | null;
  stats: {
    strength?: number;
    speed?: number;
    intelligence?: number;
    durability?: number;
    energy?: number;
    combat?: number;
    [key: string]: number | undefined;
  } | null;
  image_url: string | null;
  is_available: boolean;
  joined_at: string;
  ranking: "S" | "A" | "B" | "C" | "D" | "E" | "F" | null;
};

type StockFilter = "all" | "in" | "low" | "out";
type AvailabilityFilter = "all" | "available" | "unavailable";
type ContentFilter = "all" | "products" | "superheroes";
type PowerTier = "street" | "city" | "planetary" | "cosmic";

type InitialSearchParams = {
  q?: string;
  page?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  stock?: string;
  availability?: string;
  categories?: string;
  rarities?: string;
  tiers?: string;
};

type Props = {
  products: ShopProduct[];
  superheroes: Superhero[];
  initialSearchParams: InitialSearchParams;
};

type CatalogItem =
  | {
      type: "product";
      id: number;
      name: string;
      description: string | null;
      price: number | null;
      image_url: string | null;
      score: number;
      product: ShopProduct;
    }
  | {
      type: "superhero";
      id: number;
      name: string;
      description: string | null;
      price: number | null;
      image_url: string | null;
      score: number;
      hero: Superhero;
    };

const ITEMS_PER_PAGE = 6;

function formatPrice(value: number | null) {
  if (value == null) return "N/A";

  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getProductScore(product: ShopProduct) {
  return (
    (product.stats.POWER ?? 0) +
    (product.stats.DURABILITY ?? 0) +
    (product.stats.SPECIAL ?? 0)
  );
}

function getHeroScore(hero: Superhero) {
  const stats = hero.stats ?? {};

  return (
    (stats.strength ?? 0) +
    (stats.speed ?? 0) +
    (stats.intelligence ?? 0) +
    (stats.durability ?? 0) +
    (stats.energy ?? 0) +
    (stats.combat ?? 0)
  );
}

function getProductPowerTier(product: ShopProduct): PowerTier {
  const score = getProductScore(product);

  if (score >= 24) return "cosmic";
  if (score >= 19) return "planetary";
  if (score >= 13) return "city";
  return "street";
}

function getHeroPowerTier(hero: Superhero): PowerTier {
  const avg = Math.round(getHeroScore(hero) / 6);

  if (avg >= 80) return "cosmic";
  if (avg >= 65) return "planetary";
  if (avg >= 45) return "city";
  return "street";
}

function getRarityBadgeClasses(rarity: ShopProduct["rarity"]) {
  switch (rarity) {
    case "LEGENDARY":
      return "bg-primary-500 text-black";
    case "EPIC":
      return "bg-rarity-epic text-white";
    case "RARE":
      return "bg-rarity-rare text-white";
    default:
      return "bg-basic-300 text-black";
  }
}

function getRankingBadgeClasses(ranking: Superhero["ranking"]) {
  switch (ranking) {
    case "S":
      return "bg-primary-500 text-black";
    case "A":
      return "bg-secondary-500 text-white";
    case "B":
      return "bg-rarity-rare text-white";
    default:
      return "bg-basic-300 text-black";
  }
}

function parseNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseCsv(value: string | undefined) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ShopPageUI({
  products,
  superheroes,
  initialSearchParams,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allPrices = useMemo(() => {
    return [
      ...products.map((product) => product.price),
      ...superheroes
        .map((hero) => hero.price)
        .filter((price): price is number => price !== null),
    ];
  }, [products, superheroes]);

  const productCategories = useMemo(() => {
    return Array.from(
      new Set(products.flatMap((product) => product.categories)),
    ).sort();
  }, [products]);

  const minDbPrice = useMemo(() => {
    if (!allPrices.length) return 0;
    return Math.min(...allPrices);
  }, [allPrices]);

  const maxDbPrice = useMemo(() => {
    if (!allPrices.length) return 1000;
    return Math.max(...allPrices);
  }, [allPrices]);

  const availableHeroesCount = useMemo(() => {
    return superheroes.filter((hero) => hero.is_available).length;
  }, [superheroes]);

  const readinessPercent = useMemo(() => {
    if (!superheroes.length) return 0;
    return Math.round((availableHeroesCount / superheroes.length) * 100);
  }, [availableHeroesCount, superheroes.length]);

  const initialContentFilter =
    initialSearchParams.type === "all" ||
    initialSearchParams.type === "products" ||
    initialSearchParams.type === "superheroes"
      ? initialSearchParams.type
      : "products";

  const initialStockFilter =
    initialSearchParams.stock === "all" ||
    initialSearchParams.stock === "in" ||
    initialSearchParams.stock === "low" ||
    initialSearchParams.stock === "out"
      ? initialSearchParams.stock
      : "all";

  const initialAvailabilityFilter =
    initialSearchParams.availability === "all" ||
    initialSearchParams.availability === "available" ||
    initialSearchParams.availability === "unavailable"
      ? initialSearchParams.availability
      : "all";

  const initialRarities = parseCsv(initialSearchParams.rarities).filter(
    (item): item is ShopProduct["rarity"] =>
      item === "COMMON" ||
      item === "RARE" ||
      item === "EPIC" ||
      item === "LEGENDARY",
  );

  const initialPowerTiers = parseCsv(initialSearchParams.tiers).filter(
    (item): item is PowerTier =>
      item === "street" ||
      item === "city" ||
      item === "planetary" ||
      item === "cosmic",
  );

  const initialCategories = parseCsv(initialSearchParams.categories).filter(
    (item) => productCategories.includes(item),
  );

  const [search, setSearch] = useState(initialSearchParams.q ?? "");
  const [contentFilter, setContentFilter] =
    useState<ContentFilter>(initialContentFilter);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedRarities, setSelectedRarities] =
    useState<Array<ShopProduct["rarity"]>>(initialRarities);
  const [selectedPowerTiers, setSelectedPowerTiers] =
    useState<PowerTier[]>(initialPowerTiers);
  const [stockFilter, setStockFilter] =
    useState<StockFilter>(initialStockFilter);
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>(initialAvailabilityFilter);
  const [minPrice, setMinPrice] = useState(
    parseNumber(initialSearchParams.minPrice, minDbPrice),
  );
  const [maxPrice, setMaxPrice] = useState(
    parseNumber(initialSearchParams.maxPrice, maxDbPrice),
  );
  const [page, setPage] = useState(
    Math.max(1, parseNumber(initialSearchParams.page, 1)),
  );

  useEffect(() => {
    setMinPrice((prev) => (Number.isFinite(prev) ? prev : minDbPrice));
    setMaxPrice((prev) => (Number.isFinite(prev) ? prev : maxDbPrice));
  }, [minDbPrice, maxDbPrice]);

  const filteredProducts = useMemo(() => {
    if (contentFilter === "superheroes") return [];

    const q = search.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesSearch =
          !q ||
          product.name.toLowerCase().includes(q) ||
          (product.description ?? "").toLowerCase().includes(q) ||
          product.categories.some((category) =>
            category.toLowerCase().includes(q),
          );

        const matchesCategories =
          selectedCategories.length === 0 ||
          product.categories.some((category) =>
            selectedCategories.includes(category),
          );

        const matchesRarity =
          selectedRarities.length === 0 ||
          selectedRarities.includes(product.rarity);

        const matchesPowerTier =
          selectedPowerTiers.length === 0 ||
          selectedPowerTiers.includes(getProductPowerTier(product));

        const matchesStock =
          stockFilter === "all" ||
          (stockFilter === "out" && product.stock === 0) ||
          (stockFilter === "low" && product.stock > 0 && product.stock < 10) ||
          (stockFilter === "in" && product.stock >= 10);

        const matchesPrice =
          product.price >= minPrice && product.price <= maxPrice;

        return (
          matchesSearch &&
          matchesCategories &&
          matchesRarity &&
          matchesPowerTier &&
          matchesStock &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        const rarityRank = {
          LEGENDARY: 4,
          EPIC: 3,
          RARE: 2,
          COMMON: 1,
        };

        const rarityDiff = rarityRank[b.rarity] - rarityRank[a.rarity];
        if (rarityDiff !== 0) return rarityDiff;

        const scoreDiff = getProductScore(b) - getProductScore(a);
        if (scoreDiff !== 0) return scoreDiff;

        return b.price - a.price;
      });
  }, [
    products,
    contentFilter,
    search,
    selectedCategories,
    selectedRarities,
    selectedPowerTiers,
    stockFilter,
    minPrice,
    maxPrice,
  ]);

  const filteredHeroes = useMemo(() => {
    if (contentFilter === "products") return [];

    const q = search.trim().toLowerCase();

    return [...superheroes]
      .filter((hero) => {
        const heroPrice = hero.price ?? 0;

        const matchesSearch =
          !q ||
          hero.name.toLowerCase().includes(q) ||
          (hero.description ?? "").toLowerCase().includes(q) ||
          (hero.superpowers ?? "").toLowerCase().includes(q);

        const matchesPowerTier =
          selectedPowerTiers.length === 0 ||
          selectedPowerTiers.includes(getHeroPowerTier(hero));

        const matchesAvailability =
          availabilityFilter === "all" ||
          (availabilityFilter === "available" && hero.is_available) ||
          (availabilityFilter === "unavailable" && !hero.is_available);

        const matchesPrice = heroPrice >= minPrice && heroPrice <= maxPrice;

        return (
          matchesSearch &&
          matchesPowerTier &&
          matchesAvailability &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        const rankValue = {
          S: 7,
          A: 6,
          B: 5,
          C: 4,
          D: 3,
          E: 2,
          F: 1,
        };

        const rankDiff =
          (rankValue[b.ranking as keyof typeof rankValue] ?? 0) -
          (rankValue[a.ranking as keyof typeof rankValue] ?? 0);

        if (rankDiff !== 0) return rankDiff;

        const scoreDiff = getHeroScore(b) - getHeroScore(a);
        if (scoreDiff !== 0) return scoreDiff;

        return (b.price ?? 0) - (a.price ?? 0);
      });
  }, [
    superheroes,
    contentFilter,
    search,
    selectedPowerTiers,
    availabilityFilter,
    minPrice,
    maxPrice,
  ]);

  const catalogItems = useMemo<CatalogItem[]>(() => {
    const productItems: CatalogItem[] = filteredProducts.map((product) => ({
      type: "product",
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      score: getProductScore(product),
      product,
    }));

    const heroItems: CatalogItem[] = filteredHeroes.map((hero) => ({
      type: "superhero",
      id: hero.id,
      name: hero.name,
      description: hero.description,
      price: hero.price,
      image_url: hero.image_url,
      score: getHeroScore(hero),
      hero,
    }));

    return [...productItems, ...heroItems].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.price ?? 0) - (a.price ?? 0);
    });
  }, [filteredProducts, filteredHeroes]);

  const totalPages = Math.max(
    1,
    Math.ceil(catalogItems.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return catalogItems.slice(start, start + ITEMS_PER_PAGE);
  }, [catalogItems, page]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) params.set("q", search.trim());
    if (contentFilter !== "products") params.set("type", contentFilter);
    if (selectedCategories.length) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedRarities.length) {
      params.set("rarities", selectedRarities.join(","));
    }
    if (selectedPowerTiers.length) {
      params.set("tiers", selectedPowerTiers.join(","));
    }
    if (stockFilter !== "all") params.set("stock", stockFilter);
    if (availabilityFilter !== "all") {
      params.set("availability", availabilityFilter);
    }
    if (minPrice !== minDbPrice) params.set("minPrice", String(minPrice));
    if (maxPrice !== maxDbPrice) params.set("maxPrice", String(maxPrice));
    if (page > 1) params.set("page", String(page));

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [
    search,
    contentFilter,
    selectedCategories,
    selectedRarities,
    selectedPowerTiers,
    stockFilter,
    availabilityFilter,
    minPrice,
    maxPrice,
    page,
    minDbPrice,
    maxDbPrice,
    pathname,
    router,
    searchParams,
  ]);

  function resetFilters() {
    setSearch("");
    setContentFilter("products");
    setSelectedCategories([]);
    setSelectedRarities([]);
    setSelectedPowerTiers([]);
    setStockFilter("all");
    setAvailabilityFilter("all");
    setMinPrice(minDbPrice);
    setMaxPrice(maxDbPrice);
    setPage(1);
  }

  function toggleCategory(category: string) {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  }

  function toggleRarity(rarity: ShopProduct["rarity"]) {
    setPage(1);
    setSelectedRarities((prev) =>
      prev.includes(rarity)
        ? prev.filter((item) => item !== rarity)
        : [...prev, rarity],
    );
  }

  function togglePowerTier(tier: PowerTier) {
    setPage(1);
    setSelectedPowerTiers((prev) =>
      prev.includes(tier)
        ? prev.filter((item) => item !== tier)
        : [...prev, tier],
    );
  }

  return (
    <div className="min-h-screen bg-basic-900 text-basic-100">
      <section className="border-y border-ui-border bg-basic-800">
        <div className="mx-auto max-w-[1580px] px-7 py-0 xl:px-8">
          <div className="relative overflow-hidden border-x border-ui-border bg-basic-800 diagonal-stripes">
            <div className="benday-dots mx-auto grid min-h-[210px] items-center gap-8 px-8 py-10 lg:grid-cols-[1.15fr_0.85fr] xl:px-10">
              <div className="relative">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.42em] text-secondary-500">
                  /// HERO VAULT — GEAR DIVISION ///
                </p>

                <h1 className="text-[44px] font-black uppercase italic leading-[0.88] tracking-tight sm:text-[58px]">
                  <span className="block text-basic-100 [text-shadow:3px_3px_0_rgb(11,15,20)]">
                    Unleash your
                  </span>
                  <span className="block text-primary-500 [text-shadow:3px_3px_0_rgb(185,28,28)]">
                    Inner legend
                  </span>
                </h1>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-[3px] w-12 bg-secondary-500" />
                  <p className="text-[11px] text-basic-300">
                    Premium heroic equipment & tactical gear
                  </p>
                </div>
              </div>

              <div className="relative flex items-start justify-start gap-4 lg:justify-end">
                <div className="absolute -right-5 -top-[30px] hidden h-52 w-52 opacity-50 lg:block">
                  <div className="h-full w-full rounded-full bg-[repeating-conic-gradient(from_0deg,rgba(220,38,38,0.55)_0deg_2deg,transparent_2deg_16deg)]" />
                </div>

                <div className="relative z-10 grid w-full max-w-[410px] grid-cols-3 gap-3">
                  <div className="border border-ui-border-strong bg-basic-700/90 px-4 py-4">
                    <div className="mb-2 text-xs text-secondary-500">◌</div>
                    <div className="text-[28px] font-black leading-none">
                      {availableHeroesCount}
                    </div>
                    <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-basic-400">
                      Heroes equipped
                    </div>
                  </div>

                  <div className="border border-ui-border-strong bg-basic-700/90 px-4 py-4">
                    <div className="mb-2 text-xs text-secondary-500">✦</div>
                    <div className="text-[28px] font-black leading-none">
                      {products.length}
                    </div>
                    <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-basic-400">
                      Gear items
                    </div>
                  </div>

                  <div className="border border-ui-border-strong bg-basic-700/90 px-4 py-4">
                    <div className="mb-2 text-xs text-secondary-500">⚡</div>
                    <div className="text-[28px] font-black leading-none">
                      {readinessPercent}%
                    </div>
                    <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-basic-400">
                      Hero readiness
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1580px] px-7 py-0 xl:px-8">
        <div className="border-x border-ui-border bg-basic-900 px-8 py-7 xl:px-10">
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-[3px] bg-secondary-500" />
              <h2 className="text-[28px] font-black uppercase italic tracking-tight text-basic-100">
                Tactical catalog
              </h2>
            </div>

            <div className="pl-6 text-[10px] uppercase tracking-[0.22em] text-basic-400">
              {catalogItems.length} items • sorted by power rating
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            <aside className="pt-2">
              <div className="mb-7">
                <h3 className="text-[18px] font-black uppercase italic text-basic-100">
                  Filters
                </h3>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-basic-400">
                  Refine your search
                </p>

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products or heroes..."
                  className="mt-4 w-full border-0 border-b border-basic-300/50 bg-transparent px-0 pb-2 pt-1 text-sm text-basic-100 outline-none placeholder:text-basic-400"
                />
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Catalog type
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {(["all", "products", "superheroes"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setContentFilter(item);
                        setPage(1);
                      }}
                      className={`border px-2 py-2 text-[10px] font-black uppercase tracking-[0.12em] ${
                        contentFilter === item
                          ? "border-secondary-500 bg-secondary-500/10 text-basic-100"
                          : "border-ui-border bg-basic-800 text-basic-300"
                      }`}
                    >
                      {item === "all"
                        ? "All"
                        : item === "products"
                          ? "Products"
                          : "Heroes"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Price range
                </h4>

                <div className="space-y-2">
                  <input
                    type="range"
                    min={minDbPrice}
                    max={maxDbPrice}
                    value={minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMinPrice(Math.min(value, maxPrice));
                      setPage(1);
                    }}
                    className="w-full accent-secondary-500"
                  />

                  <input
                    type="range"
                    min={minDbPrice}
                    max={maxDbPrice}
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMaxPrice(Math.max(value, minPrice));
                      setPage(1);
                    }}
                    className="w-full accent-[var(--color-effect-light-blue)]"
                  />

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="bg-basic-700 px-2 py-1 text-[10px] text-basic-300">
                      {formatPrice(minPrice)}
                    </span>
                    <span className="bg-basic-700 px-2 py-1 text-[10px] text-basic-300">
                      {formatPrice(maxPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Affiliation
                </h4>

                <div className="flex flex-wrap gap-2">
                  <button
                    title="All catalog"
                    onClick={() => {
                      setContentFilter("all");
                      setPage(1);
                    }}
                    className={`h-6 w-6 border ${
                      contentFilter === "all"
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-basic-100`}
                  />
                  <button
                    title="Products"
                    onClick={() => {
                      setContentFilter("products");
                      setPage(1);
                    }}
                    className={`h-6 w-6 border ${
                      contentFilter === "products"
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-rarity-rare`}
                  />
                  <button
                    title="Superheroes"
                    onClick={() => {
                      setContentFilter("superheroes");
                      setPage(1);
                    }}
                    className={`h-6 w-6 border ${
                      contentFilter === "superheroes"
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-secondary-500`}
                  />
                  <button
                    title="Legendary"
                    onClick={() => toggleRarity("LEGENDARY")}
                    className={`h-6 w-6 border ${
                      selectedRarities.includes("LEGENDARY")
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-primary-500`}
                  />
                  <button
                    title="Epic"
                    onClick={() => toggleRarity("EPIC")}
                    className={`h-6 w-6 border ${
                      selectedRarities.includes("EPIC")
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-rarity-epic`}
                  />
                  <button
                    title="Available heroes"
                    onClick={() => {
                      setAvailabilityFilter((prev) =>
                        prev === "available" ? "all" : "available",
                      );
                      setPage(1);
                    }}
                    className={`h-6 w-6 border ${
                      availabilityFilter === "available"
                        ? "border-basic-100"
                        : "border-ui-border"
                    } bg-rarity-uncommon`}
                  />
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Power level
                </h4>

                <div className="space-y-1.5">
                  {(
                    [
                      {
                        label: "Street Tier",
                        value: "street",
                      },
                      {
                        label: "City Tier",
                        value: "city",
                      },
                      {
                        label: "Planetary",
                        value: "planetary",
                      },
                      {
                        label: "Cosmic",
                        value: "cosmic",
                      },
                    ] as const
                  ).map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-basic-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPowerTiers.includes(item.value)}
                        onChange={() => togglePowerTier(item.value)}
                        className="accent-secondary-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Gear type
                </h4>

                <div className="space-y-1.5">
                  {productCategories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-basic-300"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="accent-secondary-500"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Stock
                </h4>

                <div className="space-y-1.5">
                  {(
                    [
                      { label: "All", value: "all" },
                      { label: "In Stock", value: "in" },
                      {
                        label: "Low Stock",
                        value: "low",
                      },
                      {
                        label: "Out of Stock",
                        value: "out",
                      },
                    ] as const
                  ).map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-basic-300"
                    >
                      <input
                        type="radio"
                        name="stock-filter"
                        checked={stockFilter === item.value}
                        onChange={() => {
                          setStockFilter(item.value);
                          setPage(1);
                        }}
                        className="accent-secondary-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100">
                  Hero status
                </h4>

                <div className="space-y-1.5">
                  {(
                    [
                      { label: "All", value: "all" },
                      {
                        label: "Available",
                        value: "available",
                      },
                      {
                        label: "Unavailable",
                        value: "unavailable",
                      },
                    ] as const
                  ).map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-basic-300"
                    >
                      <input
                        type="radio"
                        name="availability-filter"
                        checked={availabilityFilter === item.value}
                        onChange={() => {
                          setAvailabilityFilter(item.value);
                          setPage(1);
                        }}
                        className="accent-secondary-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-basic-100 glow-red"
              >
                Reset filters
              </button>
            </aside>

            <div>
              {paginatedItems.length === 0 ? (
                <div className="border border-ui-border bg-basic-800 px-6 py-16 text-center">
                  <h3 className="text-xl font-black uppercase text-basic-100">
                    No results found
                  </h3>
                  <p className="mt-2 text-sm text-basic-300">
                    Try another search or widen the filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                    {paginatedItems.map((item) => {
                      if (item.type === "product") {
                        const product = item.product;

                        return (
                          <Link
                            key={`product-${product.id}`}
                            href={`/products/${product.id}`}
                            className="catalog-hover block overflow-hidden border border-ui-border bg-basic-800"
                          >
                            <div className="benday-dots relative aspect-[0.78/1] overflow-hidden bg-basic-900">
                              <div className="absolute left-2 top-2 z-10 flex gap-2">
                                <span
                                  className={`px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] ${getRarityBadgeClasses(
                                    product.rarity,
                                  )}`}
                                >
                                  {product.rarity}
                                </span>

                                {product.stock > 0 ? (
                                  <span className="bg-primary-500 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-black">
                                    IN
                                  </span>
                                ) : null}
                              </div>

                              <img
                                src={
                                  product.image_url ||
                                  "https://placehold.co/700x850/111827/ffffff?text=Gear"
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="bg-basic-800 px-4 pb-4 pt-3">
                              <p className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-secondary-500">
                                {product.categories[0] || "Misc"}
                              </p>

                              <h3 className="text-[18px] font-black uppercase leading-tight text-basic-100">
                                {product.name}
                              </h3>

                              <p className="mt-1 h-8 overflow-hidden text-[11px] text-basic-300">
                                {product.description ||
                                  "No description available."}
                              </p>

                              <div className="flex justify-between">
                                <div className="mt-2 text-[18px] font-black text-primary-500">
                                  {formatPrice(product.price)}
                                </div>
                                <CartButton
                                  item={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1,
                                    type: "product",
                                    image_url: product.image_url,
                                  }}
                                />
                              </div>
                            </div>
                          </Link>
                        );
                      }

                      const hero = item.hero;

                      return (
                        <Link
                          key={`hero-${hero.id}`}
                          href={`/superheroes/${hero.id}`}
                          className="catalog-hover block overflow-hidden border border-ui-border bg-basic-800"
                        >
                          <div className="benday-dots relative aspect-[0.78/1] overflow-hidden bg-basic-900">
                            <div className="absolute left-2 top-2 z-10 flex gap-2">
                              {hero.ranking ? (
                                <span
                                  className={`px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] ${getRankingBadgeClasses(
                                    hero.ranking,
                                  )}`}
                                >
                                  {hero.ranking}
                                </span>
                              ) : null}

                              <span className="bg-secondary-500 px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white">
                                HERO
                              </span>
                            </div>

                            <img
                              src={
                                hero.image_url ||
                                "https://placehold.co/700x850/111827/ffffff?text=Hero"
                              }
                              alt={hero.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="bg-basic-800 px-4 pb-4 pt-3">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.22em] text-secondary-500">
                              Superhero
                            </p>

                            <h3 className="text-[18px] font-black uppercase leading-tight text-basic-100">
                              {hero.name}
                            </h3>

                            <p className="mt-1 h-8 overflow-hidden text-[11px] text-basic-300">
                              {hero.description || "No description available."}
                            </p>

                            <div className="mt-2 text-[18px] font-black text-primary-500">
                              {formatPrice(hero.price)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="min-w-[44px] border border-ui-border bg-basic-700 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`min-w-[44px] border px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] ${
                            page === pageNumber
                              ? "border-secondary-500 bg-secondary-500/15 text-basic-100"
                              : "border-ui-border bg-basic-700 text-basic-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        setPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={page === totalPages}
                      className="min-w-[44px] border border-ui-border bg-basic-700 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-basic-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
