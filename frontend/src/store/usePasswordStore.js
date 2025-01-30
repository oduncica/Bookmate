// import { create } from "zustand";
// import axios from "axios";
// import toast from "react-hot-toast";

// export const usePasswordStore = create((set) => ({
//   loading: false,
//   message: "",
//   error: "",

//   resetPassword: async (email) => {
//     try {
//       set({ loading: true });
//       const res = await axios.post("/users/passwordreset", { email });
//       set({ message: res.data.message, error: "" });
//       toast.success(res.data.message);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong";
//       set({ error: errorMessage, message: "" });
//       toast.error(errorMessage);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   updatePassword: async (token, newPassword, confirmPassword) => {
//     try {
//       set({ loading: true });
//       const res = await axios.post(`/users/passwordreset/${token}`, {
//         newPassword,
//         confirmPassword,
//       });
//       set({ message: res.data.message, error: "" });
//       toast.success(res.data.message);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong";
//       set({ error: errorMessage, message: "" });
//       toast.error(errorMessage);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   clearMessages: () => set({ message: "", error: "" }),
// }));
