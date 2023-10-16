import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
    },
    avatar: {
        type: Buffer,
    },
    store: {
        type: String,
        enum: ['Loja 01', 'Loja 02', 'Todas'],
        required: true,
    },
});
UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});


const User = mongoose.model("Users", UserSchema);

/*async function createAdminUser() {
    const adminExists = await User.findOne({ username: 'admin' });

    if (!adminExists) {
        const adminUser = new User({
            username: 'admin',
            password: 'adminpassword', // You should use a strong password here and not 'adminpassword'.
            level: 'admin',
            email: 'admin@example.com',
            phone: '1234567890',
            store: 'Todas',
        });

        await adminUser.save();
        console.log('Admin user created.');
    }
}

// Run the function to create the admin user when the collection is created
createAdminUser();*/


export default User;
