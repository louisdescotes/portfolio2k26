"use client";

import Nav from "../nav";

const PageController = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};
export default PageController;
