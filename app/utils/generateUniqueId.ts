const uniqueIdGenerator = function* generateUniqueId(): Iterator<number> {
  let id = 0;
  while (true) {
    yield ++id;
  }
};

export const notificationId = uniqueIdGenerator();
