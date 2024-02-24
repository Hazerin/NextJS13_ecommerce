import Product from '@/Components/Product';

export default async function page() {

  const res = await fetch("https://fakestoreapi.com/products");
  const products : Product[] = await res.json();

  return (
    <main className='max-w-7xl mx-auto min-h-screen mt-48 xl:px-0'>
      <section className='space-y-10'>
        <h1 className='text-5xl text-center font-bold'>DEALS OF THE DAY</h1>
        <div className='grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <Product key={product.id} product={product}/>
          ))}
        </div>
      </section>
    </main>
  )
}