import { redirect } from "next/navigation";

export default function SoldOutPage() {
  redirect("/#pricing");
}
