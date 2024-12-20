<?php $this->layout('partials::layouts/main', [
    'title' => 'About',
]); ?>

<header class="about-header">
    <div class="container">
        <h1>About Me</h1>
        <p>Technical leader and product strategist with over 15 years of experience building scalable fintech solutions and developer platforms.</p>
    </div>
</header>

<main class="container">
    <section class="profile-section">
        <div class="profile-content">
            <h2>Background</h2>
            <p>
                For the past decade, I've been at the intersection of financial technology and developer tools, 
                helping companies build and scale their payment infrastructure and developer platforms. My work 
                has focused on creating systems that process billions in transactions while maintaining high 
                reliability and security standards.
            </p>
            <p>
                I combine deep technical expertise with product strategy to help companies navigate the 
                complexities of modern financial systems. Whether it's designing scalable architectures, 
                optimizing payment flows, or building developer-first products, I focus on creating 
                solutions that drive business growth while maintaining technical excellence.
            </p>
        </div>
        <div class="profile-image">
            <img src="/images/headshot.jpeg">
        </div>
    </section>

    <!-- <section class="experience-section">
        <h2>Professional Experience</h2>
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-date">2020 - Present</div>
                <div class="timeline-content">
                    <h3>Head of Developer Platform</h3>
                    <div class="company">FinTech Enterprise</div>
                    <p>Leading the development of developer-focused payment infrastructure, serving thousands of businesses 
                    processing billions in transactions annually. Architected the next-generation API platform and 
                    led the transformation to a developer-first product strategy.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">2016 - 2020</div>
                <div class="timeline-content">
                    <h3>Senior Technical Product Manager</h3>
                    <div class="company">Payment Platform Inc.</div>
                    <p>Drove the technical vision and implementation of the company's payment processing platform. 
                    Led the development of key features including real-time fraud detection and automated compliance systems.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">2012 - 2016</div>
                <div class="timeline-content">
                    <h3>Lead Software Engineer</h3>
                    <div class="company">Tech Solutions Ltd.</div>
                    <p>Architected and built scalable payment processing systems handling millions of transactions. 
                    Implemented microservices architecture and led the transition from monolithic to distributed systems.</p>
                </div>
            </div>
        </div>
    </section> -->

    <section class="expertise-section">
        <h2>Areas of Expertise</h2>
        <div class="expertise-grid">
            <div class="expertise-card">
                <h3>Payment Systems</h3>
                <p>Designing and implementing scalable payment processing infrastructure, focusing on reliability, 
                security, and compliance.</p>
            </div>
            <div class="expertise-card">
                <h3>Developer Platforms</h3>
                <p>Building developer-first products and APIs that emphasize great developer experience and 
                robust functionality.</p>
            </div>
            <div class="expertise-card">
                <h3>Product Leadership</h3>
                <p>Transforming complex financial capabilities into scalable developer platforms that drive
                rapid market adoption and revenue growth.</p>
            </div>
            <div class="expertise-card">
                <h3>Technical Leadership</h3>
                <p>Leading technical teams, setting architecture direction, and bridging business needs with 
                technical implementation.</p>
            </div>
        </div>
    </section>
</main>

<?php $this->insert('partials::components/contact-cta'); ?>
