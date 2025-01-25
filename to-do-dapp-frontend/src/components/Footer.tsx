import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bottom-0 right-0 left-0 bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">ChromaWay</h5>
            <p className="text-sm">© 2025 ChromaWay. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/about" className="text-sm hover:text-white">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:text-white">
              Contact
            </Link>
            <Link href="/privacy-policy" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-white">
              Terms of Service
            </Link>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
