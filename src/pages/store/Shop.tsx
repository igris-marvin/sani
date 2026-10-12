import { useEffect, useState } from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { motion } from "motion/react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { catalogApi } from "../../api/catalog";
import { customerApi } from "../../api/customer";
import { getErrorMessage } from "../../api/client";
import { CATEGORIES } from "../../data/categories";
import { imageAsset } from "../../assets/images";
import { EmptyState, LoadingState, Notice, PageHeading, Panel } from "../../components/ui";
import type { Product } from "../../types";

export function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeading
        eyebrow="The collection"
        title="Find the piece that feels right."
        description="Browse our catalogue by category. Select a collection to see current availability and pricing."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.025 }}
          >
            <Link
              to={`/shop/${category.key}`}
              className="group block overflow-hidden rounded-2xl border border-[#e7e1d6] bg-white transition hover:border-[#c98756]/60 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#eeece5]">
                <img
                  src={imageAsset(category.image)}
                  alt={category.label}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <span className="font-medium">{category.label}</span>
                <span className="text-sm text-[#a75f35]">Explore</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Browse() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState<{
    category: string | undefined;
    products: Product[];
    error: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const categoryInfo = CATEGORIES.find((item) => item.key === category);

  useEffect(() => {
    let active = true;
    if (!category) {
      return () => { active = false; };
    }
    catalogApi.products(category)
      .then((products) => {
        if (active) setResult({ category, products, error: "" });
      })
      .catch((requestError: unknown) => {
        if (active) setResult({
          category,
          products: [],
          error: getErrorMessage(requestError, "Could not load products."),
        });
      });
    return () => { active = false; };
  }, [category]);

  const currentResult = result?.category === category ? result : null;
  const products = currentResult?.products ?? null;
  const error = currentResult?.error ?? "";

  if (!category) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <EmptyState title="Choose a product category" to="/shop" action="Browse categories" />
      </section>
    );
  }

  const saveTo = async (id: Product["product_id"], destination: "cart" | "wishlist") => {
    if (!user) {
      void navigate("/login");
      return;
    }
    if (!user.roles.includes("CUSTOMER")) {
      setMessage("Admin accounts cannot shop. Log in as a customer.");
      return;
    }
    try {
      if (destination === "cart") {
        await customerApi.addToCart(id);
      } else {
        await customerApi.addToWishlist(id);
      }
      setMessage(destination === "cart" ? "Added to your cart." : "Added to your wishlist.");
      if (destination === "cart") void navigate("/cart");
    } catch (requestError) {
      setMessage(getErrorMessage(requestError, `Could not add this product to your ${destination}.`));
    }
  };

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Notice tone="error">{error}</Notice>
      </section>
    );
  }
  if (!products) return <LoadingState label="Loading products..." />;
  if (!products.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <EmptyState
          title="No products in this collection yet"
          description="Browse another category to see more of the Sani collection."
          to="/shop"
          action="All categories"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link to="/shop" className="mb-3 inline-block text-sm text-slate-600 hover:text-slate-950">← All categories</Link>
          <Heading size="8">{categoryInfo?.label ?? category}</Heading>
          <Text color="gray">{products.length} {products.length === 1 ? "piece" : "pieces"} in this collection</Text>
        </div>
      </div>
      {message && <div className="mb-6"><Notice>{message}</Notice></div>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.product_id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Panel className="h-full overflow-hidden p-0">
              <img
                src={product.product_image}
                alt={product.product_title}
                className="aspect-[4/3] w-full bg-[#eeece5] object-cover"
              />
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <Heading size="4">{product.product_title}</Heading>
                    <Text size="2" color="gray">{product.product_category}</Text>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {product.product_status}
                  </span>
                </div>
                <p className="mb-5 text-xl font-semibold text-[#31584b]">R{product.product_price}</p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    disabled={product.product_status !== "Available"}
                    onClick={() => void saveTo(product.product_id, "cart")}
                  >
                    <FiShoppingCart /> Add to cart
                  </Button>
                  <Button
                    variant="soft"
                    color="gray"
                    aria-label={`Add ${product.product_title} to wishlist`}
                    onClick={() => void saveTo(product.product_id, "wishlist")}
                  >
                    <FiHeart />
                  </Button>
                </div>
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
