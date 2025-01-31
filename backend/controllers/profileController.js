import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { newGenres } = req.body;

    if (!newGenres) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedUser = await User.findById(req.user._id);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    updatedUser.bookPreferences = newGenres;
    await updatedUser.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateProfile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
