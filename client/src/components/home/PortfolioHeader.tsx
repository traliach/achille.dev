interface PortfolioHeaderProps {
  name: string
  title: string
}

export function PortfolioHeader({ name, title }: PortfolioHeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand__name">{name}</span>
        <span className="brand__role">{title}</span>
      </div>

      <nav className="nav-links" aria-label="Portfolio sections">
        <a href="#overview">Overview</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}
