import path from "path";
import { readFileSync } from "fs";

type config = {
  mode: "http" | "websocket";
  server: server[];
};

type server = {
  name: string;
  host: string;
};

export const getConfig = (): config => {
  return JSON.parse(
    readFileSync(path.join(process.cwd(), "config.json")).toString()
  );
};
