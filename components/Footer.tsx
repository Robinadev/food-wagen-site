// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Are you starving?</h3>
            <p>Within a few clicks, find meals that are accessible near you</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <div className="footer-columns">
              <ul className="footer-links">
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/team">Team</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><Link href="/help">Help & Support</Link></li>
              <li><Link href="/partner">Partner with us</Link></li>
              <li><Link href="/ride">Ride with us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/refund">Refund & Cancellation</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookie">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>All rights Reserved © Rihobot E, 2025</p>
          <p>Made with ❤️ by FoodWagen</p>
        </div>
      </div>
    </footer>
  );
}