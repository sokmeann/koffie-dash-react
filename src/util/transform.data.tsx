export const transformDataForTable = (
  data: Array<any>,
  columns: Array<String>
) => {
  return data.map((e, idx) => {
    const row = [];
    for (let i = 0; i < columns.length; i++) {
      if (i === 0) {
        row.push(idx + 1);
      } else if (i === 2) {
        const key = columns[i];
        const value = e[key.toUpperCase()];
        if (value) {
          const formattedDate = new Date(value).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          row.push(formattedDate);
        } else {
          row.push("");
        }
      } else {
        const key = columns[i];
        const value = e[key.toUpperCase()];
        if (value) {
          row.push(value);
        } else {
          row.push("");
        }
      }
    }
    row.splice(6, 0, null);
    return row;
  });
};
