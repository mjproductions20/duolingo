import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/hr.svg"}
            className="mr-4 rounded-md"
            alt="Croatian"
            height={32}
            width={40}
          />
          Croatian
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/es.svg"}
            className="mr-4 rounded-md"
            alt="Spanish"
            height={32}
            width={40}
          />
          Spanish
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/fr.svg"}
            className="mr-4 rounded-md"
            alt="French"
            height={32}
            width={40}
          />
          French
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/it.svg"}
            className="mr-4 rounded-md"
            alt="Italian"
            height={32}
            width={40}
          />
          Italian
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/jp.svg"}
            className="mr-4 rounded-md"
            alt="Japanese"
            height={32}
            width={40}
          />
          Japanese
        </Button>
      </div>
    </footer>
  );
};
