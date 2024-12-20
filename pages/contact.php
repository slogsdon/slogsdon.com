<?php $this->layout('partials::layouts/main', [
    'title' => 'Contact',
]); ?>

<header class="contact-header">
    <div class="container">
        <h1>Get in Touch</h1>
        <p>Interested in working together? Let's discuss how I can help with your fintech challenges.</p>
    </div>
</header>

<main class="container">
    <div class="contact-content">
        <div class="contact-form-container">
            <form class="contact-form" action="/contact/" method="POST" netlify>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="company">Company</label>
                    <input type="text" id="company" name="company">
                </div>

                <div class="form-group">
                    <label for="interest">Area of Interest</label>
                    <select id="interest" name="interest" required>
                        <option value="">Select an option</option>
                        <option value="payment-systems">Payment Systems</option>
                        <option value="developer-platforms">Developer Platforms</option>
                        <option value="product-strategy">Product Strategy</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>

                <button type="submit" class="button">Send Message</button>
            </form>
        </div>

        <aside class="contact-info">
            <h3>Other Ways to Connect</h3>
            
            <div class="contact-method">
                <h4>Email</h4>
                <p>shane@shanelogsdon.com</p>
            </div>

            <div class="contact-method">
                <h4>Location</h4>
                <p>Louisville, KY, USA Area</p>
            </div>

            <div class="contact-method">
                <h4>Professional Profiles</h4>
                <?php $this->insert('partials::components/social-links'); ?>
            </div>
        </aside>
    </div>
</main>