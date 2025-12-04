
import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Reveal from '../components/Reveal';

const Terms: React.FC = () => {
  return (
    <>
      <div className="bg-neutral-900 pt-32 pb-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Terms & Policies</h1>
        <p className="text-gray-400">Legal Information, Privacy Policy, and Order Terms</p>
      </div>

      <Section>
        <div className="container mx-auto px-6 max-w-4xl text-gray-400 leading-relaxed space-y-12">
          
          {/* Privacy Policy Section */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white border-b border-neutral-800 pb-4">Jalwa: Modern Indian Dining Contact Privacy Policy</h2>
              <p className="italic text-sm">Updated: April 15, 2025</p>
              
              <p>
                Bhramara Hospitality LLC and its parents, subsidiaries, and affiliated entities (“we”, “us” or “our”) respect your concerns about privacy and value the relationship we have with you. We are committed to protecting it through our compliance with this privacy policy (“Privacy Policy” or “Policy”).
              </p>
              <p>
                This Privacy Policy describes the types of personal information we collect about our customers and how we use and disclose personal information about individuals who use our website (jalwaindianrestaurant.com) and all corresponding webpages, software applications, or mobile applications that link to this Privacy Policy (collectively, the “Site”) or who otherwise interact with us online or offline (collectively, our “Services”). We also describe the measures we take to protect the security of the information and how our customers and how our customers can contact us about our privacy practices.
              </p>
              <p>
                We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on this page with an updated date. We encourage you to look for updates to this Privacy Policy by checking this date when you access our Services. Your continued use of our Services after the effective date of any modification to the Privacy Policy will be deemed to be your agreement to the changed terms.
              </p>
              <p>
                By using our Services or otherwise providing personal information to us, you agree to our privacy practices as described in this Privacy Policy.
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">1. PERSONAL INFORMATION WE COLLECT & WHY WE COLLECT IT</h3>
              <p>
                We collect information that identifies, relates to, describes, references, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer, household, or device (“Personal Information”).
              </p>
              <p>Generally, we collect the following categories of personal information, which we use for the listed business or commercial purposes:</p>

              <div className="overflow-x-auto border border-neutral-800 rounded-lg mt-6">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-800 text-white">
                    <tr>
                      <th className="p-4 border-r border-neutral-700 w-1/2">Category of Personal Information</th>
                      <th className="p-4 w-1/2">Business/Commercial Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    <tr>
                      <td className="p-4 border-r border-neutral-800 align-top">
                        <strong>Identifiers and Personal records</strong>, including real name, alias, signature, postal address, telephone number, unique personal identifier, online identifier, IP address, email address, account name, or other similar identifiers, employment, employment history, credit card number, debit card number, or other financial information provided by you.
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>To process your requests and provide our products and Services</li>
                          <li>To maintain your account with us</li>
                          <li>To communicate with you</li>
                          <li>For marketing, advertising, and promotions</li>
                          <li>For research, analysis and development</li>
                          <li>To create and deliver personalized content</li>
                          <li>To administer contests, sweepstakes, promotions, and surveys</li>
                          <li>Detecting, investigating, or protecting against malicious activity</li>
                          <li>To respond to reviews, comments, or other feedback</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-neutral-800 align-top">
                        <strong>Commercial information</strong>, including records of personal property, products or services purchased, obtained, or considered.
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>For research, analysis and development</li>
                          <li>For marketing and promotions</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-neutral-800 align-top">
                        <strong>Characteristics of protected classifications</strong> under federal or California law, including age and date of birth, gender.
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>For research, analysis and development</li>
                          <li>For marketing and promotions (e.g., to celebrate your birthday)</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-neutral-800 align-top">
                        <strong>Internet or other electronic network activity information</strong>, including browsing history, search history, and information regarding your interactions with our websites.
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>To process your requests and provide our products and Services</li>
                          <li>To maintain your account with us</li>
                          <li>To facilitate locating our location nearest to you</li>
                          <li>For marketing, advertising, and promotions</li>
                          <li>To create and deliver personalized content</li>
                          <li>Security and fraud detection</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-r border-neutral-800 align-top">
                        <strong>Geolocation data</strong> inferred from your IP address or mobile device location.
                      </td>
                      <td className="p-4 align-top">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>To process your requests and provide our products and Services</li>
                          <li>For marketing, advertising, and promotions</li>
                          <li>Security and fraud detection</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">2. SOURCES FROM WHICH WE COLLECT PERSONAL INFORMATION</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Directly from you</li>
                <li>From our affiliated companies</li>
                <li>Through technologies in use on our Services (cookies, pixels)</li>
                <li>Created by us (records, login IDs)</li>
                <li>Service providers, advertising networks, and data analytics providers</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">3. COOKIES AND OTHER TRACKING TECHNOLOGIES</h3>
              <p>
                We use cookies and similar tracking technologies to track the activity on our site and hold certain information. We use them to personalize your experience, support site functionality, analyze trends, and for advertising.
              </p>
              <p className="mt-2"><strong>Analytics:</strong> We may use analytics tools like Google Analytics to monitor Site usage.</p>
              <p className="mt-2"><strong>Online Advertising:</strong> Our Site collects information to target advertisements using tools like Google Ads.</p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">4. HOW LONG WE KEEP PERSONAL INFORMATION</h3>
              <p>
                We keep personal information for as long as is necessary for the purposes described in this Privacy Policy or otherwise authorized by law.
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">5. HOW WE DISCLOSE PERSONAL INFORMATION</h3>
              <p>We disclose personal information to our affiliates, service providers, and contractors for purposes such as fulfilling orders, processing payments, marketing, and ensuring security.</p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">6. CALIFORNIA PRIVACY RIGHTS</h3>
              <p>California residents have the right to know, delete, correct, and opt-out of the sale or sharing of their personal information under the CCPA.</p>
              
              <h3 className="text-xl font-bold text-white mt-8 mb-4">7. RIGHT TO APPEAL</h3>
              <p>
                Sometimes we are unable to process requests relating to your personal information, in which case, your request will be denied. 
                If your privacy rights request has previously been denied by us and you believe we denied it in error, you may appeal for reconsideration of your request using our <Link to="/contact" className="text-jalwa-gold hover:underline">webform/contact page</Link> or by calling us.
              </p>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">12. CONTACT US</h3>
              <p><strong>Jalwa: Modern Indian Dining</strong></p>
              <p>(973) 250-6364</p>
              <p>jalwamcnj@gmail.com</p>
            </div>
          </Reveal>

          {/* Order Terms Section */}
          <Reveal delay={200}>
            <div className="space-y-6 pt-12 border-t border-neutral-800">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white border-b border-neutral-800 pb-4">Order Terms</h2>
              
              <h3 className="text-xl font-bold text-white mt-6 mb-4">Cancellation/Refund/Return Policy</h3>
              <p>We want you to be satisfied with your order. We offer the following solutions for order cancellations, refunds, and returns.</p>
              
              <div className="pl-4 border-l-2 border-jalwa-gold space-y-4">
                <h4 className="text-white font-bold">A. Order Cancellation</h4>
                <p>You have the ability to update or abandon your order at any time prior to selecting ‘Pay for Pickup’ or ‘Pay for Delivery’. Once an order is placed and confirmed by us, we begin preparing it and therefore we cannot accept cancellations of any orders once confirmed by us.</p>
                
                <h4 className="text-white font-bold">B. Refunds and Returns</h4>
                <p>If you receive an order that has missing items, wrong items, or unsatisfactory items please <Link to="/contact" className="text-jalwa-gold hover:underline">contact us</Link>. Any provided refunds will be processed via the payment method used to place the order.</p>
              </div>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Delivery Policy</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>General Information:</strong> All orders are subject to product availability.</li>
                <li><strong>Delivery Area:</strong> Items offered on our website are only available for delivery to addresses within a fixed radius around our restaurant.</li>
                <li><strong>Delivery Time:</strong> An estimated delivery time will be provided to you once your order is placed.</li>
                <li><strong>Delivery Fee:</strong> Additional delivery fees may apply.</li>
                <li><strong>Delivery Instructions:</strong> You can provide special delivery instructions on the checkout page on our website.</li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-8 mb-4">Contact Us</h3>
              <p>If you have any questions about the delivery or your order, please <Link to="/contact" className="text-jalwa-gold hover:underline">contact us</Link>.</p>
              <p><strong>Jalwa: Modern Indian Dining</strong></p>
              <p>(973) 250-6364</p>
              <p>jalwamcnj@gmail.com</p>
            </div>
          </Reveal>

        </div>
      </Section>
    </>
  );
};

export default Terms;