import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const testimonials = [
    {
        text: "ProConcept catered our annual conference for 750+ delegates. The food was exceptional, service impeccable, and their attention to dietary requirements was outstanding. Highly recommended for large-scale corporate events.",
        author: "Dr. Rajesh Kumar",
        role: "Conference Chair, IIT Madras Research Park",
        order: 1,
        isActive: true
    },
    {
        text: "We've been using ProConcept for our corporate events for over 3 years. Their consistency, quality, and professionalism are unmatched. The grazing table at our product launch was the talk of the evening!",
        author: "Priya Sharma",
        role: "Event Manager, Barclays Global India",
        order: 2,
        isActive: true
    },
    {
        text: "From intimate family gatherings to large weddings, ProConcept has always exceeded our expectations. Their multi-cuisine capability and flexible approach make them our go-to caterer for all occasions.",
        author: "The Presidency Club",
        role: "Premium Members Club, Chennai",
        order: 3,
        isActive: true
    },
    {
        text: "The US Consulate has worked with ProConcept on multiple high-profile events. Their professionalism, food quality, and adherence to international standards make them a reliable partner.",
        author: "US Consulate Chennai",
        role: "Cultural & Events Division",
        order: 4,
        isActive: true
    }
];

async function seedTestimonials() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Testimonial.deleteMany({});
        console.log('Cleared existing testimonials');

        await Testimonial.insertMany(testimonials);
        console.log('Seeded testimonials successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding testimonials:', error);
        process.exit(1);
    }
}

seedTestimonials();
