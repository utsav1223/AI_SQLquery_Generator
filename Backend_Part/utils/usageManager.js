const User = require("../models/User");

const FREE_DAILY_LIMIT = 20;

const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const normalizeDate = (dateValue) => {
  const date = new Date(dateValue || Date.now());
  date.setHours(0, 0, 0, 0);
  return date;
};

const resetDailyUsageIfNeeded = async (user) => {
  if (!user || user.plan === "pro") {
    return false;
  }

  const today = getStartOfToday();
  const usageDate = normalizeDate(user.usageDate);

  if (usageDate < today) {
    user.dailyUsage = 0;
    user.usageDate = today;
    await user.save();
    return true;
  }

  return false;
};

const checkAndUpdateUsage = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.plan === "pro") {
    return;
  }

  await resetDailyUsageIfNeeded(user);

  if ((user.dailyUsage || 0) >= FREE_DAILY_LIMIT) {
    throw new Error("FREE_LIMIT_REACHED");
  }

  user.dailyUsage = (user.dailyUsage || 0) + 1;
  await user.save();
};

module.exports = {
  FREE_DAILY_LIMIT,
  resetDailyUsageIfNeeded,
  checkAndUpdateUsage
};
