import NavLink from "./NavLink";

// Define NavBar component
export default function NavBar() {
  return (
    // Navigation bar structure
    <nav>
      {/* Unordered list for navigation items */}
      <ul className='flex gap-2'>
        {/* Navigation item for the home page */}
        <li className='font-bold font-orbitron'>
          {/* NavLink component for the home page */}
          <NavLink href='/'>Indie Gamer</NavLink>
        </li>
        {/* Navigation item for the reviews page */}
        <li className='ml-auto'>
          {/* NavLink component for the reviews page */}
          <NavLink href='/reviews'>Reviews</NavLink>
        </li>
        {/* Navigation item for the about page */}
        <li>
          {/* NavLink component for the about page with prefetch disabled */}
          <NavLink href='/about' prefetch={false}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
