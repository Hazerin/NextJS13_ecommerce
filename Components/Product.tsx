import Link from "next/link"
import ProductImage from "@/Components/ProductImage"

type Props = {
    product: Product,
}

export default function Product({product} : Props) {
  return (
    <Link href={`/Product/${product.id}`} prefetch={false}
    className="h-96 border rounded hover:scale-105 duration-200 p-5
    transition-transform ease-out flex flex-col relative">

      {/* il "group" serve a far si che i figli che hanno una
      proprietà contrassegnata con group (ad esempio group-hover:opacity)
      la manifestino quando subisce tale influenza il genitore! */}
      <div className="relative max-h-72 flex-1 group">
        <ProductImage product={product} fill/>
      </div>

      <div className="flex items-center justify-between font-semibold mt-4 mb-1">
        <p className="w-48 truncate">{product.title}</p>
        <p>${product.price}</p>
      </div>
      
      
      <p className="text-xs text-gray-600 line-clamp-2 w-64">{product.description}</p>
    </Link>
  )
}