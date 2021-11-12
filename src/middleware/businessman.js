const client = require("./Redis");

module.exports = async (req, res, next) => {
  try {
    client.get("businessman", async (err, data) => {
console.log(data)
      if (data == false || data == null){
        console.log('You aren`t businessman');
      } else if(err){
          console.log(err)
     }else if(data){
next();
}      
    });
  } catch (error) {
    res.status(400).send("Error validating the user" + error);
  }
};
