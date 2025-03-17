"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    console.log("ClientBody component mounted");
    document.body.className = "antialiased";

    // Add a global error handler to catch any unhandled errors
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      console.error("Global error caught:", { message, source, lineno, colno, error });
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    return () => {
      console.log("ClientBody component unmounted");
      window.onerror = originalOnError;
    };
  }, []);

  console.log("ClientBody rendering");

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
    </body>
  );
}
