import { Product, Category } from "@/lib/types";
import Image from "next/image";
import { FilePenLine, Trash } from "lucide-react";
import ProductTablePagination from "./product-table-pagination";
import Link from "next/link";
import {
  getSearchParamsAsNumber,
  getSearchParamsAsString,
} from "@/utils/getSearchParams";
import { getProductsFromParams } from "@/lib/db";
import { ProductActions } from "@/components/ui/delete-actions";
import { API_URL } from "@/lib/config";

const thStyle = "p-4 text-sm font-semibold text-basic-300";
const tdStyle =
  "border-t border-ui-border text-center p-4 text-ellipsis truncate";


const getColourFromAvailabilityStatus = (
  stock: number,
): string => {
  if (stock === 0) {
    return "text-secondary-500";
  } else if ((stock ?? 0) < 45) {
    return "text-orange-500";
  } else {
    return "text-green-500";
  }
};

function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export default async function ProductTable({searchParams, total}: {searchParams: Promise<{ [key: string]: string | string[] | undefined}>; total: number}) {
  const { page = "1", limit = "5", q = "" } = await searchParams;

  const totalPages = Math.ceil((total)/5);

  const currentLimit = getSearchParamsAsString(limit);
  const currentPage = getSearchParamsAsString(page);
  const currentQuery = getSearchParamsAsString(q);
  console.log(currentLimit, currentPage, q);

  
    const { products, pages } = await getProductsFromParams(
    currentLimit ?? "",
    currentPage ?? "",
    currentQuery ?? "",
  );
  

  
  const categories: Category[] = await fetch(`${API_URL}/categories`)
    .then((res) => res.json());

  return (
    <div className="border border-ui-border rounded-2xl">
      <table className="w-full overflow-hidden rounded-2xl table-fixed">
        <thead className="bg-basic-700">
          <tr className="">
            <th className={`${thStyle} w-[30%]`}>Product</th>
            <th className={`${thStyle}`}>Category</th>
            <th className={`${thStyle}`}>Price</th>
            <th className={`${thStyle}`}>Stock</th>
            <th className={`${thStyle}`}>Status</th>
            <th className={`${thStyle}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-basic-800">
              <td className={`${tdStyle} text-start`}>
                <div className="flex">
                  <Image
                    className="mr-4 rounded-2xl"
                    alt="product icon"
                    unoptimized={true}
                    width={50}
                    height={50}
                    src={product.thumbnail}
                  ></Image>
                  <div>
                    <span className="block font-medium">{product.title}</span>
                    <span className="block font-normal text-basic-300 text-sm">
                      {`SKU: ${product.sku}`}
                    </span>
                  </div>
                </div>
              </td>


              <td className={`${tdStyle}`}>
                {
                  categories.find(cat => cat.id === product.categoryId)?.name
                  ?? titleCaseWord(product.tags![0])
                  ?? ""
                }
              </td>
              <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
              <td className={`${tdStyle}`}>{product.stock}</td>
         
            <td
              className={`${tdStyle} ${getColourFromAvailabilityStatus(product.stock ?? 0)}`}
            >
              {(product.stock ?? 0) === 0
                ? "Out of Stock"
                : (product.stock ?? 0) < 45
                ? "Low Stock"
                : "In Stock"}
            </td>
              <td className={`${tdStyle}`}>
              
                <Link href={`/products/edit/${product.id}`}>
                  <button type="button" className="mr-1">
                    <FilePenLine color="yellow" size={24} />
                  </button>
                </Link>

                 <ProductActions id={String(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-basic-700 border-t border-t-border rounded-b-2xl">
        <ProductTablePagination totalPages={pages}></ProductTablePagination>
      </div>
    </div>
  );
}
