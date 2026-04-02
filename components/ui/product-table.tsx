// import { Product, Category } from "@/lib/types";
// import Image from "next/image";
// import { FilePenLine, Trash } from "lucide-react";
// import ProductTablePagination from "./product-table-pagination";
// import Link from "next/link";
// import {
//   getSearchParamsAsNumber,
//   getSearchParamsAsString,
// } from "@/utils/getSearchParams";
// import { getProductsFromParams } from "@/lib/db";
// import { ProductActions } from "@/components/ui/delete-actions";
// import { API_URL } from "@/lib/config";
// import { getProducts } from "@/lib/queries/products";

// const thStyle = "p-4 text-sm font-semibold text-basic-300";
// const tdStyle =
//   "border-t border-ui-border text-center p-4 text-ellipsis truncate";

// const getColourFromAvailabilityStatus = (
//   stock: number,
// ): string => {
//   if (stock === 0) {
//     return "text-secondary-500";
//   } else if ((stock ?? 0) < 10) {
//     return "text-orange-500";
//   } else {
//     return "text-green-500";
//   }
// };

// function titleCaseWord(word: string) {
//   if (!word) return word;
//   return word[0].toUpperCase() + word.substring(1).toLowerCase();
// }

// export default async function ProductTable({ searchParams, total }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; total: number }) {
//   const { page = "1", limit = "5", q = "" } = await searchParams;

//   const totalPages = Math.ceil((total) / 5);

//   const currentLimit = getSearchParamsAsString(limit);
//   const currentPage = getSearchParamsAsString(page);
//   const currentQuery = getSearchParamsAsString(q);
//   console.log(currentLimit, currentPage, q);

//   const products = await getProducts();

//   return (
//     <div className="border border-ui-border rounded-2xl">
//       <table className="w-full overflow-hidden rounded-2xl table-fixed">
//         <thead className="bg-basic-700">
//           <tr className="">
//             <th className={`${thStyle} w-[30%]`}>Product</th>
//             <th className={`${thStyle}`}>Category</th>
//             <th className={`${thStyle}`}>Price</th>
//             <th className={`${thStyle}`}>Stock</th>
//             <th className={`${thStyle}`}>Status</th>
//             <th className={`${thStyle}`}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id} className="bg-basic-800">
//               <td className={`${tdStyle} text-start`}>
//                 <div className="flex">
//                   <Image
//                     className="mr-4 rounded-2xl"
//                     alt="product icon"
//                     unoptimized={true}
//                     width={50}
//                     height={50}
//                     src={product.image_url || "https://placehold.co/50x50"}
//                   ></Image>
//                   <div>
//                     <span className="block font-medium">{product.title}</span>
//                     <span className="block font-normal text-gray-400 text-sm">
//                       {`SKU: ${product.id}`}
//                     </span>
//                   </div>
//                 </div>
//               </td>

//               <td className={`${tdStyle}`}>{product.rarity}</td>
//               <td className={`${tdStyle}`}> {`${product.price} kr`}</td>
//               <td className={`${tdStyle}`}>{product.stock}</td>

//               <td
//                 className={`${tdStyle} ${getColourFromAvailabilityStatus(product.stock ?? 0)}`}
//               >
//                 {(product.stock ?? 0) === 0
//                   ? "Out of Stock"
//                   : (product.stock ?? 0) < 10
//                     ? "Low Stock"
//                     : "In Stock"}
//               </td>
//               <td className={`${tdStyle}`}>

//                 <Link href={`/products/edit/${product.id}`}>
//                   <button type="button" className="mr-1">
//                     <FilePenLine color="yellow" size={24} />
//                   </button>
//                 </Link>

//                 <ProductActions id={String(product.id)} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="p-4 bg-gray-50 border-t border-t-gray-300 rounded-b-2xl">
//         {/* <ProductTablePagination totalPages={pages}></ProductTablePagination> */}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { FilePenLine } from "lucide-react";
import ProductTablePagination from "./product-table-pagination";
import Link from "next/link";
import { getSearchParamsAsString } from "@/utils/getSearchParams";
import { ProductActions } from "@/components/ui/delete-actions";
import { getProducts } from "@/lib/queries/products";

const thStyle = "p-4 text-sm font-semibold text-basic-300";
const tdStyle =
	"border-t border-ui-border text-center p-4 text-ellipsis truncate";

const getColourFromAvailabilityStatus = (stock: number): string => {
	if (stock === 0) {
		return "text-secondary-500";
	}

	if (stock < 10) {
		return "text-primary-500";
	}

	return "text-info-blue-500";
};

export default async function ProductTable({
	searchParams,
	total,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
	total: number;
}) {
	const params = await searchParams;

	const page = getSearchParamsAsString(params.page ?? "1");
	const limit = getSearchParamsAsString(params.limit ?? "5");
	const q = getSearchParamsAsString(params.q ?? "");

	const currentPage = Number(page) || 1;
	const currentLimit = Number(limit) || 5;
	const currentQuery = q;

	const totalPages = Math.ceil(total / currentLimit);

	const products = await getProducts({
		page: currentPage,
		limit: currentLimit,
		q: currentQuery,
	});

	return (
		<div className="border border-ui-border rounded-2xl overflow-hidden">
			<table className="w-full table-fixed">
				<thead className="bg-basic-700">
					<tr>
						<th className={`${thStyle} w-[35%]`}>Product</th>
						<th className={thStyle}>Rarity</th>
						<th className={thStyle}>Price</th>
						<th className={thStyle}>Stock</th>
						<th className={thStyle}>Status</th>
						<th className={thStyle}>Actions</th>
					</tr>
				</thead>

				<tbody>
					{products.map((product) => (
						<tr key={product.id} className="bg-basic-800">
							<td className={`${tdStyle} text-start`}>
								<div className="flex items-center">
									<Image
										className="mr-4 rounded-2xl object-cover"
										alt={product.name}
										unoptimized
										width={50}
										height={50}
										src={
											product.image_url ||
											"https://placehold.co/50x50"
										}
									/>
									<div className="min-w-0">
										<span className="block font-medium text-basic-100 truncate">
											{product.name}
										</span>
										<span className="block font-normal text-basic-400 text-sm">
											SKU: {product.id}
										</span>
									</div>
								</div>
							</td>

							<td className={`${tdStyle} text-basic-100`}>
								{product.rarity}
							</td>
							<td className={`${tdStyle} text-basic-100`}>
								{product.price} kr
							</td>
							<td className={`${tdStyle} text-basic-100`}>
								{product.stock}
							</td>

							<td
								className={`${tdStyle} ${getColourFromAvailabilityStatus(
									product.stock ?? 0,
								)}`}
							>
								{(product.stock ?? 0) === 0
									? "Out of Stock"
									: (product.stock ?? 0) < 10
										? "Low Stock"
										: "In Stock"}
							</td>

							<td className={tdStyle}>
								<Link href={`/products/edit/${product.id}`}>
									<button
										type="button"
										className="mr-2 text-primary-500"
									>
										<FilePenLine size={20} />
									</button>
								</Link>

								<ProductActions id={String(product.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="p-4 bg-basic-800 border-t border-ui-border">
				{totalPages > 1 && (
					<ProductTablePagination totalPages={totalPages} />
				)}
			</div>
		</div>
	);
}