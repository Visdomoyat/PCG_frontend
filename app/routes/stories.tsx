import type { Route } from "./+types/stories";
import { NavBar } from "../components/NavBar/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg Stories" },
    { name: "description", content: "Welcome to Private Chef Greg Stories!" },
  ];
}

export default function Stories() {
  return (
    <>
      <NavBar />
    </>
  );
}
