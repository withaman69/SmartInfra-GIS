import app from "./app";
import { env } from "./config/env";

app.listen(Number(env.PORT), () => {
  console.log(
    `🚀 SmartInfra API running on port ${env.PORT}`
  );
});