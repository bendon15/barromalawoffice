import { getMessages } from "@/lib/queries";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const messages = await getMessages();
  return <AdminDashboard initialMessages={messages} />;
}
