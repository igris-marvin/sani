import { Button, DropdownMenu, Text, Theme } from "@radix-ui/themes";
import {
  FiBox,
  FiChevronDown,
  FiGrid,
  FiHeart,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const copyrightYear = new Date().getFullYear();

const storeLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

const adminLinks = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/products", label: "Products", icon: FiBox, end: false },
  { to: "/admin/users", label: "Customers", icon: FiUsers, end: false },
];

function ActiveLink({
  to,
  label,
  end = false,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-white text-[#31584b] shadow-sm"
            : "text-slate-600 hover:bg-white/70 hover:text-[#31584b]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export function StoreLayout() {
  const { user, isAdmin, ready, error, logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5ef] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-[#e8e3d9] bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2">
            <span className="grid size-10 place-items-center rounded-xl bg-[#31584b] text-lg font-bold text-white">
              S
            </span>
            <span className="font-semibold tracking-wide text-[#263b32]">Sani Enterprise</span>
          </Link>
          <nav className="hidden items-center gap-2 rounded-xl border border-[#e8e3d9] bg-[#f3f0e8] p-1 lg:flex" aria-label="Main navigation">
            {storeLinks.map((link) => (
              <ActiveLink key={link.to} {...link} end={link.to === "/"} />
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-3">
            <Button asChild variant="ghost" color="gray" aria-label="Shopping cart">
              <Link to="/cart"><FiShoppingCart /></Link>
            </Button>
            <Button asChild variant="ghost" color="gray" aria-label="Wishlist">
              <Link to="/wishlist"><FiHeart /></Link>
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" color="gray">
                  <FiUser /> <span className="hidden sm:inline">{user?.username ?? "Account"}</span>
                  <FiChevronDown />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                {user ? (
                  <>
                    <DropdownMenu.Item asChild>
                      <Link to="/account">My account</Link>
                    </DropdownMenu.Item>
                    {isAdmin && (
                      <DropdownMenu.Item asChild>
                        <Link to="/admin">Admin dashboard</Link>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onSelect={() => void logout()}>
                      <FiLogOut /> Log out
                    </DropdownMenu.Item>
                  </>
                ) : (
                  <>
                    <DropdownMenu.Item asChild>
                      <Link to="/login">Log in</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <Link to="/signup">Create account</Link>
                    </DropdownMenu.Item>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <div className="lg:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" color="gray" aria-label="Open navigation">
                    <FiMenu />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  {storeLinks.map((link) => (
                    <DropdownMenu.Item key={link.to} asChild>
                      <Link to={link.to}>{link.label}</Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </header>
      {error && (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
          <Text color="red" role="alert">Session status: {error}</Text>
        </div>
      )}
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-[#e8e3d9] bg-[#eeece5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {copyrightYear} Sani Enterprise</span>
          <div className="flex gap-5">
            <Link className="hover:text-slate-950" to="/shop">Furniture catalogue</Link>
            <Link className="hover:text-slate-950" to="/contact">Contact</Link>
            <span>{ready ? "Online storefront" : "Checking session..."}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function AdminLayout() {
  const { isAdmin, ready, logout } = useAuth();
  if (!ready) return <main className="p-10 text-center text-slate-600">Checking access...</main>;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <Theme appearance="light" accentColor="grass" grayColor="slate" radius="large">
      <div className="min-h-screen bg-[#f3f2ed] text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
            <Link to="/admin" className="mr-auto flex items-center gap-2 font-semibold">
              <span className="grid size-9 place-items-center rounded-xl bg-[#26332b] text-amber-200">
                <FiShoppingBag />
              </span>
              Sani <span className="font-normal text-slate-400">/ Admin</span>
            </Link>
            <nav className="flex flex-wrap items-center gap-1" aria-label="Admin navigation">
              {adminLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
                      isActive ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  <Icon /> {label}
                </NavLink>
              ))}
            </nav>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="outline" color="gray">
                  Admin tools <FiChevronDown />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item asChild><Link to="/admin/products/new"><FiPlus /> New product</Link></DropdownMenu.Item>
                <DropdownMenu.Item asChild><Link to="/admin/profile"><FiUser /> Profile</Link></DropdownMenu.Item>
                <DropdownMenu.Item asChild><Link to="/admin/register"><FiUsers /> Register admin</Link></DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red" onSelect={() => void logout()}><FiLogOut /> Log out</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Outlet />
        </main>
      </div>
    </Theme>
  );
}
