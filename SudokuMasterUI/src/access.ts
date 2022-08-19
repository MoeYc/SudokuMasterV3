/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  let canAdmin = false;
  if (currentUser && currentUser.authorities) {
    for (const entry of currentUser.authorities) {
      if (entry.authority === 'ROLE_ROOT') {
        canAdmin = true;
      }
    }
  }

  return {
    canAdmin: canAdmin,
  };
}
