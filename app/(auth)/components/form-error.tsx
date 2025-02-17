export default function FormError({
  error,
}: {
  error: string | string[] | undefined;
}) {
  return (
    <div className="text-red-500 text-sm border-l-2 border-red-500 px-4">
      {error && error}
    </div>
  );
}
