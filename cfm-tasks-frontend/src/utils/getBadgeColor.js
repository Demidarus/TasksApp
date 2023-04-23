// utils/getBadgeColor.js

export function getBadgeColor(status) {
  switch (status) {
    case "To Do":
      return "pink";
    case "In Progress":
      return "info";
    case "Done":
      return "success";
    default:
      return "indigo";
  }
}
