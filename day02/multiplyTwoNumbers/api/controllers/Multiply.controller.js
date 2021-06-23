
module.exports.multiply= function(req,res)
{
    console.log("GET result");
    console.log(req.query);
    console.log("Multiplicand" + req.params.multiplicand);

    let  multiplicand= req.params.multiplicand;
    let multiplier;
  
    if(req.query && req.query.multiplier)
    {
        multiplier=parseInt(req.query.multiplier, 10);
    }

   

    const result=multiplicand*multiplier;
    console.log("result is " + result);
    res.status(200).json(result);


}



