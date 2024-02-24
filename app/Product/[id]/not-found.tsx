/* La pagina personalizzata del not found deve avere lo stesso path di quella che
la deve chiamare se è avvenuto l'errore. deve anche necessariamente chiamarsi
not-found. La funzione però che contiene dev'essere chiamata diversamente perchè
non si può usare il trattino per nominare una funzione valida. */

export default function NotFound() {
  /* Attenzione che senza il margin top è nascosto nell'header quanto ritornato da
  questa funzione! */
  return (
    <div className="w-full flex flex-col items-center mt-40">
        <h2>Not found</h2>
        <p>Could not find the requested resource</p>
    </div>
  )
}