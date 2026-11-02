import { profile } from '../data/profile';
import { site } from '../data/site';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type SubmitResult = { ok: true; via: 'service' | 'mailto' } | { ok: false; error: string };

/**
 * Sends the contact form using the provider configured in src/data/site.ts.
 * Falls back to opening the visitor's email client when no service is configured.
 */
export async function submitContact(data: ContactPayload): Promise<SubmitResult> {
  const { provider, endpoint, accessKey } = site.contactForm;
  const subject = `Portfolio enquiry from ${data.name}`;

  try {
    if (provider === 'formspree' && endpoint) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: subject }),
      });
      if (!res.ok) throw new Error(`Formspree responded with ${res.status}`);
      return { ok: true, via: 'service' };
    }

    if (provider === 'web3forms' && accessKey) {
      const res = await fetch(endpoint || 'https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, subject, from_name: data.name, ...data }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || json.success === false) throw new Error('Web3Forms could not deliver the message');
      return { ok: true, via: 'service' };
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Something went wrong' };
  }

  // mailto fallback
  const to = profile.socials.email;
  if (!to) {
    return { ok: false, error: 'The contact form is not configured yet. Please reach out via the links on this page.' };
  }
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: 'mailto' };
}
