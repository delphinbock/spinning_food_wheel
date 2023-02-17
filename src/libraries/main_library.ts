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
  return new Promise(async (resolve, reject) => {
    try {
      /* Settings */
      //let resultArray: string[] = [];

      const resultArray = itemsArray.map(async () => {
        /* Random hexa color */
        let randomHexaColor = Math.floor(Math.random() * 16777215).toString(16);

        randomHexaColor = `#${randomHexaColor}`;

        return randomHexaColor;
      });

      // /* Run each item */
      // itemsArray.forEach(async () => {
      //   /* Random hexa color */
      //   let randomHexaColor = Math.floor(Math.random() * 16777215).toString(16);

      //   randomHexaColor = `#${randomHexaColor}`;

      //   resultArray.push(randomHexaColor);
      // });

      //console.log(Promise.all(resultArray));

      resolve(Promise.all(resultArray));
    } catch (error) {
      reject(console.log);
    }
  });
};
