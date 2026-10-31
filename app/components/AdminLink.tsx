"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => setIsAdmin(Boolean(data.isAdmin)))
      .catch(() => setIsAdmin(false));
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
    router.push("/");
    router.refresh();
  };

  const style = "cursor-pointer shadow-lg text-white hover:text-gray-400 hover:underline";

  return isAdmin ? (
    <button onClick={logout} className={style}>
      Logout (Admin)
    </button>
  ) : (
    <Link href="/admin/login" className={style}>
      Admin
    </Link>
  );
}
