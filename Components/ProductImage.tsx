"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
    product: Product,
    fill?: boolean,
}

export default function ProductImage({product, fill} : Props) {

  const [loading, setLoading] = useState(true);

  return (
    <>
        {fill
            ? (<Image
                src={product.image}
                alt={product.title}
                fill
                className={`object-contain duration-700 ease-in-out group-hover:opacity-75
                ${loading
                    ? ("blur-2xl scale-110 grayscale")
                    : ("blur-0 scale-100 grayscale-0")}`}
                onLoad={() => setLoading(false)}
                /* le sizes ottimizzano il caricamento dell'immagine facendo si
                che venga prelevata un immagine già più piccola dell'intera larghezza della
                viewport se so che non occuperà tutto lo spazio. */
                sizes="(max-width: 768px) 100vw, 50vw"
                />)
            : (<Image
                src={product.image}
                alt={product.title}
                /* Le proporzioni vengono mantenute sulla base del parametro width di default! */
                width={400}
                /* Sembra che Height sia l'altezza dell'immagine inizialmente recuperata (che poi viene adattata.)
                Meglio mettere un valore simile alle dimensioni effettive dell'immagine che verrà caricata. */
                height={1000}
                /* Se un immagine è individuata come Largest Contentful Paint (ovvero l'elemento che ci mette
                più di tutti ad essere caricato ed è above the fold (ovvero è visibile subito senza scrollare) è
                oppurto impostare a true la priorità in modo da farlo caricare per primo.) */
                priority={true}
                className={`duration-700 ease-in-out group-hover:opacity-75
                ${loading
                    ? ("blur-2xl scale-110 grayscale")
                    : ("blur-0 scale-100 grayscale-0")}`}
                onLoad={() => setLoading(false)}/>)
        }
    </>
  )
}
