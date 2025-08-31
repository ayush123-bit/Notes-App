const TOKEN_KEY = "notes_app_token";
const USER_KEY = "notes_app_user";

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setUser = (user: any) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = (): any => {
  const t = localStorage.getItem(USER_KEY);
  return t ? JSON.parse(t) : null;
};
export const removeUser = () => localStorage.removeItem(USER_KEY);
