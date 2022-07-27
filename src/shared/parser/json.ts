export async function parseJsonFile<T>(file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        resolve(JSON.parse(event.target.result));
        return;
      }
      reject("Content malformed");
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}
