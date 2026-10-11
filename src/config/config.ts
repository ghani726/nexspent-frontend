if (!import.meta.env.VITE_Backend_URL) {
  throw new Error("Backend URL does not exists in ENV");
}

const config = {
  BackendURL: import.meta.env.VITE_Backend_URL,
};

export default config;
