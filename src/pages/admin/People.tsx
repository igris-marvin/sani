import { useEffect, useState } from "react";
import type { FormEvent, HTMLInputTypeAttribute } from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { FiUser, FiUserPlus, FiUserX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { adminApi } from "../../api/admin";
import type { AdminProfileData } from "../../api/admin";
import { getErrorMessage } from "../../api/client";
import { EmptyState, FormField, LoadingState, Notice, PageHeading, Panel } from "../../components/ui";
import type { Customer } from "../../types";

export function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [error, setError] = useState("");
  const load = async () => {
    try {
      setCustomers(await adminApi.customers());
      setError("");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not load customers."));
    }
  };
  useEffect(() => {
    let active = true;
    adminApi.customers()
      .then((result) => { if (active) setCustomers(result); })
      .catch((requestError: unknown) => {
        if (active) setError(getErrorMessage(requestError, "Could not load customers."));
      });
    return () => { active = false; };
  }, []);
  const remove = async (customer: Customer) => {
    if (!window.confirm(`Remove customer ${customer.username}?`)) return;
    try {
      await adminApi.removeCustomer(customer.user_id);
      await load();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not remove this customer."));
    }
  };
  return (
    <div>
      <PageHeading eyebrow="People" title="Customers" description="View customer accounts and manage access to the store." />
      {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
      {!customers ? <LoadingState label="Loading customers..." /> : !customers.length ? (
        <EmptyState title="No customers yet" description="Customer accounts will appear here after registration." to="/admin" action="Back to overview" />
      ) : (
        <Panel className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>{["ID", "Username", "Name", "Email", "Added", ""].map((label) => <th key={label} className="px-4 py-3 font-medium">{label}</th>)}</tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.user_id} className="border-t border-slate-200">
                  <td className="px-4 py-3">{customer.user_id}</td>
                  <td className="px-4 py-3 font-medium">{customer.username}</td>
                  <td className="px-4 py-3">{customer.name} {customer.surname}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.date_added}</td>
                  <td className="px-4 py-3 text-right">
                    <Button size="1" variant="soft" color="red" onClick={() => void remove(customer)}>
                      <FiUserX /> Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}

export function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    adminApi.profile()
      .then(setProfile)
      .catch((requestError: unknown) => setError(getErrorMessage(requestError, "Could not load the admin profile.")));
  }, []);
  if (error) return <Notice tone="error">{error}</Notice>;
  if (!profile) return <LoadingState label="Loading profile..." />;
  const fields: [string, string | number][] = [
    ["Account ID", profile.id],
    ["Username", profile.username],
    ["Name", profile.name],
    ["Surname", profile.surname],
    ["Contact", profile.contact],
    ["Email", profile.email],
  ];
  return (
    <section className="mx-auto max-w-2xl">
      <PageHeading eyebrow="Admin tools" title="Your profile" />
      <Panel className="p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          {profile.image ? <img src={profile.image} alt="" className="size-20 rounded-full object-cover" /> : <FiUser className="size-20 text-slate-500" />}
          <div>
            <Heading size="5">{profile.name} {profile.surname}</Heading>
            <Text color="gray">Administrator</Text>
          </div>
        </div>
        <dl className="divide-y divide-slate-200">
          {fields.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]">
              <dt className="text-sm text-slate-500">{label}</dt>
              <dd className="text-sm font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </section>
  );
}

const adminFields: [string, string, HTMLInputTypeAttribute?][] = [
  ["ID number", "id_number"],
  ["Name", "name"],
  ["Surname", "surname"],
  ["Email", "email", "email"],
  ["Contact", "contact", "tel"],
  ["Username", "username"],
  ["Password", "password", "password"],
  ["Profile image", "photo", "file"],
];

export function RegisterAdmin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    const form = event.currentTarget;
    try {
      await adminApi.register(new FormData(form));
      setMessage("Administrator account created.");
      form.reset();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not register this administrator."));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="mx-auto max-w-2xl">
      <PageHeading eyebrow="Admin tools" title="Register an administrator" description="Create an administrator account for a trusted member of your team." />
      <Panel className="p-6 sm:p-8">
        {message && <div className="mb-5"><Notice tone="success">{message}</Notice></div>}
        {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
          {adminFields.map(([label, name, type = "text"]) => (
            <FormField
              key={name}
              label={label}
              name={name}
              type={type}
              accept={type === "file" ? "image/*" : undefined}
              required={name !== "photo"}
              autoComplete={name === "password" ? "new-password" : undefined}
            />
          ))}
          <div className="mt-2 flex justify-end sm:col-span-2">
            <Button type="submit" disabled={submitting}>
              <FiUserPlus /> {submitting ? "Registering..." : "Register administrator"}
            </Button>
          </div>
        </form>
        <Link className="mt-5 inline-block text-sm text-slate-500 hover:text-slate-900" to="/admin">Return to dashboard</Link>
      </Panel>
    </section>
  );
}
