// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.bindEvents()
  }

  setTheme(theme) {
    this.theme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }
  }
}






// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.mobileToggle = document.getElementById("mobile-toggle")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener("click", () => this.toggleMobileMenu())
    }

    // Navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = link.getAttribute("href")
        this.scrollToSection(target)
        this.closeMobileMenu()
      })
    })

    // Scroll event
    window.addEventListener("scroll", () => this.handleScroll())

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.navbar.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.mobileToggle.classList.toggle("active")
    this.navMenu.classList.toggle("active")
  }

  closeMobileMenu() {
    this.mobileToggle.classList.remove("active")
    this.navMenu.classList.remove("active")
  }

  scrollToSection(target) {
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  handleScroll() {
    const scrollY = window.scrollY

    // Navbar background
    if (scrollY > 50) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(17, 24, 39, 0.95)"
      }
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.8)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(17, 24, 39, 0.8)"
      }
    }

    // Active navigation link
    this.updateActiveNavLink()
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }
}

// Projects Data and Management
class ProjectsManager {
  constructor() {
    this.projects = [
      {
         id: 1,
    title: "Frelanker Sign-In",
    description: "A simple Sign-In page for freelancers. It includes a clean design and responsive layout.",
    image: "img/frelanker-sign-in.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ozodbek-8486.github.io/Frelanker-Sign-In/",
    githubUrl: "https://github.com/Ozodbek-8486/Frelanker-Sign-In"
      },
      {
        id: 2,
        title: "The Rotate Kub.",
        description:
          "This project is designed to create animated shapes",
        image: "img/the-rotate-kub.png",
        techStack: ["HTML", "CSS", " JavaScript"],
        liveUrl: "https://ozodbek-8486.github.io/Shape-animation/",
        githubUrl: "https://github.com/Ozodbek-8486/Shape-animation",
      },
      {
        id: 3,
        title: "3D animation",
        description:
          "This site is a 3D-animated site, mainly created to maintain the beauty and modernity of the website.",
        image: "img/3D-startub.png",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://ozodbek-8486.github.io/3D-STARTUP/",
        githubUrl: "https://github.com/Ozodbek-8486/3D-STARTUP",
      },
      {
        id: 4,
        title: "Zenwood-Store",
        description:
          "This site is a site developed for an online store. It is not yet fully completed.",
        image: "img/Zenwood-store.png",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://github.com/Ozodbek-8486/Universal-Do-kon",
        githubUrl: "https://github.com/Ozodbek-8486/Universal-Do-kon",
      },
      {
        id: 5,
        title: "Zoombot AI Portfolio",
        description:
          "This project is a personal AI project that I developed for my own personal GPT.",
        image: "img/Zoombot.png",
        techStack: ["HTML", "CSS", "JavaScript", "OpenAI API"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: 6,
        title: "Education Admin-dashboard",
        description:
          "Interactive dashboard for data analysis with charts, filters, and real-time updates. Built with Python and React.",
        image: "",
        techStack: ["TypeScript",  "JS", "FastAPI", "PostgreSQL"],
        liveUrl: "#",
        githubUrl: "#",
      },
    ]
    this.init()
  }

  init() {
    this.renderProjects()
  }

  renderProjects() {
    const projectsGrid = document.getElementById("projects-grid")
    if (!projectsGrid) return

    projectsGrid.innerHTML = this.projects
      .map(
        (project) => `
            <div class="project-card fade-in">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="overlay-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="overlay-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.techStack.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                    </div>
                    <div class="project-actions">
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary">
                            View Project
                        </a>
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-secondary">
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Skills Data and Management
class SkillsManager {
  constructor() {
    this.skillCategories = {
      frontend: {
        title: "Frontend Development",
        skills: [
          { name: "HTML", level: 95 },
          { name: "CSS", level: 70 },
          { name: "TypeScript", level: 50 },
          { name: "JavaScript", level: 30 },
          
        ],
      },
      backend: {
        title: "Backend Development",
        skills: [
          { name: "Python", level: 50 },
          { name: "JavaScript", level: 30 },
          { name: "FastAPI", level: 75 },
        ],
      },
      database: {
        title: "Database & Tools",
        skills: [
          { name: "MongoDB", level: 15 },
          { name: "PostgreSQL", level: 10 },
          { name: "Git/GitHub", level: 60 },
        ],
      },
      design: {
        title: "UI/UX Design",
        skills: [
          { name: "Figma", level: 50 },
          { name: "Adobe XD", level: 20 },
          { name: "Responsive Design", level:50 },
          { name: "3D-Web Design", level: 20 },
        ],
      },
      ai: {
        title: "AI & Modern Tools",
        skills: [
          { name: "OpenAI API", level: 80 },
          { name: "Machine Learning", level: 70 },
          { name: "Data Analysis", level: 75 },
          { name: "AI Integration", level: 82 },
          { name: "Automation", level: 78 },
          { name: "ChatGPT/Claude", level: 85 },
        ],
      },
    }
    this.activeCategory = "frontend"
    this.init()
  }

  init() {
    this.bindEvents()
    this.renderSkills()
  }

  bindEvents() {
    const categoryButtons = document.querySelectorAll(".skill-category")
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category")
        this.setActiveCategory(category)
      })
    })
  }

  setActiveCategory(category) {
    this.activeCategory = category

    // Update active button
    document.querySelectorAll(".skill-category").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-category="${category}"]`).classList.add("active")

    // Render skills
    this.renderSkills()
  }

  renderSkills() {
    const skillsContainer = document.getElementById("skills-container")
    if (!skillsContainer) return

    const categoryData = this.skillCategories[this.activeCategory]

    skillsContainer.innerHTML = `
            <h3 style="grid-column: 1 / -1; font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
                ${categoryData.title}
            </h3>
            ${categoryData.skills
              .map(
                (skill) => `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="--progress-width: ${skill.level}%"></div>
                    </div>
                </div>
            `,
              )
              .join("")}
        `

    // Animate progress bars
    setTimeout(() => {
      const progressBars = skillsContainer.querySelectorAll(".skill-progress")
      progressBars.forEach((bar) => {
        bar.style.width = bar.style.getPropertyValue("--progress-width")
      })
    }, 100)
  }
}

// Contact Form Management
class ContactManager {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.submitBtn = document.getElementById("form-submit")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // Validate form
    if (!this.validateForm(data)) {
      return
    }

