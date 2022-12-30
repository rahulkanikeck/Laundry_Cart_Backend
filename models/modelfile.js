const createDocument = async()=>{
    try{
        const Shirtdata = new orderdata({
            producttypes : "shirt",
            quantity : 0,
            washtype : true,
            price : 0
        })
        const Jeansdata = new orderdata({
            producttypes : "jeans",
            quantity : 0,
            washtype : true,
            price : 0
        })
        const Joggersdata = new orderdata({
            producttypes : "joggers",
            quantity : 0,
            washtype : true,
            price : 0
        })
        const result = await orderdata.insertMany([Shirtdata,Jeansdata,Joggersdata])
        console.log(result)
        }
        catch(err){
            console.log(err)
        }
    }


 createDocument()