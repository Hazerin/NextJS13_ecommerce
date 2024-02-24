"use client";

import React from "react";
import ProductImage from "@/Components/ProductImage";
import { Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
/* useParams funziona solo se si usa il client */
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Modal() {

  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  /* con useParams recupero i paramatri che vengono passati alla pagina
  non esplicitamente (l'ID del path in questo caso, visto che qui stiamo usando
  le intercepting routes) */
  const id = useParams().id;
  /* Non mi restituisce l'oggetto router, ma i METODI su cui operare su di esso,
  se l'useRouter che sto recoperando è quello di next/navigation! */
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      /* Ri-esegue la funzione ogni volta che cambia il parametro ID */
      setLoading(true);

      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();

      setProduct(product);

      setLoading(false);
    }

    fetchProduct();

  }, [id]);

  return (
    /* Questo modal si può benissimo copiare da headless UI. Attenzione che può essere più che necessario
    cambiare gli stili (classname) del Dialog.Panel esterno.*/
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
          {/* I punti di domanda sono per impedire che la pagina non funzioni
          nel caso non vengano passati parametri, semplicemente non comparirà
          nulla (visto che sto aspettando tra l'altro il risultato da una funzione
          async che è più lenta del resto del codice) */}
          {loading ? (
            <div className="h-8 w-8 rounded-full border-4 border-dotted border-blue-600 animate-spin"></div>
          ) : (
            <div className="flex gap-x-8 h-96">
              {product?.image && (
                <div className="relative w-72 h-full hidden md:inline">
                  <ProductImage product={product} fill />
                </div>
              )}
              <div className="flex flex-col flex-1">
                <div className="flex-1">
                  <h4 className="font-semibold">{product?.title}</h4>
                  <p className="font-medium text-sm">${product?.price}</p>

                  <div className="flex items-center text-sm my-4">
                    <p>{product?.rating.rate}</p>
                    {product?.rating.rate && (
                      <div className="flex items-center ml-2 mr-6">
                        {/* Stelle del rating dorate */}
                        {Array.from(
                          { length: Math.floor(product.rating.rate) },
                          /* Su ogni posizione (primo parametro, che lascio vuota perchè
                          faccio solo un inserimento diretto senza altre operazioni
                          che riguardino la cella dell'array stessa) inserisco qualcosa
                          che usa il numero della cella per fare qualcosa (secondo parametro che
                          verrà usato come chiave)  */
                          (_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          )
                        )}
                        {/* Il resto delle stelle */}
                        {Array.from(
                          { length: 5 - Math.floor(product.rating.rate) },
                          (_, i) => (
                            <StarIconOutline
                              key={i}
                              className="h4 w-4 text-yellow-500"
                            />
                          )
                        )}
                      </div>
                    )}
                    <p className="text-blue-600 hover:underline cursor-not-allowed text-xs">
                      See all {product?.rating.count} reviews
                    </p>
                  </div>
                  <p className="line-clamp-5 text-sm">{product?.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <button className="cursor-not-allowed button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                    Add to bag
                  </button>
                  <button
                    className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                    /* In una funzione callback, posso definire una funzione dov'è attesa come argomento che verrà eseguita
                prima dell'esecuzione di quella chiamante, creandola con la sintassi (argomento) => (funzione) */
                    /* La funzione onClick accetta come argomento un altra funzione, motivo per cui non posso inserire semplicemente
                il metodo "push" come argomento. */
                    /* Devo necessariamente far cosi per ricaricare la pagina, perchè usando
                router.push passando lo stesso indirizzo...non ricarica la pagina!
                Sarebbe meglio usare un metodo del "router" ma non si sa quale (più veloce, probabilmente) */
                    onClick={() => window.location.reload()}
                  >
                    View full details
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
