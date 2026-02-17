exports.checkAndUpdateUsage = async (user) => {
  const today = new Date().toDateString();
  const lastUsageDate = user.usageDate
    ? new Date(user.usageDate).toDateString()
    : null;

  // Reset if new day
  if (today !== lastUsageDate) {
    user.dailyUsage = 0;
  }

  // Free plan limit
  if (user.plan === "free" && user.dailyUsage >= 20) {
    throw new Error("Free plan limit reached. Upgrade to Pro.");
  }

  user.dailyUsage += 1;
  user.usageDate = new Date();

  await user.save();
};
