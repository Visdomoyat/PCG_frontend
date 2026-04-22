import type { Route } from "./+types/gallery";
import { NavBar } from "../components/NavBar/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Private Chef Greg Gallery" },
    { name: "description", content: "Welcome to Private Chef Greg Gallery!" },
  ];
}

export default function Gallery() {
  return (
    <>
      <NavBar />
     
    </>
  );
}
