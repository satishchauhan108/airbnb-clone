import { isDemoMode } from "@/lib/demo";
import { headers } from "next/headers";

export async function getCurrentUser() {
  if (isDemoMode()) return null;

  const { auth } = await import("@/lib/auth");
  const prisma = (await import("@/lib/prisma")).default;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      image: true,
      favoriteIds: true,
    },
  });

  return user;
}
