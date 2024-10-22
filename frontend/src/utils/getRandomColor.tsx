const getRandomColor = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const colors = [
    rootStyles.getPropertyValue('--yellow-event'),
    rootStyles.getPropertyValue('--green-event'),
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export default getRandomColor;