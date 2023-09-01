import { Suspense } from "react";

export default function TypingTest({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<p>Loading Test...</p>}>
      <div>My test: {params.id}</div>;
    </Suspense>
  );
}
