import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Button, Card, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <Text as="p" size="2" color="grass" className="mb-2 uppercase tracking-[0.2em]">
          {eyebrow}
        </Text>
      )}
      <Heading size="8" className="mb-2 text-balance">
        {title}
      </Heading>
      {description && (
        <Text as="p" size="3" color="gray" className="max-w-2xl">
          {description}
        </Text>
      )}
    </div>
  );
}

export function FormField({
  label,
  name,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`grid gap-2 text-sm text-slate-700 ${className}`}>
      <span>{label}</span>
      <input className="form-control" name={name} {...props} />
    </label>
  );
}

export function FormSelect({
  label,
  name,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-slate-700">
      <span>{label}</span>
      <select className="form-control" name={name} {...props}>
        {children}
      </select>
    </label>
  );
}

export function FormTextarea({
  label,
  name,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-slate-700">
      <span>{label}</span>
      <textarea className="form-control" name={name} {...props} />
    </label>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`border border-[#e7e1d6] bg-white shadow-sm ${className}`}>
      {children}
    </Card>
  );
}

export function Notice({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "error" | "success";
}) {
  const colors = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    error: "border-rose-200 bg-rose-50 text-rose-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${colors[tone]}`} role="status">
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  to,
  action,
}: {
  title: string;
  description?: string;
  to?: string;
  action?: string;
}) {
  return (
    <Panel className="mx-auto max-w-xl p-8 text-center">
      <Heading size="5" className="mb-2">
        {title}
      </Heading>
      {description && (
        <Text as="p" color="gray" className="mb-5">
          {description}
        </Text>
      )}
      {to && action && (
        <Button asChild>
          <Link to={to}>{action}</Link>
        </Button>
      )}
    </Panel>
  );
}

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <p className="py-16 text-center text-sm text-slate-500" role="status">
      {label}
    </p>
  );
}
