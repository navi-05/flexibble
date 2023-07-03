import Image from "next/image"
import Link from "next/link"

import AuthProviders from "./AuthProviders"

import { NavLinks } from "@/constants"
import { getCurrentUser } from "@/libs/session"
import ProfileMenu from "./ProfileMenu"

const Navbar = async() => {

  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">

      <div className="flex-1 flexStart gap-10">
        <Link href='/'>
          <Image 
            src='/logo.svg'
            width={115}
            height={43}
            alt="Flexibble"
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((navLink) => (
            <Link href={navLink.href} key={navLink.key}>
              {navLink.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href='/create-project'>
              Share Work
            </Link> 
          </>
        ) : (
          <AuthProviders />
        )}
      </div>

    </nav>
  )
}

export default Navbar