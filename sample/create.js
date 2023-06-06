// Create a new user
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);

//
const user = await User.create({
    username: 'alice123',
    isAdmin: true
  }, { fields: ['username'] });
  // let's assume the default of isAdmin is false
  console.log(user.username); // 'alice123'
  console.log(user.isAdmin); // false

  //SELECT FROM
  // Find all users
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));


//   SELECT foo, bar FROM ...
Model.findAll({
    attributes: ['foo', 'bar']
  });
  
