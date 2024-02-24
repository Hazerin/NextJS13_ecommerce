import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    /* Devo dargli un colore o un immagine di background altrimenti è abbastanza ovvio che anche se ha indice z più alto
    del resto non copre le cose su cui passa sopra */
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-10 shadow">
      <Link href="/" className="active:scale-95">
        <Image src="https://i.ibb.co/McdzmYG/logo-removebg-preview-new.png"
        width={70} height={70} alt="logo"/>
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600
        hover:bg-transparent hover:text-black">
          Log in
        </button>
        <button className="button bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent">
          Sign up
        </button>
      </div>
    </header>
  )
}