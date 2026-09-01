import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

      <p className="mt-2 text-gray-600">
        We are sorry, the requested page does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Back to homepage
      </Link>
    </main>
  );
}
