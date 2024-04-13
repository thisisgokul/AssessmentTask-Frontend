// // sortData.ts
// const sortData = (
//     data: DataItem[],
//     criteria:
//       | "most-upvotes"
//       | "least-upvotes"
//       | "most-comments"
//       | "least-comments"
//   ) => {
//     let sortedData = [...data];
//     switch (criteria) {
//       case "most-upvotes":
//         sortedData.sort((a, b) => b.upvotes - a.upvotes);
//         break;
//       case "least-upvotes":
//         sortedData.sort((a, b) => a.upvotes - b.upvotes);
//         break;
//       case "most-comments":
//         sortedData.sort((a, b) => b.comments.length - a.comments.length);
//         break;
//       case "least-comments":
//         sortedData.sort((a, b) => a.comments.length - b.comments.length);
//         break;
//       default:
//         break;
//     }
//     return sortedData;
//   };
  
//   export default sortData;
  