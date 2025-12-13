import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Try AWS API first
      const { configService } = await import('@/services/config');
      const config = await configService.getConfig();
      
      const response = await fetch(`${config.AWS_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.AWS_API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('AWS API failed');
      }
    } catch (error) {
      console.error('AWS API failed, trying backend fallback:', error);
      
      // Fallback to backend API
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vic.dita.co.ke';
        const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } catch (backendError) {
        console.error('Backend API also failed:', backendError);
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate or just want to say hello? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gradient">
                  Get In Touch
                </h3>
              </div>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a project in mind, want to discuss opportunities, 
                  or just want to connect with a fellow developer, I'm always open 
                  to interesting conversations and new collaborations.
                </p>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg glass">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:mungaivictor2781@gmail.com" className="text-sm text-muted-foreground">
                        mungaivictor2781@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg glass">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+254759958851" className="text-sm text-muted-foreground">
                        +254 759958851
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg glass">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-medium mb-4">Connect with me on</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/victor-mungai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 flex-1"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/victor-mungai-a998942a2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 flex-1"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up delay-200">
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold">
                  Send a Message
                </h3>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="glass border-0"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="glass border-0"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="What's this about?" 
                    className="glass border-0"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me about your project or just say hi!" 
                    rows={6}
                    className="glass border-0 resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 w-full font-semibold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center mt-2">
                    Message sent successfully!
                  </p>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center mt-2">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;