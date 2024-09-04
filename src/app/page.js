import { Navigator } from "@/components/Navigator.jsx";
import { Input } from "@mui/material";

export default function Home() {
  return (
    <div class="flex justify-center min-h-screen">
      <main class="w-full max-w-[750px] px-4 sm:px-6 lg:px-8">
        <Input />
        <Navigator />
      </main>
    </div>
  );
}
