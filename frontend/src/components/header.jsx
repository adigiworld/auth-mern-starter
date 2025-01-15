import { Link } from "react-router-dom"

export const Header = () => {
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Subjects", link: "/subjects" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" }
  ];
  return (
    <header className="max-w-5xl h-full mx-auto flex items-center justify-between">
      <div><Link to={"/"} className="text-2xl text-link hover:text-link-hover">AEF</Link></div>
      <nav>
        <ul className="flex items-center">
          {navLinks.map(nav => (
            <li key={nav.name + "aef"} >
              <Link to={nav.link}
                className="px-3 py-4 mx-1 text-link hover:text-link-hover">
                {nav.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
