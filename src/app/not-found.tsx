import { errors } from "@/copy/microcopy";

export default function NotFound() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-6xl font-bold text-muted">404</p>
        <h1 className="mt-4 text-2xl font-bold">
          {errors.notFound.headlines[0]}
        </h1>
        <p className="mt-4 text-muted">{errors.notFound.body[0]}</p>
        <a
          href="/"
          className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover transition-colors"
        >
          {errors.notFound.cta}
        </a>
      </div>
    </div>
  );
}
