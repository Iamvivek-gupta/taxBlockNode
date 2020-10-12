const Loan = require("./../models/loanModel");



exports.createLoan = async (req, res) =>{
    try{
        const newLoan = await Loan.create(req.body);
        res.status(201).json({
            status : 'loan created successfully',
            data : {
                loanDetails: newLoan
            }
            
        });
    } catch(err){
        res.status(400).json({
            status : 'fail',
            message : err
        })
    }
        
    }



    exports.getAllLoan = async (req, res) =>{
        try{
            const email = req.params.email;
            console.log(email);
           let loans = Loan.find({email: email});
           const tours = await loans; 
           
    
            res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                tours
            }
        });
        } catch(err){
            res.status(400).json({
            status: 'fail',
            message: err,
            vivek: "vivek"
        });
        }
    }