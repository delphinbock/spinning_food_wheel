/* Generate a random RGB color */
export const randomRgbColorArray = (itemsArray: string[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      /* Settings */
      let resultArray: string[] = [];

      /* Run each item */
      itemsArray.forEach(async () => {
        /* Red */
        const r = Math.floor(Math.random() * 255);

        /* Green */
        const g = Math.floor(Math.random() * 255);

        /* Blue */
        const b = Math.floor(Math.random() * 255);

        /* Result */
        const randomRgbColor = `rgba(${r},${g},${b},0.4)`;

        resultArray.push(randomRgbColor);
      });

      resolve(resultArray);
    } catch (error) {
      reject(console.log);
    }
  });
};

/* Generate a random Hexa color */
export const randomHexaColorArray = (itemsArray: string[]) => {
  return new Promise(async (resolve: any, reject) => {
    try {
      /* Results array */
      const resultArray = itemsArray.map(() => {
        /* Random hexa color, "Math.floor" => integer less than or equal, "16777215" => decimal, "16" => base 16: Hexadecimal, 16 symbols: [0, 9] and [A, F] */
        let randomHexaColor = Math.floor(Math.random() * 16777215).toString(16);

        randomHexaColor = `#${randomHexaColor}`;

        return randomHexaColor;
      });

      resolve(resultArray);
    } catch (error) {
      reject(console.log);
    }
  });
};
