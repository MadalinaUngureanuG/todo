const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://superlative-chebakia-d8be0c.netlify.app/";
