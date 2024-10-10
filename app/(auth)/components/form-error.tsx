export default function FormError({ error }: { error: string }) {
  return (
    <div className="text-red-500 text-sm border-l-2 border-red-500 px-4 mb-2">
      {error}
    </div>
  );
}
