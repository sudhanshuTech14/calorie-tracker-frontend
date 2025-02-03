import React from "react";
import "./LandingPage.css"; // Import the CSS file
import landingImage from "../assets/calories.png"; // Add an image to your assets folder

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-text">
                    <h1>Track Your Calories & Stay Fit</h1>
                    <p>Monitor your daily calorie intake and achieve your fitness goals with ease.</p>
                    <a href="/register" className="btn">Get Started</a>
                </div>
                <div className="hero-image">
                    <img src={landingImage} alt="Healthy Food" />
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose Calories Tracker?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Track Calories</h3>
                        <p>Log your meals and keep track of your calorie intake effortlessly.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Monitor Progress</h3>
                        <p>Analyze your daily nutrition and stay on top of your health goals.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Easy to Use</h3>
                        <p>Simple and intuitive interface for seamless tracking.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials">
                    <div className="testimonial-card">
                        <p>"This app has helped me maintain my diet and reach my fitness goals!"</p>
                        <span>- Alex, Fitness Enthusiast</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"Tracking calories has never been easier. Love the simple interface!"</p>
                        <span>- Sarah, Nutritionist</span>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <p>© 2025 Calories Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
