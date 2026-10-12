import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { motion } from "motion/react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authApi } from "../../api/auth";
import { customerApi } from "../../api/customer";
import type { AccountData } from "../../api/customer";
import { getErrorMessage } from "../../api/client";
import { FormField, Notice, PageHeading, Panel } from "../../components/ui";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const values = new FormData(event.currentTarget);
    const username = values.get("username");
    const password = values.get("password");
    try {
      if (typeof username !== "string" || typeof password !== "string") {
        throw new Error("Enter your username and password.");
      }
      const currentUser = await login(username, password);
      void navigate(currentUser?.roles.includes("ADMIN") ? "/admin" : "/");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not log in."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <Panel className="p-6 sm:p-9">
        <PageHeading eyebrow="Welcome back" title="Log in" description="Sign in to manage your account and saved pieces." />
        {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
        <form className="grid gap-4" onSubmit={submit}>
          <FormField label="Username" name="username" autoComplete="username" required />
          <FormField label="Password" name="password" type="password" autoComplete="current-password" required />
          <Button type="submit" size="3" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <Text as="p" color="gray" className="mt-5 text-center">
          New to Sani? <Link className="text-[#31584b] hover:text-[#a75f35]" to="/signup">Create an account</Link>
        </Text>
      </Panel>
    </motion.section>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await authApi.signup(new FormData(event.currentTarget));
      void navigate("/signup/success");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not create your account."));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <Panel className="p-6 sm:p-9">
        <PageHeading eyebrow="Join Sani" title="Create your account" description="Add your details to get started with the Sani collection." />
        {error && <div className="mb-5"><Notice tone="error">{error}</Notice></div>}
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" name="name" autoComplete="given-name" required />
            <FormField label="Surname" name="surname" autoComplete="family-name" required />
          </div>
          <FormField
            label="South African ID number"
            name="id_number"
            inputMode="numeric"
            pattern="\\d{13}"
            maxLength={13}
            title="Enter your 13-digit South African ID number."
          />
          <FormField label="Email" name="email" type="email" autoComplete="email" required />
          <FormField label="Contact number" name="contact" type="tel" autoComplete="tel" required />
          <FormField label="Profile image (optional)" name="image_file" type="file" accept="image/*" />
          <FormField label="Username" name="username" autoComplete="username" required />
          <FormField label="Password" name="password" type="password" autoComplete="new-password" required />
          <div className="mt-2 flex flex-wrap justify-end gap-3">
            <Button type="reset" variant="soft" color="gray">Clear</Button>
            <Button type="submit" size="3" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
        <Text as="p" color="gray" className="mt-5 text-center">
          Already registered? <Link className="text-[#31584b] hover:text-[#a75f35]" to="/login">Log in</Link>
        </Text>
      </Panel>
    </motion.section>
  );
}

export function SignupSuccess() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <Panel className="p-9 text-center">
        <Text as="p" size="2" color="amber" className="mb-3 uppercase tracking-[0.2em]">Account created</Text>
        <Heading size="7" className="mb-3">You’re signed up.</Heading>
        <Text as="p" color="gray" className="mb-7">Log in to view your account and start browsing.</Text>
        <Button asChild><Link to="/login">Log in</Link></Button>
      </Panel>
    </section>
  );
}

export function Account() {
  const { user, ready } = useAuth();
  const [account, setAccount] = useState<AccountData | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    if (user) {
      customerApi.account()
        .then((result) => { if (active) setAccount(result); })
        .catch((requestError: unknown) => {
          if (active) setError(getErrorMessage(requestError, "Could not load your account."));
        });
    }
    return () => { active = false; };
  }, [user]);

  if (ready && !user) {
    return <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><Panel className="p-8 text-center">Please <Link className="text-[#31584b]" to="/login">log in</Link> to see your account.</Panel></section>;
  }
  if (error) return <div className="mx-auto max-w-3xl px-4 py-10"><Notice tone="error">{error}</Notice></div>;
  if (!account) return <p className="py-16 text-center text-slate-500">Loading account...</p>;

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    try {
      const updated = await customerApi.updateAccount(Object.fromEntries(new FormData(event.currentTarget)));
      setAccount(updated);
      setMessage("Your account details have been saved.");
    } catch (requestError) {
      setMessage(getErrorMessage(requestError, "Could not save your account."));
    }
  };
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Panel className="p-6 sm:p-9">
        <div className="mb-7 flex items-center gap-4">
          {account.image ? (
            <img src={account.image} alt="" className="size-20 rounded-full object-cover" />
          ) : (
            <FiUser className="size-20 text-slate-500" />
          )}
          <div>
            <PageHeading eyebrow={`@${account.username}`} title="Your account" />
          </div>
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={save}>
          <FormField label="Name" name="name" defaultValue={account.name} required />
          <FormField label="Surname" name="surname" defaultValue={account.surname} required />
          <FormField label="Email" name="email" type="email" defaultValue={account.email} required />
          <FormField label="Contact number" name="contact" defaultValue={account.contact} required />
          {message && <div className="sm:col-span-2"><Notice tone={message.startsWith("Your account") ? "success" : "error"}>{message}</Notice></div>}
          <div className="sm:col-span-2 sm:text-right">
            <Button type="submit" size="3">Save changes</Button>
          </div>
        </form>
      </Panel>
    </motion.section>
  );
}
