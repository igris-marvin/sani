import { Button, Heading, Text } from "@radix-ui/themes";
import { FiAlertTriangle } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const errors: Record<string, { title: string; description: string }> = {
  "400": { title: "Bad request", description: "The server could not process that request." },
  "401": { title: "Not signed in", description: "Log in to continue." },
  "403": { title: "No access", description: "Your account can’t open this page." },
  "404": { title: "Page not found", description: "That page doesn’t exist." },
  "405": { title: "Method not allowed", description: "That action isn’t allowed here." },
  "409": { title: "Conflict", description: "This clashes with the current state. Fix it and try again." },
  "429": { title: "Too many requests", description: "Slow down and try again shortly." },
  "500": { title: "Server error", description: "Something went wrong on our side. Try again later." },
  "502": { title: "Bad gateway", description: "An upstream server failed to respond." },
  "503": { title: "Service unavailable", description: "The server is down for maintenance or overloaded." },
};

export function ErrorPage({ code }: { code?: string }) {
  const params = useParams();
  const status = code ?? params.code ?? "500";
  const error = errors[status] ?? errors["500"];
  return (
    <section className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-20 sm:px-6">
      <FiAlertTriangle className="hidden size-14 shrink-0 text-amber-300 sm:block" />
      <div>
        <Text color="gray">Status {status}</Text>
        <Heading size="8" className="my-2">{error.title}</Heading>
        <Text as="p" color="gray" className="mb-6">{error.description}</Text>
        <Button asChild><Link to="/">Return home</Link></Button>
      </div>
    </section>
  );
}
