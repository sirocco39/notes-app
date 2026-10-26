// app/page.tsx (replace the whole file)
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/notes");
}