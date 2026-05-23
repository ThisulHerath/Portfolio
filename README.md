# 🌟 Portfolio

> A modern, animated portfolio showcasing my skills, projects, and professional journey.

[![Live Demo](https://img.shields.io/badge/Portfolio-Live_Demo-brightgreen?style=for-the-badge&logo=vercel)](https://portfolio-lemon-two-47.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

---

## ✨ Live Demo

👉 **[Check out the live portfolio here](https://portfolio-lemon-two-47.vercel.app/)**

---

## 🎯 Features

- **🎬 Smooth Animations** - Floating particles, scroll reveal effects, and smooth transitions throughout
- **📱 Fully Responsive** - Looks stunning on desktop, tablet, and mobile devices
- **⚡ Lightning Fast** - Built with Vite for optimal performance and instant HMR
- **🎨 Beautiful UI** - Modern design with gradient effects and custom styling
- **♿ Accessible** - Built with semantic HTML and accessibility best practices
- **🎪 Interactive Components**:
  - **Hero Section** - Eye-catching introduction with animations
  - **About Section** - Personal background and information
  - **Projects Section** - Showcase of my work and accomplishments
  - **Skills Section** - Technical expertise visualization
  - **Contact Section** - Easy ways to get in touch
  - **Navbar** - Smooth navigation with active section highlighting
  - **Floating Particles** - Dynamic background animations

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 19.2.6 |
| **Build Tool** | Vite 8.0.12 |
| **Styling** | CSS3 with animations |
| **Runtime** | Node.js 22.12.0+ |
| **Deployment** | Vercel |
| **Code Quality** | ESLint |

---

## 📦 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Hero section with intro
│   │   ├── About.jsx          # About me section
│   │   ├── Projects.jsx       # Portfolio projects showcase
│   │   ├── Skills.jsx         # Technical skills display
│   │   ├── Contact.jsx        # Contact information & form
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── FloatingParticles/ # Animated background particles
│   │   └── *.css              # Component-specific styles
│   ├── hooks/
│   │   └── useReveal.js       # Custom hook for reveal animations
│   ├── App.jsx                # Main app component
│   ├── App.css                # Global styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Base styles
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── eslint.config.js           # ESLint rules

```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22.12.0 or higher
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🎨 Key Components & Animations

### 🎭 Hero Section
- Animated gradient text
- Smooth fade-in effects
- Call-to-action buttons with hover animations

### 🎬 Floating Particles
- Dynamic particle animation in background
- Creates depth and visual interest
- Responsive to user interactions

### 📜 Scroll Reveal
- Sections animate in as you scroll
- Custom `useReveal` hook triggers animations at threshold
- Smooth, professional reveal effects

### 🎪 Interactive Navigation
- Fixed navbar with smooth scrolling
- Active section highlighting
- Mobile-responsive menu

---

## 🌐 Deployment

This portfolio is deployed on **Vercel** with automatic deployments on every push to the main branch.

### Deploy Your Own

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy on every push

[Learn more about Vercel deployment →](https://vercel.com/docs/frameworks/react)

---

## 📝 Customization

### Styling
- All component styles are in separate CSS files for easy modification
- Global styles in `src/index.css` and `src/App.css`
- Customize colors, fonts, and animations to match your brand

### Content
- Edit components in the `src/components/` directory
- Update project data in the Projects section
- Modify skills and about information directly in the component files

### Animations
- Particle animation controlled in `FloatingParticles.jsx`
- Scroll reveal animations in `useReveal.js`
- CSS animations defined in respective component `.css` files

### Contact Form with EmailJS

The contact form uses EmailJS so messages are sent directly to your inbox without a backend.

1. Create an account at [EmailJS](https://www.emailjs.com/).
2. Add an email service and connect it to your Gmail account.
3. Create an email template with these fields:
   - `from_name`
   - `reply_to`
   - `message`
4. Set the template recipient to `thisulh@gmail.com`.
5. Copy your Service ID, Template ID, and Public Key.
6. Add a `.env.local` file in the project root:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

7. Restart the dev server after updating the env file.

The form already validates the email field before it sends.

---

## 📞 Contact & Connect

Visit the live portfolio to find contact information and connect with me!

[🚀 Visit Portfolio](https://portfolio-lemon-two-47.vercel.app/)

---

## 📄 License

This project is open source. Feel free to take inspiration and create your own!

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Powered by [Vite](https://vitejs.dev)
- Hosted on [Vercel](https://vercel.com)
- Inspired by modern portfolio design trends

---

<div align="center">

**[⬆ Back to top](#-portfolio)**

</div>
