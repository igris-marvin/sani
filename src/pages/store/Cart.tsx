import { useCallback, useEffect, useState } from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { customerApi } from "../../api/customer";
import { getErrorMessage } from "../../api/client";
import { EmptyState, LoadingState, Notice, PageHeading, Panel } from "../../components/ui";
import type { CartItem } from "../../types";

export function Cart() {
  const { user, ready } = useAuth();
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setError("");
    try {
      setItems(await customerApi.cart());
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not load your cart."));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    customerApi.cart()
      .then(setItems)
      .catch((requestError: unknown) => {
        setError(getErrorMessage(requestError, "Could not load your cart."));
      });
  }, [user]);

  if (ready && !user) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <EmptyState
          title="Sign in to view your cart"
          to="/login"
          action="Log in"
        />
      </section>
    );
  }
  if (!items) return error ? <div className="mx-auto max-w-7xl px-4 py-10"><Notice tone="error">{error}</Notice></div> : <LoadingState />;

  const total = items.reduce((sum, item) => sum + Number(item.price), 0);
  const removeItem = async (id: CartItem["id"]) => {
    try {
      await customerApi.removeFromCart(id);
      await load();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not remove this item."));
    }
  };
  const orderMessage = [
    "Hi Sani Enterprise, I would like to order:",
    ...items.map((item) => `- ${item.name} (R${item.price})`),
    `Total: R${total.toFixed(2)}`,
  ].join("\n");

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <PageHeading eyebrow="Your selections" title="Your shopping cart" />
      {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
      {!items.length ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse the collection and save a few favourites."
          to="/shop"
          action="Browse the collection"
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Panel key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
              <img src={item.image} alt={item.name} className="size-24 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <Heading size="4">{item.name}</Heading>
                <Text color="gray">Furniture from Sani Enterprise</Text>
              </div>
              <span className="font-semibold text-[#31584b]">R{item.price}</span>
              <Button
                variant="soft"
                color="red"
                aria-label={`Remove ${item.name}`}
                onClick={() => void removeItem(item.id)}
              >
                <FiTrash2 />
              </Button>
            </Panel>
          ))}
          <Panel className="mt-6 flex flex-wrap items-center justify-between gap-5 p-5">
            <div>
              <Text color="gray">Order total</Text>
              <Heading size="6">R{total.toFixed(2)}</Heading>
            </div>
            <Button size="3" asChild>
              <a
                href={`https://wa.me/27658158002?text=${encodeURIComponent(orderMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                Confirm order on WhatsApp
              </a>
            </Button>
          </Panel>
        </div>
      )}
    </section>
  );
}
