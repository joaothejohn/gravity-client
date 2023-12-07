const columns = [
  { name: "CUSTOMER ID", uid: "id", sortable: true },
  { name: "USERNAME", uid: "username", sortable: true },
  { name: "CURRENT PLAN", uid: "plan.name", sortable: true },
  { name: "IP ADDRESS", uid: "ip" },
  { name: "PASSWORD", uid: "password" },
  { name: "STATUS", uid: "isActive", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: true },
  { name: "Inactive", uid: false },
];

export { columns, statusOptions };