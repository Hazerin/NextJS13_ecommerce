import ProductImage from '@/Components/ProductImage';
import React from 'react';
import { notFound } from 'next/navigation';

/* Il props che stiamo passando contiene l'indirizzo (ID) della pagina: la parte di
essa che nell'indirizzo della cartella è stata parametrizzata con delle parentesi. */

/* Il campo "searchParams" è giusto che sia vuoto. Ma devo testare se si può omettere. */

 
/* type Props = {
  params: {
    id: string,
  }
  searchParams : {
  }
}


export default function page(props : Props) {

    console.log(props)

  return (
    <div>page</div>
  )
}
*/

/* Migliore alternativa con la destrutturazione */

type Props = {
  params: {
    id: string;
  }
}

export default async function ProductPage({params: {id}} : Props) {

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product : Product = await res.json();
  
    return (
    <div className='mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10'>
      <ProductImage product={product}/>
      {/* divide-y traccia una linea per dividere gli elementi contenuti. Con un numero, come
      divide-y-4 aumenta lo spessore della linea.*/}
      <div className='divide-y'>
        <div className='space-y-2 pb-8'>
          <h1 className='text-2xl md:text-4xl font-bold'>{product.title}</h1>
          <h2 className='text-xl text-gray-600 md:text-3xl font-bold'>${product.price}</h2>
        </div>
        <div>
          <p className='text-xs md:text-sm'>{product.description}</p>
        </div>
      </div>
    </div>
    )
  } catch (error) {
    notFound()    
  } finally {
    console.log("ciao");
  }
}