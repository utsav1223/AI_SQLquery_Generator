const cron = require("node-cron");
const User = require("../models/User");

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Checking expired subscriptions...");

  try {
    const now = new Date();

    const expiredUsers = await User.find({
      plan: "pro",
      billingRenewal: { $lt: now }
    });

    for (let user of expiredUsers) {
      user.plan = "free";
      user.credits = 20;
      user.billingRenewal = null;
      await user.save();
    }

    console.log(`✅ ${expiredUsers.length} users downgraded.`);
  } catch (error) {
    console.error("Subscription check failed", error);
  }
});
