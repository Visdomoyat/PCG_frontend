import type { Route } from "./+types/home";
import { NavBar } from "../components/NavBar/navbar";
import Landing from "../components/Landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg" },
    { name: "description", content: "Welcome to Private Chef Greg!" },
  ];
}

export default function Home() {
  return (
    <>
      <NavBar />
      <Landing />
    </>
  );
}
