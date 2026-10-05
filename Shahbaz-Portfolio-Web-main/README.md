# Muhammad Shahbaz - Software Engineer Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases my software engineering projects, technical skills, and professional achievements.

## 🚀 Features

- **Modern UI/UX**: Glassmorphic design with smooth animations using Framer Motion
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Project Showcase**: Interactive project cards with filtering and search functionality
- **Contact Form**: Functional contact form with anti-spam protection
- **GitHub Integration**: GitHub statistics and repository links
- **Performance Optimized**: Built with Next.js 14 for optimal performance and SEO
- **TypeScript**: Fully typed for better development experience and code quality

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Shahbaz4462/Shahbaz-Portfolio-Web.git
cd Shahbaz-Portfolio-Web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Formspree Endpoint for contact form (optional)
# Get your endpoint from https://formspree.io/
FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### Environment Variables for Vercel Deployment

When deploying to Vercel, add these environment variables in your project settings:

1. **FORMSPREE_ENDPOINT** (Optional)
   - Description: Your Formspree form endpoint for contact form submissions
   - How to get: Sign up at [formspree.io](https://formspree.io/), create a form, and copy your endpoint URL
   - Example: `https://formspree.io/f/mqakpeor`
   - Note: If not provided, the contact form will use a default endpoint

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API route
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page
├── components/
│   ├── layout/
│   │   ├── Footer.tsx        # Footer component
│   │   └── Navbar.tsx        # Navigation bar
│   ├── modals/
│   │   ├── ProjectModal.tsx  # Project detail modal
│   │   └── ResumeModal.tsx   # Resume download modal
│   ├── sections/
│   │   ├── AboutSection.tsx  # About me section
│   │   ├── AchievementsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── GithubSection.tsx
│   │   ├── HeroSection.tsx   # Hero section
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── TimelineSection.tsx
│   ├── ui/
│   │   ├── LoadingScreen.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── ScrollToTop.tsx
│   └── ThemeProvider.tsx     # Theme context provider
├── data/
│   └── portfolioData.ts      # Portfolio data and content
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🎨 Customization

### Personal Information

Edit `src/data/portfolioData.ts` to update your personal information:

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other fields
};
```

### Projects

Add or modify projects in the `PROJECTS` array in `src/data/portfolioData.ts`.

### Skills

Update your skills in the `SKILLS` array in `src/data/portfolioData.ts`.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables (if any)
4. Deploy!

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Muhammad Shahbaz**
- GitHub: [@Shahbaz4462](https://github.com/Shahbaz4462)
- Email: shahbaz4462@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
