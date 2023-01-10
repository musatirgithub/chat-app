export const dateSorter = (data) => {
  let newData = Object.values(data);
  newData
    .sort((a, b) => new Date(b.datetime.seconds) - new Date(a.datetime.seconds))
    .reverse();
  return newData;
};
