export const findItem = (containers, id) => {
  const container = findValueOfItems(containers, id, "item");
  if (!container) return "";
  const item = container.candidates.find((item) => item.id === id);
  if (!item) return "";
  return item;
};

export const findValueOfItems = (containers, id, type) => {
  if (type === "container")
    return containers.find((container) => container.id === id);

  if (type === "item")
    return containers.find((container) =>
      container.candidates.find((item) => item.id === id)
    );
};
