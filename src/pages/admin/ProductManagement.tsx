import { useEffect, useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { Badge, Button, Heading, Text } from "@radix-ui/themes";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { catalogApi } from "../../api/catalog";
import type { ProductDetails, ProductOptions } from "../../api/catalog";
import { getErrorMessage } from "../../api/client";
import { EmptyState, FormField, FormSelect, FormTextarea, LoadingState, Notice, Panel, PageHeading } from "../../components/ui";
import type { Product } from "../../types";

function getAdminProducts(category: string | null): Promise<Product[]> {
  return catalogApi.adminProducts(category);
}

function ProductField({
  label,
  name,
  defaultValue,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  defaultValue?: string | number;
}) {
  return <FormField label={label} name={name} defaultValue={defaultValue} {...props} />;
}

export function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [listing, setListing] = useState<{
    category: string | null;
    products: Product[];
  } | null>(null);
  const [error, setError] = useState("");
  const products = listing?.category === category ? listing.products : null;
  useEffect(() => {
    let active = true;
    getAdminProducts(category)
      .then((items) => {
        if (active) {
          setListing({ category, products: items });
          setError("");
        }
      })
      .catch((requestError: unknown) => {
        if (active) setError(getErrorMessage(requestError, "Could not load products."));
      });
    return () => { active = false; };
  }, [category]);

  const remove = async (id: Product["product_id"]) => {
    if (!window.confirm("Remove this product?")) return;
    try {
      await catalogApi.removeProduct(id);
      setListing({ category, products: await getAdminProducts(category) });
      setError("");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not remove this product."));
    }
  };

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <PageHeading eyebrow="Catalogue" title={category ? `Products · ${category.replaceAll("_", " ")}` : "Products"} description="Create and maintain the furniture shown in your storefront." />
        <Button asChild><Link to="/admin/products/new"><FiPlus /> Add product</Link></Button>
      </div>
      {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
      {!products ? <LoadingState label="Loading products..." /> : !products.length ? (
        <EmptyState title={category ? "No products in this category" : "No products yet"} description="Create a listing to add it to the store." to="/admin/products/new" action="Create a product" />
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <Panel key={product.product_id} className="flex flex-wrap gap-5 p-4 sm:flex-nowrap">
              <img src={product.product_image} alt={product.product_title} className="h-40 w-full rounded-xl object-cover sm:w-52" />
              <div className="min-w-0 flex-1 py-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Heading size="4">{product.product_title}</Heading>
                  <Badge color={product.product_status === "Available" ? "green" : "gray"}>{product.product_status}</Badge>
                </div>
                <Text as="p" color="gray">{product.product_category}</Text>
                <p className="mt-3 text-lg font-semibold">R{product.product_price}</p>
                <Text size="2" color="gray">Quantity: {product.product_quantity ?? "—"}</Text>
                {product.product_added_date && <Text as="p" size="1" color="gray">Added {product.product_added_date}</Text>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button asChild variant="soft"><Link to={`/admin/products/${product.product_id}`}><FiEdit2 /> Edit</Link></Button>
                <Button variant="soft" color="red" aria-label={`Remove ${product.product_title}`} onClick={() => void remove(product.product_id)}><FiTrash2 /></Button>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState<ProductOptions | null>(null);
  const [product, setProduct] = useState<ProductDetails>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const requests: Promise<void>[] = [
      catalogApi.options().then((value) => { if (active) setOptions(value); }),
    ];
    if (id) {
      requests.push(catalogApi.product(id).then((value) => { if (active) setProduct(value); }));
    }
    Promise.all(requests).catch((requestError: unknown) => {
      if (active) setError(getErrorMessage(requestError, "Could not load the product form."));
    });
    return () => { active = false; };
  }, [id]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await catalogApi.saveProduct(id, new FormData(event.currentTarget));
      void navigate("/admin/products", { replace: true, state: { message: `Product ${id ? "updated" : "created"}.` } });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not save this product."));
    } finally {
      setSaving(false);
    }
  };

  if (error && !options) return <Notice tone="error">{error}</Notice>;
  if (!options || (id && !product.m_product_id)) return <LoadingState label={id ? "Loading product..." : "Loading form..."} />;

  return (
    <section className="mx-auto max-w-3xl">
      <PageHeading eyebrow="Catalogue" title={id ? "Edit product" : "Create a product"} description="Add the details customers need to find the right piece." />
      <Panel className="p-5 sm:p-8">
        {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
        <form className="grid gap-4" onSubmit={submit}>
          <ProductField label="Product name" name="product_name" defaultValue={product.m_product_name} required />
          <ProductField label="Style" name="style" defaultValue={product.m_style} required />
          <div className="grid gap-4 sm:grid-cols-3">
            <ProductField label="Length" name="length" type="number" step="any" defaultValue={product.m_length} required />
            <ProductField label="Width" name="width" type="number" step="any" defaultValue={product.m_width} required />
            <ProductField label="Height" name="height" type="number" step="any" defaultValue={product.m_height} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ProductField label="Price (ZAR)" name="price" type="number" min="0" step="0.01" defaultValue={product.m_price} required />
            <ProductField label="Quantity" name="quantity" type="number" min="0" step="1" defaultValue={product.m_quantity} required />
          </div>
          <FormSelect label="Category" name="c_category" defaultValue={product.m_category}>
            {options.categories.map((category) => <option key={category} value={category}>{category.replaceAll("_", " ")}</option>)}
          </FormSelect>
          <FormSelect label="Status" name="s_status" defaultValue={product.m_status}>
            {options.statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </FormSelect>
          {id && !!product.images?.length && (
            <div>
              <Text as="p" size="2" color="gray" className="mb-2">Current images</Text>
              <div className="flex flex-wrap gap-2">
                {product.images.map((image) => <img key={image.image_id} src={image.image_data} alt="" className="size-20 rounded-lg object-cover" />)}
              </div>
            </div>
          )}
          <FormField label={id ? "Replace images (optional)" : "Product images"} name="image_files" type="file" accept="image/*" multiple required={!id} />
          <FormTextarea label="Description" name="product_description" rows={5} defaultValue={product.m_product_description} required />
          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <Button type="button" variant="soft" color="gray" onClick={() => navigate("/admin/products")}>Cancel</Button>
            <Button type="reset" variant="outline" color="gray">Reset</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : id ? "Save changes" : "Create product"}</Button>
          </div>
        </form>
      </Panel>
    </section>
  );
}
