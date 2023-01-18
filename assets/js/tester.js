const colors = [
    'Red',
    'Orange',   
    'Purple',
    'Brown',
    'Gray',
    'Pink'
  ];
const [primary, ,secondary,...others] = colors;
console.log(primary, secondary, others);