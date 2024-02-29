"use client";

import qs from "query-string";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
  const router = useRouter();
  const [value, setvalue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          term: value,
        },
      },
      {
        skipEmptyString: true,
      }
    );
    router.push(url);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="
    relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        placeholder="Search..."
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-transparent
      focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
