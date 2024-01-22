import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./SigninButton";
import Link from "next/link";

const Appbar = () => {
  return (
    <div className="mb-3 flex items-center justify-center gap-2">
      <Navbar isBordered>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              className="hover:text-sky-500 transition-colors"
              color="foreground"
              href="/"
            >
              Home
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <SigninButton />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Appbar;
