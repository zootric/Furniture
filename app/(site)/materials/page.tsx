import { redirect } from "next/navigation";

// The reference template keeps its materials story on the home page; this route points there.
export default function MaterialsPage() {
  redirect("/#materials");
}
