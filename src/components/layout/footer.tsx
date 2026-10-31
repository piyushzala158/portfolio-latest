export function Footer() {
  return (
    <footer className="py-8 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Piyush Zala. Built with Next.js & ❤️
        </p>
      </div>
    </footer>
  );
}
