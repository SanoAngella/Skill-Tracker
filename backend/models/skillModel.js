import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    proficiency: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['To-Learn', 'Learning', 'Mastered'],
        default: 'To-Learn'
    }
}, {
    timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;