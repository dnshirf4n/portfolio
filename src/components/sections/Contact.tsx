import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { profile } from '../../data/profile';
import { site } from '../../data/site';
import { submitContact } from '../../lib/contact';
import { Button } from '../ui/Button';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { getSocials } from '../ui/SocialLinks';
import styles from './Contact.module.css';

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent'; via: 'service' | 'mailto' } | { state: 'error'; message: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [errors, setErrors] = useState<Errors>({});
  const channels = getSocials(18).filter((c) => c.href || site.showPlaceholders);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get('company')) return; // honeypot: bots fill hidden fields
    const data = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };
    const next: Errors = {};
    if (data.name.length < 2) next.name = 'Please enter your name.';
    if (!EMAIL_RE.test(data.email)) next.email = 'Please enter a valid email address.';
    if (data.message.length < 10) next.message = 'Please write a message of at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus({ state: 'sending' });
    const result = await submitContact(data);
    if (result.ok) {
      setStatus({ state: 'sent', via: result.via });
      if (result.via === 'service') form.reset();
    } else {
      setStatus({ state: 'error', message: result.error });
    }
  }

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <p className={styles.eyebrow}>
              <span>09</span> Get in touch
            </p>
            <h2 id="contact-title" className={styles.title}>
              Let&rsquo;s build something <span className="serif gradient-text">data-driven</span> together.
            </h2>
            <p className={styles.lede}>
              Whether it is an internship, a hackathon team, a research idea or a conversation about data science, I would be glad to hear from you.

            </p>

            <ul role="list" className={styles.channels}>
              {channels.map((c) => (
                <li key={c.key}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className={styles.channel}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      {...(c.key === 'resume' ? { download: '' } : {})}
                    >
                      <span className={styles.channelIcon}>{c.icon}</span>
                      <span className={styles.channelText}>
                        <span className={styles.channelLabel}>{c.label}</span>
                        <span className={styles.channelValue}>{c.display}</span>
                      </span>
                      <ArrowUpRight size={16} className={styles.channelArrow} aria-hidden="true" />
                    </a>
                  ) : (
                    <div className={`${styles.channel} ${styles.channelEmpty}`}>
                      <span className={styles.channelIcon}>{c.icon}</span>
                      <span className={styles.channelText}>
                        <span className={styles.channelLabel}>{c.label}</span>
                        <Placeholder label={c.label.toLowerCase()} file="profile.ts → socials" />
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className={styles.formCard}>
            <form onSubmit={onSubmit} noValidate className={styles.form} aria-describedby="form-status">
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
                  {errors.name && (
                    <small id="err-name" className={styles.error}>
                      {errors.name}
                    </small>
                  )}
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                  {errors.email && (
                    <small id="err-email" className={styles.error}>
                      {errors.email}
                    </small>
                  )}
                </label>
              </div>
              <label className={styles.field}>
                <span>Message</span>
                <textarea name="message" rows={6} placeholder="Tell me about the opportunity, project or idea…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
                {errors.message && (
                  <small id="err-message" className={styles.error}>
                    {errors.message}
                  </small>
                )}
              </label>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

              <div className={styles.submitRow}>
                <Button type="submit" disabled={status.state === 'sending'} icon={status.state === 'sending' ? <Loader2 size={16} className={styles.spin} /> : <Send size={16} />}>
                  {status.state === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
                <p className={styles.hint}>{site.contactForm.provider === 'mailto' ? 'Opens your email app' : 'Delivered straight to my inbox'}</p>
              </div>

              <div id="form-status" aria-live="polite">
                <AnimatePresence>
                  {status.state === 'sent' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`${styles.notice} ${styles.success}`}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {status.via === 'service' ? `Thanks — your message has been sent. ${profile.firstName} will be in touch.` : 'Your email app should now be open with the message ready to send.'}
                    </motion.p>
                  )}
                  {status.state === 'error' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`${styles.notice} ${styles.failure}`}>
                      <AlertCircle size={16} aria-hidden="true" />
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal className={styles.closing}>
          <p>
            “{profile.brandStatement.split('. ')[0]}. <span className="serif">{profile.brandStatement.split('. ')[1]}</span>”
          </p>
          <p className={styles.closingSub}>
            I am at the start of my data science journey, and I am building in public. Thank you for taking the time to see where it is heading.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
