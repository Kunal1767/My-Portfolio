import { useState } from 'react';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    topic: '',
    message: '',
    acceptTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.acceptTerms) {
      setSubmitStatus('Please accept the terms to continue.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create email body
      const emailBody = `
New Contact Form Submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber || 'Not provided'}
Topic: ${formData.topic || 'Not specified'}

Message:
${formData.message}

// ---
// Sent from your portfolio contact form
//       `;

      // Method 1: Using mailto (opens email client)
      const mailtoLink = `mailto:kunalvarshnet512@gmail.com?subject=Portfolio Contact: ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(emailBody)}`;
      
      // Method 2: Using a service like EmailJS (commented out - requires setup)
      /*
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'your_service_id',
          template_id: 'your_template_id',
          user_id: 'your_user_id',
          template_params: {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phoneNumber,
            topic: formData.topic,
            message: formData.message,
            to_email: 'kunalvarshnet512@gmail.com'
          }
        })
      });
      */

      // For now, using mailto and showing success message
      window.location.href = mailtoLink;
      
      setSubmitStatus('Email client opened! Your message is ready to send.');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        topic: '',
        message: '',
        acceptTerms: false
      });

    } catch (error) {
      setSubmitStatus('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Contact" className="contact--section">
      <div>
        <p className="sub--title">Get In Touch</p>               
        <h2>Contact Me</h2>
      </div>
      
      {submitStatus && (
        <div className={`status-message ${submitStatus.includes('error') || submitStatus.includes('Please') ? 'error' : 'success'}`}>
          {submitStatus}
        </div>
      )}
      
      <div className="contact--form--container">
        <div className="container">
          <label htmlFor="firstName" className="contact--label">
            <span className="text-md">First Name *</span>
            <input
              type="text"
              className="contact--input text-md"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="Enter your first name"
            />
          </label>
          
          <label htmlFor="lastName" className="contact--label">
            <span className="text-md">Last Name *</span>
            <input
              type="text"
              className="contact--input text-md"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Enter your last name"
            />
          </label>
          
          <label htmlFor="email" className="contact--label">
            <span className="text-md">Email *</span>
            <input
              type="email"
              className="contact--input text-md"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
            />
          </label>
          
          <label htmlFor="phoneNumber" className="contact--label">
            <span className="text-md">Phone Number</span>
            <input
              type="tel"
              className="contact--input text-md"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </label>
        </div>
        
        <label htmlFor="topic" className="contact--label">
          <span className="text-md">Choose a topic</span>
          <select 
            id="topic" 
            name="topic"
            className="contact--input text-md"
            value={formData.topic}
            onChange={handleInputChange}
          >
            <option value="">Select One...</option>
            <option value="general">General Inquiry</option>
            <option value="project">Project Collaboration</option>
            <option value="job">Job Opportunity</option>
            <option value="freelance">Freelance Work</option>
            <option value="other">Other</option>
          </select>
        </label>
        
        <label htmlFor="message" className="contact--label">
          <span className="text-md">Message *</span>
          <textarea
            className="contact--input text-md"
            id="message"
            name="message"
            rows="8"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="Type your message here..."
          />
        </label>
        
        <label htmlFor="acceptTerms" className="checkbox--label">
          <input 
            type="checkbox" 
            required 
            name="acceptTerms" 
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
          />
          <span className="text-sm">I accept the terms and conditions *</span>
        </label>
        
        <div>
          <button 
            type="button"
            className="btn btn-primary contact--form--btn"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .status-message {
          padding: 10px;
          margin: 10px 0;
          border-radius: 4px;
          text-align: center;
        }
        .status-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .status-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </section>
  );
}