import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="min-[1px]:hidden min-[800px]:flex flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center justify-center gap-4"
            >
              <Image
                className="h-8 mb-2 rounded-full "
                src={session.user.image as string}
                alt={session.user.name as string}
                referrerPolicy="no-referrer"
                width={32}
                height={32}
              />
              Guest area
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
      <div className="min-[1px]:flex min-[800px]:hidden hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Bars3BottomRightIcon className="h-10 w-10 text-primary-100" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              <DropdownMenuItem>Cabins</DropdownMenuItem>
            </Link>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              <DropdownMenuItem>About</DropdownMenuItem>
            </Link>
            {session?.user ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                <DropdownMenuItem>Guest area</DropdownMenuItem>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:text-accent-400 transition-colors"
              >
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
