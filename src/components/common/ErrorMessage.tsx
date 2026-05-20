interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Qualcosa è andato storto. Riprova.",
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  );
}
