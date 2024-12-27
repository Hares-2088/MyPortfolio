export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <nav>
          <ul>
            <li><a href="/projects">All Projects</a></li>
          </ul>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}