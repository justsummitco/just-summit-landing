# Just Summit Landing Site

A production-ready Next.js 14 landing site for Just Summit - an AI tool that summarizes audiobooks & podcasts and boosts retention.

## 🚀 Features

- **Modern Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Mobile-First Design**: Responsive and accessible (WCAG AA compliant)
- **Pre-Sales Ready**: Three pricing tiers (£25, £49, £149) with Stripe integration
- **Email Capture**: ActiveCampaign integration for lead generation
- **SEO Optimized**: Meta tags, OpenGraph, sitemap generation
- **Analytics Ready**: PostHog integration placeholder
- **Performance**: Bundle < 250 kB gzipped, optimized images

## 📋 Sections

1. **Hero Section**: Compelling headline, sub-headline, primary CTA
2. **Pricing Cards**: Three tiers with Stripe Payment Link buttons
3. **Founder Story**: 2014 car accident → recovery → inspiration narrative
4. **Testimonials**: Social proof with ratings and user feedback
5. **Email Signup**: Name + email capture → ActiveCampaign
6. **Footer**: Social links, legal pages, contact information

## 🛠 Local Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd just-summit-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   # ActiveCampaign Configuration
   NEXT_PUBLIC_AC_URL=https://your-account.api-us1.com
   NEXT_PUBLIC_AC_KEY=your-activecampaign-api-key

   # Stripe Payment Links
   NEXT_PUBLIC_STRIPE_LINK_BASIC=https://buy.stripe.com/your-basic-link
   NEXT_PUBLIC_STRIPE_LINK_ADVANCED=https://buy.stripe.com/your-advanced-link
   NEXT_PUBLIC_STRIPE_LINK_PRO=https://buy.stripe.com/your-pro-link

   # Analytics (Optional)
   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-project-key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://justsummit.co
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 One-Click Deployment to Vercel

### Method 1: Deploy Button (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/just-summit-landing)

### Method 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   
   In your Vercel dashboard, go to Project Settings → Environment Variables and add:
   
   - `NEXT_PUBLIC_AC_URL`
   - `NEXT_PUBLIC_AC_KEY`
   - `NEXT_PUBLIC_STRIPE_LINK_BASIC`
   - `NEXT_PUBLIC_STRIPE_LINK_ADVANCED`
   - `NEXT_PUBLIC_STRIPE_LINK_PRO`
   - `NEXT_PUBLIC_POSTHOG_KEY` (optional)
   - `NEXT_PUBLIC_SITE_URL`

5. **Redeploy** after setting environment variables

## 🔧 Configuration Guide

### ActiveCampaign Setup

1. **Get API Credentials**
   - Login to ActiveCampaign
   - Go to Settings → Developer
   - Copy your API URL and Key

2. **Create Custom Fields** (optional)
   - Field 1: Source (to track "Landing Page" signups)

3. **Set up Automation** (recommended)
   - Create welcome email sequence
   - Tag new contacts with "landing-page-signup"

### Stripe Payment Links Setup

1. **Create Products**
   - Basic: £25 (originally £35)
   - Advanced: £49 (originally £69) 
   - Pro: £149 (originally £199)

2. **Generate Payment Links**
   - Go to Stripe Dashboard → Payment Links
   - Create links for each product
   - Copy the URLs to your environment variables

3. **Test Mode**
   - Use test payment links during development
   - Switch to live links for production

### PostHog Analytics (Optional)

1. **Create PostHog Account**
   - Sign up at posthog.com
   - Create new project

2. **Get Project Key**
   - Copy from Project Settings
   - Add to `NEXT_PUBLIC_POSTHOG_KEY`

3. **Events Tracked**
   - `pricing_tier_clicked`
   - `email_signup_success`

## 📁 Project Structure

```
just-summit-landing/
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # ActiveCampaign integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with SEO
│   └── page.tsx                  # Main landing page
├── components/
│   ├── EmailSignup.tsx           # Email capture form
│   ├── Footer.tsx                # Footer with links
│   ├── FounderStory.tsx          # Founder narrative
│   ├── Hero.tsx                  # Hero section
│   ├── Pricing.tsx               # Pricing cards
│   └── Testimonials.tsx          # Social proof
├── public/                       # Static assets
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
├── next-sitemap.config.js        # SEO sitemap config
└── package.json                  # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: #3b82f6 (Blue)
- **Accent**: #f59e0b (Amber)
- **Neutral**: #101010 / #ffffff

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Regular, readable line height

### Components
- **Buttons**: Primary (blue) and Secondary (outline)
- **Cards**: Rounded corners, subtle shadows
- **Forms**: Clean inputs with focus states

## 🔍 SEO Features

- **Meta Tags**: Title, description, keywords
- **OpenGraph**: Social media sharing
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **Structured Data**: Ready for schema markup

## ♿ Accessibility

- **WCAG AA Compliant**: Semantic HTML, proper contrast
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators

## 📊 Performance

- **Bundle Size**: < 250 kB gzipped
- **Images**: Next.js Image optimization
- **Fonts**: Optimized Google Fonts loading
- **CSS**: Tailwind CSS purging unused styles

## 🧪 Testing

### Manual Testing Checklist

- [ ] Hero section loads and displays correctly
- [ ] Pricing cards show all three tiers
- [ ] Email signup form submits successfully
- [ ] Stripe payment links open correctly
- [ ] Mobile responsive design works
- [ ] All links and buttons function
- [ ] Form validation works properly

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

### Playwright E2E

Install Chromium once, then run the browser suite:

```bash
npx playwright install chromium
npm run test:e2e
```

The default suite builds and starts the local production server automatically.
It runs the full route and interaction coverage in desktop Chromium, plus
focused responsive checks at 900px and 390px. Set `PLAYWRIGHT_BASE_URL` to run
the same checks against an already-running preview without starting a local
server.

## 🚨 Troubleshooting

### Common Issues

1. **Email signup fails**
   - Check ActiveCampaign API credentials
   - Verify API URL format (should include https://)
   - Check network connectivity

2. **Stripe links don't work**
   - Ensure payment links are published
   - Check environment variables are set
   - Verify links are for correct Stripe account

3. **Build errors**
   - Run `npm install` to ensure dependencies
   - Check TypeScript errors with `npm run build`
   - Verify all environment variables are set

4. **Styling issues**
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify custom CSS doesn't conflict

## 📝 Customization

### Content Updates

1. **Hero Section**: Edit `components/Hero.tsx`
2. **Pricing**: Update `components/Pricing.tsx`
3. **Founder Story**: Modify `components/FounderStory.tsx`
4. **Testimonials**: Change `components/Testimonials.tsx`

### Styling Changes

1. **Colors**: Update `tailwind.config.js`
2. **Fonts**: Modify `app/globals.css`
3. **Layout**: Adjust component styles

### Functionality

1. **Analytics**: Add tracking events in components
2. **Forms**: Extend `app/api/subscribe/route.ts`
3. **Integrations**: Add new API routes as needed

## 📞 Support

For technical support or questions:

- **Email**: hello@justsummit.co
- **Documentation**: This README
- **Issues**: Create GitHub issue

## 📄 License

Copyright © 2024 Just Summit. All rights reserved.

---

**Built with ❤️ for ADHD brains and audio learners everywhere**
