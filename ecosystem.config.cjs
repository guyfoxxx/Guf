module.exports = {
  apps: [
    {
      name: "rahgosha",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3000,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "300M",
      autorestart: true,
    },
  ],
};
