const getRandomElements = (array, numElements) => {
    const randomElements = [];
  
    while (randomElements.length < numElements) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomElement = array[randomIndex];
  
      if (!randomElements.includes(randomElement)) {
        randomElements.push(randomElement);
      }
    }
  
    return randomElements;
  };
  
  export default getRandomElements;