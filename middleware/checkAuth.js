import jwtDecode from "jwt-decode";

export default async ({ store, redirect, }) => {
  try {
    store.dispatch("auth/autoLogin");

    const token = store.getters["auth/getToken"];

    if (!token) {
      return redirect("/auth/login");
    }

    const data = jwtDecode(token);
    const res = await store.dispatch("user/getOne", data.id);

    if (!res.user) {
      store.commit("auth/clearToken");

      return redirect("/auth/login");
    }
  } catch (err) {
    throw err;
  }
};