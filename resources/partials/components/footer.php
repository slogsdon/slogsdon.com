<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div>
                <h3>Navigation</h3>
                <?php $this->insert('partials::components/site-menu', ['isFooter' => true]); ?>
            </div>
            <div>
                <h3>Topics</h3>
                <ul class="footer-links">
                    <li><a href="#">Payment Systems</a></li>
                    <li><a href="#">Developer Tools</a></li>
                    <li><a href="#">System Architecture</a></li>
                    <li><a href="#">Security & Compliance</a></li>
                </ul>
            </div>
            <div>
                <h3>Connect</h3>
                <?php $this->insert('partials::components/social-links', ['isFooter' => true]); ?>
            </div>
        </div>
    </div>
</footer>
