module.exports = {
  apps: [
    {
      name: "big_preview",
      script: "npm run dev",
      watch: "./src",
    },
    {
      name: "big_webhook",
      script: "scripts/webhook-receiver.mjs",
      interpreter: "node",
      interpreter_args: "--env-file=.env",
      env: {
        WEBHOOK_PORT: 4400,
      },
    },
  ],
};
