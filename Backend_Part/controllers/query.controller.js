





































const mongoose = require("mongoose");
const Query = require("../models/Query");
const User = require("../models/User");




exports.getUserQueries = async (req, res) => {
  try {
    const queries = await Query.find({
      userId: req.user.userId
    })
      .sort({ pinned: -1, createdAt: -1 }); // 🔥 HERE

    res.json(queries);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};


exports.deleteQuery = async (req, res) => {
  try {
    const query = await Query.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId   // 🔐 ensure ownership
    });

    if (!query) {
      return res.status(404).json({
        message: "Query not found"
      });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Delete failed"
    });
  }
};






exports.getAnalytics = async (req, res) => {
  const total = await Query.countDocuments({
    userId: req.user.userId
  });

  const modes = await Query.aggregate([
    { $match: { userId: req.user.userId } },
    { $group: { _id: "$mode", count: { $sum: 1 } } }
  ]);

  res.json({ total, modes });
};





exports.getAdvancedAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.plan !== "pro") {
      return res.status(403).json({ message: "Pro plan required" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const totalQueries = await Query.countDocuments({ userId });

    const modeStats = await Query.aggregate([
      { $match: { userId } },
      { $group: { _id: "$mode", count: { $sum: 1 } } }
    ]);

    const dailyStats = await Query.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalQueries,
      modeStats,
      dailyStats
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics failed" });
  }
};





exports.togglePin = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    if (query.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    query.pinned = !query.pinned;
    await query.save();

    res.json({ message: "Pin updated", pinned: query.pinned });

  } catch (error) {
    res.status(500).json({ message: "Failed to update pin" });
  }
};






exports.getOverviewStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const totalQueries = await Query.countDocuments({ userId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayQueries = await Query.countDocuments({
      userId,
      createdAt: { $gte: today }
    });

    // Last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyStats = await Query.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const modeStats = await Query.aggregate([
      { $match: { userId } },
      { $group: { _id: "$mode", count: { $sum: 1 } } }
    ]);

    const successRate = totalQueries > 0 ? 98.5 : 100; // mock AI metric

    const avgPerDay =
      dailyStats.length > 0
        ? (
          dailyStats.reduce((sum, d) => sum + d.count, 0) /
          dailyStats.length
        ).toFixed(1)
        : 0;

    const peakDay =
      dailyStats.length > 0
        ? dailyStats.reduce((max, d) =>
          d.count > max.count ? d : max
        )
        : null;

    const recentQueries = await Query.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalQueries,
      todayQueries,
      dailyStats,
      modeStats,
      successRate,
      avgPerDay,
      peakDay,
      recentQueries
    });

  } catch (error) {
    res.status(500).json({ message: "Overview failed" });
  }
};











// exports.getOverview = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const user = await User.findById(userId);

//     const totalQueries = await Query.countDocuments({ userId });

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const todayQueries = await Query.countDocuments({
//       userId,
//       createdAt: { $gte: todayStart }
//     });

//     const recentQueries = await Query.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     const modeStats = await Query.aggregate([
//       {
//         $match: {
//           userId: new mongoose.Types.ObjectId(userId)
//         }
//       },
//       {
//         $group: {
//           _id: "$mode",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // res.json({
//     //   totalQueries,
//     //   todayQueries,
//     //   modeStats,
//     //   recentQueries,
//     //   plan: user.plan,
//     //   billingRenewal: user.billingRenewal,
//     //   credits: user.credits,
//     //   teamSize: user.teamSize
//     // });



//     res.json({
//       totalQueries,
//       todayQueries,
//       modeStats,
//       recentQueries,
//       plan: user.plan,
//       billingRenewal: user.billingRenewal,
//       credits: user.credits
//     });


//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Overview failed" });
//   }
// };






// exports.getOverview = async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.userId);

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const totalQueries = await Query.countDocuments({ userId });

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const todayQueries = await Query.countDocuments({
//       userId,
//       createdAt: { $gte: todayStart }
//     });

//     const modeStats = await Query.aggregate([
//       { $match: { userId } },
//       { $group: { _id: "$mode", count: { $sum: 1 } } }
//     ]);

//     const dailyStats = await Query.aggregate([
//       { $match: { userId } },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$createdAt"
//             }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const recentQueries = await Query.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({
//       totalQueries,
//       todayQueries,
//       modeStats,
//       dailyStats,
//       recentQueries,
//       plan: user.plan,
//       credits:
//         user.plan === "free"
//           ? 20 - (user.dailyUsage || 0)
//           : "Unlimited",
//       billingRenewal: user.billingRenewal || null
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Overview failed" });
//   }
// };



















// exports.getOverview = async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.userId);

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const totalQueries = await Query.countDocuments({ userId });

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const todayQueries = await Query.countDocuments({
//       userId,
//       createdAt: { $gte: todayStart }
//     });

//     const modeStats = await Query.aggregate([
//       { $match: { userId } },
//       { $group: { _id: "$mode", count: { $sum: 1 } } }
//     ]);

//     const dailyStats = await Query.aggregate([
//       { $match: { userId } },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$createdAt"
//             }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const recentQueries = await Query.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({
//       totalQueries,
//       todayQueries,
//       modeStats,
//       dailyStats,
//       recentQueries,
//       plan: user.plan,
//       credits:
//         user.plan === "pro"
//           ? "Unlimited"
//           : user.credits,
//       billingRenewal: user.billingRenewal
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Overview failed" });
//   }
// };























exports.getOverview = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalQueries = await Query.countDocuments({ userId });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayQueries = await Query.countDocuments({
      userId,
      createdAt: { $gte: todayStart }
    });

    // 🔥 NEW SIMPLE DYNAMIC FIELD 1
    const activeDays = await Query.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        }
      }
    ]);

    // 🔥 NEW SIMPLE DYNAMIC FIELD 2
    const lastActivity = await Query.findOne({ userId })
      .sort({ createdAt: -1 });

    res.json({
      totalQueries,
      todayQueries,
      plan: user.plan,
      billingRenewal: user.billingRenewal,
      activeDays: activeDays.length,
      lastActivity: lastActivity?.createdAt || null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Overview failed" });
  }
};
