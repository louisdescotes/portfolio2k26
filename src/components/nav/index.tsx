import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./style.scss";

const Nav = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const routes = [
    { label: "Home", url: "/" },
    // { label: "About", url: "/about" },
    { label: "Craft", url: "/craft" },
    // { label: "Blog", url: "/blog" },
  ];

  return (
    <>
      {/* <span className="header-name">louis descotes</span> */}
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.label}>
              <Link
                data-active={pathname === route.url}
                href={route.url}
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname === route.url) return;
                  router.push(route.url, {
                    onTransitionReady: pageAnimation,
                  });
                }}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const pageAnimation = () => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  overlay.animate(
    [
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
    ],
    {
      delay: 500,
      duration: 800,
      easing: "cubic-bezier(0.4, 0.3, 0, 1)",
      fill: "forwards",
    },
  );

  setTimeout(() => overlay.remove(), 1800);

  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0, scale: 0.95, transform: "translateY(-150px)" },
    ],
    {
      duration: 1400,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  document.documentElement.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};

export default Nav;
