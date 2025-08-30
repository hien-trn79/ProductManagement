// File nay dung de xu ly loi bao mat khong the truy cap truc tiep doi tuong trong du lieu json
export default{
    multileMongooseToObject: function (mongooseArray) {
        return mongooseArray.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject(): mongoose;
    }
};