    // Show loading state
    this.setLoadingState(true)

    try {
      // Simulate form submission
      await this.simulateSubmission(data)

      // Show success message
      this.showMessage("Message sent successfully! I'll get back to you soon.", "success")

      // Reset form
      this.form.reset()
    } catch (error) {
      this.showMessage("Failed to send message. Please try again.", "error")
    } finally {
      this.setLoadingState(false)
    }
  }

  validateForm(data) {
    const { name, email, message } = data

    if (!name.trim()) {
      this.showMessage("Please enter your name.", "error")
      return false
    }

    if (!email.trim() || !this.isValidEmail(email)) {
      this.showMessage("Please enter a valid email address.", "error")
      return false
    }

    if (!message.trim()) {
      this.showMessage("Please enter a message.", "error")
      return false
    }

    return true
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  setLoadingState(loading) {
    const submitText = this.submitBtn.querySelector(".submit-text")
    const submitIcon = this.submitBtn.querySelector(".submit-icon")
    const loadingSpinner = this.submitBtn.querySelector(".loading-spinner")

    if (loading) {
      this.submitBtn.disabled = true
      submitText.style.display = "none"
      submitIcon.style.display = "none"
      loadingSpinner.style.display = "flex"
    } else {
      this.submitBtn.disabled = false
      submitText.style.display = "inline"
      submitIcon.style.display = "inline"
      loadingSpinner.style.display = "none"
    }
  }

  async simulateSubmission(data) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Log form data (in real app, send to server)
    console.log("Form submitted:", data)
  }

  showMessage(message, type) {
    // Create or update message element
    let messageEl = document.querySelector(".form-message")

    if (!messageEl) {
      messageEl = document.createElement("div")
      messageEl.className = "form-message"
      this.form.appendChild(messageEl)
    }

    messageEl.textContent = message
    messageEl.className = `form-message ${type}`

    // Add styles for message
    messageEl.style.cssText = `
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            font-weight: 500;
            ${
              type === "success"
                ? "background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.2);"
                : "background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2);"
            }
        `

    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove()
      }
    }, 5000)
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    this.init()
  }

  init() {
    this.bindEvents()
    this.checkElements()
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.checkElements())
    window.addEventListener("resize", () => this.checkElements())
  }

  checkElements() {
    this.elements.forEach((element) => {
      if (this.isElementInViewport(element)) {
        element.classList.add("visible")
      }
    })
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    return (
      (rect.top >= 0 && rect.top <= windowHeight * 0.8) ||
      (rect.bottom >= windowHeight * 0.2 && rect.bottom <= windowHeight)
    )
  }
}

// Utility Functions
function scrollToSection(target) {
  const element = document.querySelector(target)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top")

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = "1"
        backToTopBtn.style.visibility = "visible"
      } else {
        backToTopBtn.style.opacity = "0"
        backToTopBtn.style.visibility = "hidden"
      }
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all managers
  new ThemeManager()
  new NavigationManager()
  new ProjectsManager()
  new SkillsManager()
  new ContactManager()
  new ScrollAnimations()

  // Initialize utility functions
  initBackToTop()

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = this.getAttribute("href")
      scrollToSection(target)
    })
  })
})

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}
