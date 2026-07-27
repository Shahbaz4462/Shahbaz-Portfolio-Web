'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare, User, FileText, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden field for bot prevention
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, a job opportunity, or want to collaborate? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  I typically respond to inquiries within 12-24 hours. Messages are routed directly to my primary mailbox.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary dark:text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500">Email Address</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500">Response Status</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.availability}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Professional Integrity Guarantee</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  All communication is strictly confidential. Spam protection and encryption active on form submissions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot field for anti-spam (hidden from real users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>Your Full Name *</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary dark:focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      <span>Your Email Address *</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary dark:focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>Subject *</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Project Opportunity / Software Engineering Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary dark:focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                    <span>Message Details *</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project requirements or position details..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary dark:focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button & Notifications */}
                <div className="pt-2 space-y-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl bg-gradient-to-r from-primary via-blue-600 to-accent text-white font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Encrypted Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center space-x-2"
                      >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium flex items-center space-x-2"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
