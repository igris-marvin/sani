import { useCallback, useEffect, useState } from "react";
import { Button, Heading } from "@radix-ui/themes";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { customerApi } from "../../api/customer";
import { getErrorMessage } from "../../api/client";
import { EmptyState, LoadingState, Notice, PageHeading, Panel } from "../../components/ui";
import type { CartItem } from "../../types";

export function Wishlist() {
  const { user, ready } = useAuth();
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    try {
      setItems(await customerApi.wishlist());
      setError("");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not load your wishlist."));
    }
  }, []);
  useEffect(() => {
    if (!user) return;
    customerApi.wishlist()
      .then(setItems)
      .catch((requestError: unknown) => {
        setError(getErrorMessage(requestError, "Could not load your wishlist."));
      });
  }, [user]);

  if (ready && !user) {
    return <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><EmptyState title="Sign in to view your wishlist" to="/login" action="Log in" /></section>;
  }
  if (!items) return error ? <div className="mx-auto max-w-7xl px-4 py-10"><Notice tone="error">{error}</Notice></div> : <LoadingState />;

  const remove = async (id: CartItem["id"]) => {
    try {
      await customerApi.removeFromWishlist(id);
      await load();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not remove this item."));
    }
  };
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <PageHeading eyebrow="Saved pieces" title="Your wishlist" />
      {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
      {!items.length ? (
        <EmptyState title="Your wishlist is waiting" description="Save favourites while browsing the collection." to="/shop" action="Browse the collection" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Panel key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
              <img src={item.image} alt={item.name} className="size-24 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <Heading size="4">{item.name}</Heading>
                <p className="mt-1 text-[#31584b]">R{item.price}</p>
              </div>
              <Button asChild><Link to="/shop">Continue shopping</Link></Button>
              <Button variant="soft" color="red" aria-label={`Remove ${item.name}`} onClick={() => void remove(item.id)}>
                <FiTrash2 />
              </Button>
            </Panel>
          ))}
        </div>
      )}
    </section>
  );
}
