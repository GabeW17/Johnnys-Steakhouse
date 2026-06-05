export default function SocialIcon({
  name,
}: {
  name: "instagram" | "facebook";
}) {
  if (name === "facebook") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8.5V7c0-.83.67-1 1.5-1H17V3h-2.5C12 3 11 4.8 11 6.7V8.5H9V11h2v10h3V11h2.2l.3-2.5H14Z" />
      </svg>
    );
  }
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
