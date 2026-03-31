import type { ProductsResponse } from "../lib/types";
import InventoryWidget from "../components/ui/dashboard-widget";
import Sidebar from "@/components/ui/sidebar";
import ProductTable from "@/components/ui/product-table";
import Header from "@/components/ui/header";
import SearchWidget from "../components/ui/search-widget";

const defaultLimit = "6";

export default async function Home(params: PageProps<"/">) {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info


  return (
    <main className="flex flex-row min-h-screen">
      <Sidebar />

      <section className="flex flex-col w-full gap-4 bg-basic-900">
        <Header />
        <div className="pr-4 pl-4 pb-4 flex flex-col gap-4">
          <InventoryWidget />
          <SearchWidget />
          <ProductTable searchParams={params.searchParams} total={10} />
        </div>
      </section>

      {/* <h1>Products</h1>
      <div>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</div> */}
    </main>
  );
}
