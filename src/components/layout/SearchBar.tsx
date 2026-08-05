import { useState } from "react";
import { Search } from "lucide-react";
import Button from "../ui/Button";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-soft border border-border max-w-xl"
    >
      <div className="flex items-center flex-1 px-2">
        <Search size={18} className="text-muted mr-2 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for products (e.g. Potato, Rice)"
          className="w-full text-sm py-2 focus:outline-none placeholder:text-muted"
        />
      </div>
      <Button type="submit" variant="primary" size="md">
        Search
      </Button>
    </form>
  );
}
