"use client"

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon
  },
]

export default function NavLinks() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        // 下層のページでもスタイルが変更されるようにする
        // パラメータはusePathname()では含まれない
        const linkSegments = link.href.split('/').filter(Boolean)

        let isActive = pathname === link.href
        if (pathSegments.length >= linkSegments.length && linkSegments.length !== 1) {
          isActive = linkSegments.every((segment, index) => segment === pathSegments[index])
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': isActive,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
