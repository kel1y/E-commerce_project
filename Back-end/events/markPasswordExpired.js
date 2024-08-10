import { io } from "../utils/socket";

export const markPasswordExpired = async (expiredUsers) => {
  if (expiredUsers.length) {
    try {
      for (let i = 0; i < expiredUsers.length; i++) {
        // Update status of the User to "NeedsToUpdatePassword"
        await expiredUsers[i].update({ PasswordExpired: true });
        console.log("Update The Following Password => " + expiredUsers[i].id);

        const date = new Date().toISOString().slice(0, 10);
        io.to(`user-${expiredUsers[i].id}`).emit("notification", {
          header: "Password expired",
          body: "You need to update your password.",
          date: date,
          read: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("No expired password");
  }
};
