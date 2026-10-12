import { useEffect, useState } from "react";
import { Badge, Button, Heading, Text } from "@radix-ui/themes";
import { motion } from "motion/react";
import { FiBox, FiPlus, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { catalogApi } from "../../api/catalog";
import type { DashboardData } from "../../api/catalog";
import { getErrorMessage } from "../../api/client";
import { CATEGORIES } from "../../data/categories";
import { imageAsset } from "../../assets/images";
import { EmptyState, LoadingState, Notice, PageHeading } from "../../components/ui";

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    catalogApi.dashboard()
      .then(setData)
      .catch((requestError: unknown) => setError(getErrorMessage(requestError, "Could not load the dashboard.")));
  }, []);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!data) return <LoadingState label="Loading dashboard..." />;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeading eyebrow="Store management" title="Dashboard" description="A quick view of the Sani Enterprise catalogue and customer activity." />
      <div className="mb-9 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/products" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-amber-900"><FiBox className="text-xl" /></span>
            <Text color="gray">Catalogue</Text>
          </div>
          <Heading size="7">{data.prods_count}</Heading>
          <Text color="gray">Products listed</Text>
        </Link>
        <Link to="/admin/users" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-900"><FiUsers className="text-xl" /></span>
            <Text color="gray">Customers</Text>
          </div>
          <Heading size="7">{data.users_count}</Heading>
          <Text color="gray">Registered accounts</Text>
        </Link>
      </div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Heading size="5">Products by category</Heading>
          <Text color="gray">Open a category to manage its listings.</Text>
        </div>
        <Button asChild><Link to="/admin/products/new"><FiPlus /> Add a product</Link></Button>
      </div>
      {CATEGORIES.length === 0 ? (
        <EmptyState title="No categories configured" />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.025 }}
            >
              <Link to={`/admin/products?category=${category.key}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                <img src={imageAsset(category.panelImage)} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 text-white">
                  <span className="font-medium">{category.label}</span>
                  <Badge color="gray" variant="solid">{data.category_count_list[category.key] ?? 0}</Badge>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
