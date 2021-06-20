const mongoose =require("mongoose");
mongoose.model("Entry",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});