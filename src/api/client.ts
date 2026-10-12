import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { Accept: "application/json" },
});

export const http = {
  get: async <T,>(path: string): Promise<T> => {
    const response = await client.get<T>(path);
    return response.data;
  },
  post: async <T,>(path: string, data?: unknown): Promise<T> => {
    const response = await client.post<T>(path, data);
    return response.data;
  },
  form: async <T,>(
    method: "POST" | "PUT" | "PATCH",
    path: string,
    data: FormData,
  ): Promise<T> => {
    const response = await client.request<T>({ method, url: path, data });
    return response.data;
  },
  delete: async <T,>(path: string): Promise<T> => {
    const response = await client.delete<T>(path);
    return response.data;
  },
};

export async function* streamJson<T>(
  path: string,
  signal?: AbortSignal,
): AsyncGenerator<T> {
  const response = await fetch(`/api${path}`, {
    credentials: "include",
    headers: { Accept: "application/x-ndjson" },
    signal,
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  if (!response.body) {
    throw new Error("The server did not provide a response stream.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (line.trim()) yield JSON.parse(line) as T;
      }
      if (done) break;
    }
    if (buffer.trim()) yield JSON.parse(buffer) as T;
  } finally {
    reader.releaseLock();
  }
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}
